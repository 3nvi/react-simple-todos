import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import * as shapes from 'shapes';
import { useTransition, animated } from 'react-spring';
import TodoItem, { TODO_ITEM_GAP, TODO_ITEM_HEIGHT } from 'components/TodoItem';
import Switch from 'components/Switch';

const Wrapper = styled.div`
  width: 500px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const Body = styled.div`
  height: 100%;
  padding: 25px 7px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const Heading = styled.h2`
  font-size: 3rem;
`;

const Placeholder = styled.h4`
  font-size: 1.5rem;
  text-align: center;
  color: #ccc;
`;

function TodoList({ totalTodos, todos, shouldShowCompletedTodos, toggleTodoVisibility }) {
  const transitions = useTransition(todos, todo => todo.id, {
    from: { opacity: 0, transform: 'translateY(-50px)', height: 0 },
    enter: { opacity: 1, transform: 'translateY(0)', height: TODO_ITEM_HEIGHT + TODO_ITEM_GAP },
    leave: { opacity: 0, transform: 'translateY(-50px)', height: 0 },
  });

  // the total todos counts everything regardless of whether it's shown or not. The `todos` only has
  // the items that should be rendered (potentially only the non-completed ones)
  if (!totalTodos) {
    return null;
  }

  return (
    <Wrapper>
      <Header>
        <Heading>Todos</Heading>
        <Switch
          label="Show Completed"
          onClick={toggleTodoVisibility}
          toggled={shouldShowCompletedTodos}
        />
      </Header>
      <Body>
        {transitions.map(({ item: todo, props: styles, key }) => (
          <animated.div key={key} style={styles}>
            <TodoItem todo={todo} />
          </animated.div>
        ))}
        {!todos.length && <Placeholder>Nothing to show here</Placeholder>}
      </Body>
    </Wrapper>
  );
}

TodoList.reduxProps = {
  shouldShowCompletedTodos: PropTypes.bool.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape(shapes.todo)).isRequired,
  toggleTodoVisibility: PropTypes.func.isRequired,
  totalTodos: PropTypes.number.isRequired,
};

TodoList.propTypes = {
  ...TodoList.reduxProps,
};

TodoList.defaultProps = {};

export default TodoList;
