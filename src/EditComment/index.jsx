import { Component } from 'react';
import PropTypes from 'prop-types';
import APIError from '../APIError/index';
import './index.css';

class EditComment extends Component {
  state = {
    content: '',
    error: null
  };

  handleSubmit(e) {
    e.preventDefault();

    this.props.handleSubmit(this.props.id, this.state.content)
      .then(() => {
        this.setState({
          error: null
        });
      })
      .catch((error) => {
        this.setState({
          error
        })
      });
  }

  handleCancel(e) {
    e.preventDefault();

    this.props.handleCancel();
  }

  componentDidMount() {
    this.setState({
      content: this.props.initialContent
    });
  }

  render() {
    const { error } = this.state;

    return (
      <div className="EditComment">
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

        {error && <APIError message={error.message} />}
      </div>
    );
  }
}

EditComment.propTypes = {
  initialContent: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default EditComment;