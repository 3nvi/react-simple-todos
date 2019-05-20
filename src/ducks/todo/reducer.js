import uuidv4 from 'uuid/v4';
import { omit, without } from 'lodash';
import * as types from './types';

const initialState = {
  showCompleted: false,
  byKeyId: {},
  keys: [],
};

function todo(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TODO: {
      const uniqueId = uuidv4();
      return {
        ...state,
        byKeyId: { ...state.byKeyId, [uniqueId]: action.payload },
        keys: [uniqueId, ...state.keys],
      };
    }
    case types.UPDATE_TODO: {
      const { todoId: updateId, updates } = action.payload;
      return {
        ...state,
        byKeyId: { ...state.byKeyId, [updateId]: { ...state.byKeyId[updateId], ...updates } },
      };
    }
    case types.TOGGLE_TODO_AS_DONE: {
      const { todoId: toggleId } = action.payload;
      const todoItem = state.byKeyId[toggleId];
      return {
        ...state,
        byKeyId: { ...state.byKeyId, [toggleId]: { ...todoItem, done: !todoItem.done } },
      };
    }
    case types.TOGGLE_TODO_VISIBILITY: {
      return {
        ...state,
        showCompleted: !state.showCompleted,
      };
    }
    case types.DELETE_TODO:
      return {
        ...state,
        byKeyId: omit(state.byKeyId, action.payload.todoId),
        keys: without(state.keys, action.payload.todoId),
      };
    case types.UNDO_ACTION:
      return { ...action.payload.undoState };
    default:
      return state;
  }
}

export default todo;
