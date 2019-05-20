import { connect } from 'react-redux';
import { getSnackbar, deleteSnackbar } from 'ducks/snackbar';
import { undoTodosAction } from 'ducks/todo';
import Snackbar from './Snackbar';

const mapStateToProps = state => ({
  snackbar: getSnackbar(state),
});

const mapDispatchToProps = { deleteSnackbar, undoTodosAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
