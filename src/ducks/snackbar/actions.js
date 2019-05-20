import { ADD_SNACKBAR, DELETE_SNACKBAR } from './types';
import { simpleAction } from '../utils';

export function addSnackbar({ content, undoState }) {
  return simpleAction(ADD_SNACKBAR, { content, undoState });
}

export function deleteSnackbar() {
  return simpleAction(DELETE_SNACKBAR);
}
