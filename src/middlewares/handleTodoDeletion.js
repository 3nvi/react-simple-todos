import { addSnackbar } from 'ducks/snackbar';
import { DELETE_TODO, getTodo, getReduxStateSlice } from 'ducks/todo';

const handleTodoDeletion = store => next => action => {
  // Whenever a deletion occurs, this middleware will fire an action that will cause a snackbar to
  // be visible. This snackbar will hold the `undo` state, i.e. the state that we should revert to
  // if the user clicks on the undo button. Since the `next(action)` is called after the code block,
  // the item hasn't yet been deleted from redux.
  if (action.type === DELETE_TODO) {
    const todosState = getReduxStateSlice(store.getState());
    const itemToBeDeleted = getTodo(store.getState(), action.payload.todoId);

    store.dispatch(
      addSnackbar({ content: `Deleted "${itemToBeDeleted.content}"`, undoState: todosState })
    );
  }

  next(action);
};

export default handleTodoDeletion;
