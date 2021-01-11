import { Component } from 'react';
import PropTypes from 'prop-types';
import APIError from '../APIError/index';
import './index.css';

class AddComment extends Component {
  state = {
    content: '',
    error: null
  };

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.state.content)
      // Clear the comment text
      .then(() => this.setState({
        content: '',
        error: null
      }))
      .catch((error) => this.setState({
        error
      }));
  }

  render() {
    const { content, error } = this.state;

    return (
      <form className="AddComment" onSubmit={(e) => this.handleSubmit(e)}>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => this.setState({
            content: e.target.value
          })}
          required
        ></textarea>

        <button type="submit">
          Add Comment
        </button>

        {error && <APIError message={error.message} />}
      </form>
    );
  }
}

// handleSubmit must return a thenable object
AddComment.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default AddComment;