import { connect } from 'react-redux';
import { getTodos, getTodoVisibility, getTotalTodos, toggleTodoVisibility } from 'ducks/todo';
import TodoList from './TodoList';

const mapStateToProps = state => ({
  todos: getTodos(state),
  totalTodos: getTotalTodos(state),
  shouldShowCompletedTodos: getTodoVisibility(state),
});

const mapDispatchToProps = { toggleTodoVisibility };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
