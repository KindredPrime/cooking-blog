import PropTypes from 'prop-types';

function TransitionButtons(props) {
  const { isAtTheBeginning, isAtTheEnd, handlePrevClick, handleNextClick } = props;

  return (
    <div className="TransitionButtons">
      <button
        type="button"
        className="TransitionButtons__prev"
        disabled={isAtTheBeginning}
        onClick={handlePrevClick}
      >
        Previous
      </button>
      <button
        type="button"
        className="TransitionButtons__next"
        disabled={isAtTheEnd}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}

TransitionButtons.propTypes = {
  isAtTheBeginning: PropTypes.bool.isRequired,
  isAtTheEnd: PropTypes.bool.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default TransitionButtons;