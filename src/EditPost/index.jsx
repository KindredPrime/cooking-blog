import { Component } from 'react';
import PropTypes from 'prop-types';

class EditPost extends Component {
  state = {
    content: this.props.content,
    isSubmitting: false
  };

  handleCancel(e) {
    e.preventDefault();

    this.props.handleCancel();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { content } = this.state;

    this.setState({
      isSubmitting: true
    });

    this.props.handleSubmit(content);
  }

  render() {
    const { content, isSubmitting } = this.state;

    return (
      <form className="EditPost" onSubmit={(e) => this.handleSubmit(e)}>
        <textarea
          defaultValue={content}
          onChange={(e) => this.setState({
            content: e.target.value
          })}
        ></textarea>

        <div className="EditPost__buttons">
          <button
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <button
            type="submit"
            onClick={(e) => this.handleCancel(e)}
            disabled={isSubmitting}
          >
            Cancel
          </button>

        {isSubmitting && <p>Editing post...</p>}
        </div>
      </form>
    );
  }
}

EditPost.propTypes = {
  content: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default EditPost;