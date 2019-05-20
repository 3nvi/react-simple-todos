import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import handleTodoCompletion from 'middlewares/handleTodoCompletion';
import handleTodoDeletion from 'middlewares/handleTodoDeletion';
import rootReducer from 'ducks';

let composeEnhancers;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

// a Generic function that returns a new store configured with the reducers & middlewares of the app
export const createStore = (initialState = {}) =>
  createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(handleTodoCompletion, handleTodoDeletion))
  );

export default createStore();
