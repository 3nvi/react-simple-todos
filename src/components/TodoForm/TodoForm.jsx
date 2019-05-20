import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import * as shapes from 'shapes';
import moment from 'moment';
import { Formik, Field, Form } from 'formik';
import { PRIMARY_COLOR, DATE_FORMAT } from 'utils/constants';
import MaskedInput from 'react-text-mask';

// the input mask for the date field
const dateMask = [
  /[0-9]/,
  /[0-9]/,
  '/',
  /[0-9]/,
  /[0-9]/,
  '/',
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  /[0-9]/,
  ' ',
  /[0-9]/,
  /[0-9]/,
  ':',
  /[0-9]/,
  /[0-9]/,
];

// common CSS rules for all the fields in the form
const commonFieldCss = css`
  transition: border-bottom-color 0.1s ease-in-out;
  padding: 20px 0;
  border: none;
  border-bottom: 1px solid #e1e1e1;
  width: 100%;
  outline: 0;

  &:focus {
    border-color: #bbb;
    border-width: 2px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Heading = styled.h1`
  transition: all 0.5s ease-in-out;
  font-size: ${props => (props.size === 'large' ? '4.5rem ' : '2.25rem')};
  margin-bottom: 40px;
  text-align: center;
`;

const FormControl = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  margin-bottom: 20px;

  input {
    font-size: ${props => (props.size === 'large' ? '2rem ' : '1rem')};
  }
`;

const InputField = styled(({ form, field, ...rest }) => <input {...field} {...rest} />)`
  ${commonFieldCss}
`;

const DateField = styled(({ form, field, ...rest }) => <MaskedInput {...field} {...rest} />)`
  ${commonFieldCss}
`;

const SubmitButton = styled.button`
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  height: 54px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid ${PRIMARY_COLOR};

  &[disabled] {
    opacity: 0.2;
    pointer-events: none;
  }

  &:hover {
    background-color: ${PRIMARY_COLOR};
    color: white;
  }

  &:active {
    background-color: #111;
  }
`;

const TextButton = styled.button`
  color: #999;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;

/**
 * The Form that you see when you initially log into the app
 */
function TodoForm({ onSubmit, todo, size }) {
  // whether the form is for an update of an existing Todo item or not
  const isUpdate = Boolean(todo);

  // whether the date field should be shown or not
  const [showDateField, toggleDateFieldVisibility] = React.useState(isUpdate && !!todo.dueDate);

  // initial form values (during mount)
  const initialValues = {
    content: todo ? todo.content : '',
    dueDate: todo ? todo.dueDate : '',
  };

  // function that gets called on each key typing. Validates proper data shape
  const handleValidation = values => {
    let errors = {};
    if (!values.content) {
      errors.content = 'This field is required';
    }
    if (values.dueDate && !moment(values.dueDate, DATE_FORMAT).isValid()) {
      errors.dueDate = 'Invalid date format';
    }
    return errors;
  };

  // when the form gets subbmitted, invoke the callback, reset the form and hide the datefield
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
    toggleDateFieldVisibility(false);
  };

  // we dynamically change the text in headings & buttons. Also, we make sure to either display
  // a date input or an "add date" button depending on the local state declared above. The "add
  // button" is only visible if the user has typed at least 1 character (hence the `values.content`
  // check down below)
  return (
    <FormContainer>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={handleValidation}>
        {({ setFieldValue, values, isValid, isSubmitting }) => {
          // prettier-ignore
          const handleAddDateClick = () => {
            setFieldValue( 'dueDate', moment().add(1, 'days').format(DATE_FORMAT));
            toggleDateFieldVisibility(true);
          };

          return (
            <Form>
              {isUpdate ? (
                <Heading size={size}>Edit Todo</Heading>
              ) : (
                <Heading size={size}>What do you need to do?</Heading>
              )}
              <FormControl inline size={size}>
                <Field component={InputField} name="content" />
                {showDateField ? (
                  <Field
                    name="dueDate"
                    component={DateField}
                    mask={dateMask}
                    guide={false}
                    placeholder={DATE_FORMAT}
                  />
                ) : (
                  values.content && (
                    <TextButton type="button" onClick={handleAddDateClick}>
                      + add date
                    </TextButton>
                  )
                )}
              </FormControl>
              <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
                {isUpdate ? 'Update' : 'Create'}
              </SubmitButton>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  todo: PropTypes.shape(shapes.todo),
  size: PropTypes.oneOf(['large', 'small']),
};

TodoForm.defaultProps = {
  todo: null,
  size: 'large',
};

export default TodoForm;
