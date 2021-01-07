import { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class EditComment extends Component {
  state = {
    content: this.props.initialContent
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.props.id, this.state.content)
  }

  handleCancel(e) {
    e.preventDefault();

    this.props.handleCancel();
  }

  render() {
    return (
      <form className="EditComment" onSubmit={(e) => this.handleSubmit(e)}>
        <textarea
          id="content"
          name="content"
          defaultValue={this.props.initialContent}
          onChange={(e) => this.setState({
            content: e.target.value
          })}
          required
        ></textarea>

        <div className="EditComment__button-wrapper">
          <button type="submit" className="EditComment__submit">
            Submit
          </button>

          <button
            type="submit"
            onClick={(e) => this.handleCancel(e)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

EditComment.propTypes = {
  initialContent: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default EditComment;