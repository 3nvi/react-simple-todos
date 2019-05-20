import React from 'react';
import { connect } from 'react-redux';
import { addTodo, getTotalTodos } from 'ducks/todo';
import styled from '@emotion/styled';
import TodoForm from 'components/TodoForm';
import TodoList from './components/TodoList';
import Snackbar from './components/Snackbar';

const Container = styled.main`
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  margin: auto;

  @media only screen and (min-width: 1200px) {
    width: 1200px;
  }
`;

function App({ addTodo, totalTodos }) {
  return (
    <Container>
      <TodoForm onSubmit={addTodo} size={!totalTodos ? 'large' : 'small'} />
      <TodoList />
      <Snackbar />
    </Container>
  );
}

const mapStateToProps = state => ({ totalTodos: getTotalTodos(state) });

const mapDispatchToProps = { addTodo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
