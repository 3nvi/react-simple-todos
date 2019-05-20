import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTransition, animated } from 'react-spring';
import { PRIMARY_COLOR } from 'utils/constants';

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1;
`;

const Element = styled(animated.div)`
  color: white;
  display: flex;
  align-items: center;
  width: 325px;
  height: 45px;
  border-radius: 4px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  background-color: ${PRIMARY_COLOR};

  path {
    fill: white;
  }
`;

const Text = styled.span`
  color: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1 1 auto;
  padding: 15px 20px;
`;

const UndoButton = styled.button`
  color: inherit;
  transition: background-color 0.15s ease-in-out;
  height: 35px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 6px;
  background-color: #444;

  &:hover {
    background-color: #555;
  }
`;

function Snackbar({ snackbar, deleteSnackbar, undoTodosAction }) {
  // keep a ref for the timeout in order to reset it when a snackbar gets overriden with another
  // snackbar (by the user deleting stuff too fast)
  const timeoutRef = useRef(0);

  // create the needed transitions
  const transitions = useTransition(!!snackbar, null, {
    from: { opacity: 0, transform: 'translateY(50px)', height: 0 },
    enter: { opacity: 1, transform: 'translateY(0)', height: 'auto' },
    leave: { opacity: 0, transform: 'translateY(50px)', height: 0 },
  });

  // whenever the snackbar changes values, check and see if it was removed or changed. If it was
  // removed then we do nothing. If it was altered, then we re-new the timeout since that means
  // that some other action caused the existing Snackbar to change text (i.e. the user deleted
  // things too fast)
  useEffect(() => {
    if (snackbar) {
      timeoutRef.current = setTimeout(deleteSnackbar, 6000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [snackbar, deleteSnackbar]);

  // undo the changes (deletion) and instantly remove the snackbar (instead of waiting for a timeout)
  const handleUndo = () => {
    undoTodosAction(snackbar.undoState);
    deleteSnackbar();
  };

  // either show a snackbar or null
  return (
    <Wrapper>
      {transitions.map(({ item, props: style, key }) =>
        item && snackbar ? (
          <Element role="status" key={key} style={style}>
            <Text>{snackbar.content}</Text>
            {snackbar.undoState && (
              <UndoButton type="button" onClick={handleUndo}>
                Undo
              </UndoButton>
            )}
          </Element>
        ) : null
      )}
    </Wrapper>
  );
}

Snackbar.reduxProps = {
  snackbar: PropTypes.shape({
    content: PropTypes.string.isRequired,
    undoState: PropTypes.objectOf(PropTypes.any),
  }),
  undoTodosAction: PropTypes.func.isRequired,
  deleteSnackbar: PropTypes.func.isRequired,
};

Snackbar.propTypes = {
  ...Snackbar.reduxProps,
};

Snackbar.defaultProps = {
  snackbar: null,
};

export default Snackbar;
