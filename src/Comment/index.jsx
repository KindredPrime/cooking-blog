import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';

class Comment extends Component {
  static contextType = CookingContext;

  render() {
    const { username } = this.context;
    const { creator, content, lastEdited, handleEdit, handleDelete } = this.props;

    return (
      <li className="Comment">
        <p className="creator">{creator}</p>
        <p className="content">{content}</p>
        <p className="timestamp">Last edited on {lastEdited}</p>

        {(username && username === creator) &&
          <div className="comment-buttons">
            <button
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>}
      </li>
    );
  }
}

Comment.propTypes = {
  creator: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  lastEdited: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Comment;