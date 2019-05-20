import { addSnackbar } from 'ducks/snackbar';
import moment from 'moment';
import { TOGGLE_TODO_AS_DONE, getTodo } from 'ducks/todo';
import { DATE_FORMAT } from 'utils/constants';

// holds a list of dates that a task was completed
const completedTodoDates = [];

// holds a list of completed IDs. WE allow a done task to be marked as undone, thus when it becomes
// done again, we don't wanna count it twice by mistake. This list will help us with that.
const completedTodoIds = [];

const handleTodoCompletion = store => next => action => {
  // Whenever a deletion occurs, this middleware will fire an action that will cause a snackbar to
  // be visible. This snackbar will hold the `undo` state, i.e. the state that we should revert to
  // if the user clicks on the undo button. Since the `next(action)` is called after the code block,
  // the item hasn't yet been deleted from redux.
  if (action.type === TOGGLE_TODO_AS_DONE) {
    const { todoId } = action.payload;
    const item = getTodo(store.getState(), todoId);

    if (!item.done && item.dueDate && !completedTodoIds.includes(todoId)) {
      completedTodoIds.push(todoId);
      completedTodoDates.push(item.dueDate);

      const completedTodosInThisParticularDay = completedTodoDates.filter(d =>
        moment(d, DATE_FORMAT).isSame(moment(item.dueDate, DATE_FORMAT), 'day')
      ).length;

      if (completedTodosInThisParticularDay && completedTodosInThisParticularDay % 3 === 0) {
        store.dispatch(addSnackbar({ content: "🎉 Hooray! You've completed 3 tasks!" }));
      }
    }
  }

  next(action);
};

export default handleTodoCompletion;
