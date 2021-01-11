import { Component } from 'react';
import PropTypes from 'prop-types';
import APIError from '../APIError/index';

class EditPost extends Component {
  state = {
    content: this.props.content,
    isSubmitting: false,
    error: null
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

    this.props.handleSubmit(content)
      .then(() => this.setState({
        isSubmitting: false,
        error: null
      }))
      .catch((error) => this.setState({
        isSubmitting: false,
        error
      }));
  }

  render() {
    const { content, isSubmitting, error } = this.state;

    return (
      <div className="EditPost">
        <form onSubmit={(e) => this.handleSubmit(e)}>
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
          </div>
        </form>

        {isSubmitting && <p>Editing post...</p>}

        {error && <APIError message={error.message} />}
      </div>
    );
  }
}

EditPost.propTypes = {
  content: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default EditPost;