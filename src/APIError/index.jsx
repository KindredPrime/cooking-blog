import PropTypes from 'prop-types';
import './index.css';

function APIError(props) {
  return (
    <p className="APIError">
      {props.message}
    </p>
  );
}

APIError.propTypes = {
  message: PropTypes.string.isRequired
};

export default APIError;