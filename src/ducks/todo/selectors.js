import { createSelector } from 'reselect';
export const __REDUX_STATE_KEY__ = 'todo';
export const getReduxStateSlice = state => state[__REDUX_STATE_KEY__];

// retrieves a single todo item based on its Id
export const getTodo = (state, id) => getReduxStateSlice(state).byKeyId[id];

// retrieves an ordered list of all the todos, based on the visibility that the user has selected.
// This means that this todos might only contain the non-completed ones or even all (depending on
// the `showCompleted` state flag
export const getTodos = createSelector(
  state => getReduxStateSlice(state),
  state => getReduxStateSlice(state).showCompleted,
  (todoState, showCompleted) => {
    const todos = todoState.keys.map(id => ({
      id,
      ...todoState.byKeyId[id],
    }));

    if (showCompleted) {
      return todos;
    }
    return todos.filter(todo => !todo.done);
  }
);

// a flag that holds a boolean which decides whether we should show the done tasks or not
export const getTodoVisibility = state => getReduxStateSlice(state).showCompleted;

// the total amount of todos regardless of whether they are visible or not
export const getTotalTodos = state => getReduxStateSlice(state).keys.length;
