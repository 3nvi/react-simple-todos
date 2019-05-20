import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import * as shapes from 'shapes';
import { ReactComponent as DeleteSVG } from 'assets/delete.svg';
import { ReactComponent as EditSVG } from 'assets/edit.svg';
import { PRIMARY_COLOR, DATE_FORMAT } from 'utils/constants';
import TodoForm from 'components/TodoForm';
import Overlay from 'components/Overlay';
import moment from 'moment';
import { useTransition } from 'react-spring';

export const TODO_ITEM_HEIGHT = 80;
export const TODO_ITEM_GAP = 20;

const TodoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${TODO_ITEM_GAP}px;

  &:hover [role='group'] {
    display: inline-flex;
  }
`;

const TodoWell = styled.div`
  width: 100%;
  height: ${TODO_ITEM_HEIGHT}px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12), 0 2px 10px 0 rgba(34, 36, 38, 0.15);
  background-color: ${props => (props.isCompleted ? '#f7f7f7' : 'white')};

  time {
    color: ${props => (props.hasExpired ? '#bf0c0c' : undefined)};
  }
`;

const Text = styled.div`
  border-left: 1px solid #ddd;
  padding-left: 10px;
  margin-left: 10px;
  overflow: hidden;
`;

const MarkAsDoneButton = styled.button`
  transition: border-color 0.1s ease-in-out;
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 50%;

  &::after {
    transition: all 0.15s ease-in-out;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 14px;
    height: 14px;
    background-color: #4c7db9;
    border-radius: 50%;
    opacity: ${props => (props.isCompleted ? 1 : 0)};
  }

  &:hover {
    border: 1px solid #999;

    &::after {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const DueDate = styled.time`
  font-size: 0.8rem;
  color: #999;
  margin-top: 5px;
`;

const IconButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  background-color: inherit;
  display: none;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.075s ease-in;
  padding: 10px;
  border-radius: 50%;
  border: 1px solid #ddd;

  &:not(:last-of-type) {
    margin-right: 10px;
  }

  &:hover {
    background-color: ${PRIMARY_COLOR};
    border-color: ${PRIMARY_COLOR};

    path {
      fill: white;
    }
  }
`;

function TodoItem({ todo, updateTodo, deleteTodo, markTodoAsDone }) {

  // local state that checks if we are currently editing this item or not
  const [isEditing, setEditing] = React.useState(false);
  const hasExpired = todo.dueDate && moment().isAfter(moment(todo.dueDate, DATE_FORMAT));

  // the transitions needed for the "Edit" overlay to appear in a nice way
  const overlayTransitions = useTransition(isEditing, null, {
    from: { transform: 'translateY(-100vh)' },
    enter: { transform: 'translateY(0)' },
    leave: { transform: 'translateY(-100vh)' },
  });

  const handleUpdate = values => {
    updateTodo(todo.id, values);
    setEditing(false);
  };

  return (
    <TodoContainer>
      <TodoWell hasExpired={hasExpired} isCompleted={todo.done}>
        <MarkAsDoneButton onClick={() => markTodoAsDone(todo.id)} isCompleted={todo.done} />
        <Text>
          <Content>{todo.content}</Content>
          {todo.dueDate && <DueDate>{moment(todo.dueDate, DATE_FORMAT).format('LLL')}</DueDate>}
        </Text>
      </TodoWell>
      <IconButtonContainer role="group">
        <IconButton onClick={() => setEditing(true)}>
          <EditSVG />
        </IconButton>
        <IconButton onClick={() => deleteTodo(todo.id)}>
          <DeleteSVG />
        </IconButton>
      </IconButtonContainer>
      {overlayTransitions.map(
        ({ item, props: style, key }) =>
          item && (
            <Overlay style={style} key={key} onClose={() => setEditing(false)}>
              <TodoForm todo={todo} onSubmit={handleUpdate} />
            </Overlay>
          )
      )}
    </TodoContainer>
  );
}

TodoItem.reduxProps = {
  markTodoAsDone: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

TodoItem.propTypes = {
  ...TodoItem.reduxProps,
  todo: PropTypes.shape(shapes.todo),
};

TodoItem.defaultProps = {};

export default memo(TodoItem);
