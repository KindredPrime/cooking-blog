import { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class AddComment extends Component {
  state = {
    content: null,
  };

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.state.content);

    this.setState({
      content: null
    });
  }

  render() {
    return (
      <form className="AddComment" onSubmit={(e) => this.handleSubmit(e)}>
        <textarea
          id="content"
          name="content"
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

AddComment.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default AddComment;