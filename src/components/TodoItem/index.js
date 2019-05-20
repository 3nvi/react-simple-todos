import { connect } from 'react-redux';
import { markTodoAsDone, updateTodo, deleteTodo } from 'ducks/todo';
import TodoItem from './TodoItem';

const mapDispatchToProps = { markTodoAsDone, updateTodo, deleteTodo };

export * from './TodoItem';
export default connect(null, mapDispatchToProps)(TodoItem);
