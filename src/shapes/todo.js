import PropTypes from 'prop-types';

export default {
  content: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  dueDate: PropTypes.string,
}