import { ADD_TODO, UPDATE_TODO, TOGGLE_TODO_AS_DONE, DELETE_TODO, TOGGLE_TODO_VISIBILITY, UNDO_ACTION } from './types';
import { simpleAction } from '../utils';

export function addTodo({ content, dueDate = null, done = false }) {
  return simpleAction(ADD_TODO, { content, dueDate, done });
}

export function updateTodo(todoId, updates) {
  return simpleAction(UPDATE_TODO, { todoId, updates });
}

export function markTodoAsDone(todoId) {
  return simpleAction(TOGGLE_TODO_AS_DONE, { todoId });
}

export function deleteTodo(todoId) {
  return simpleAction(DELETE_TODO, { todoId });
}

export function toggleTodoVisibility() {
  return simpleAction(TOGGLE_TODO_VISIBILITY);
}

export function undoTodosAction(undoState){
  return simpleAction(UNDO_ACTION, { undoState })
}