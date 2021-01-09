import { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class AddComment extends Component {
  state = {
    content: '',
  };

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.state.content)
      // Clear the comment text
      .then(() => this.setState({ content: '' }))
      .catch(console.log)
  }

  render() {
    return (
      <form className="AddComment" onSubmit={(e) => this.handleSubmit(e)}>
        <textarea
          id="content"
          name="content"
          value={this.state.content}
          onChange={(e) => this.setState({
            content: e.target.value
          })}
          required
        ></textarea>

        <button type="submit">
          Add Comment
        </button>
      </form>
    );
  }
}

// handleSubmit must return a thenable object
AddComment.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default AddComment;