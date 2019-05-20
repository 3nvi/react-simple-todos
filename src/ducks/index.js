import { combineReducers } from 'redux';
import snackbarReducer, { __REDUX_STATE_KEY__ as snackbarStateKey } from './snackbar';
import todoReducer, { __REDUX_STATE_KEY__ as todoStateKey } from './todo';

export default combineReducers({
  [snackbarStateKey]: snackbarReducer,
  [todoStateKey]: todoReducer,
});
