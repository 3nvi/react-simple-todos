export const __REDUX_STATE_KEY__ = 'snackbar';
export const getReduxStateSlice = state => state[__REDUX_STATE_KEY__];

// retrieves the snackbar data
export const getSnackbar = (state) => getReduxStateSlice(state);
