import * as types from './types';

const initialState = null;

function snackbar(state = initialState, action) {
  switch (action.type) {
    case types.ADD_SNACKBAR: {
      return {
        ...state,
        content: action.payload.content,
        undoState: action.payload.undoState,
      };
    }
    case types.DELETE_SNACKBAR:
      return initialState;
    default:
      return state;
  }
}

export default snackbar;
