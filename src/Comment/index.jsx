import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import { formatDate } from '../util';
import './index.css';

class Comment extends Component {
  static contextType = CookingContext;

  render() {
    const { username } = this.context;
    const { id, creator, postTitle, content, lastEdited, deleted, handleEdit, handleDelete } = this.props;

    return (
      <li className="Comment">
        {creator && <p className="Comment__creator">{creator}</p>}
        {postTitle && <p className="Comment__post-title">{postTitle}</p>}
        <p className="Comment__content">{content}</p>
        <p className="Comment__timestamp">Last edited on {formatDate(lastEdited)}</p>

        {(!deleted && username && username === creator) &&
          <div className="Comment__buttons">
            <button
              type="button"
              onClick={() => handleEdit(id)}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>}
      </li>
    );
  }
}

/*
  There are instances where it is redundant to include either the creator or the postTitle, so they are optional.
  Example: the comments on a user's account page do not need to include the user as their creator

  content is null when the comment has been marked as deleted
*/
Comment.propTypes = {
  id: PropTypes.number.isRequired,
  creator: PropTypes.string,
  postTitle: PropTypes.string,
  content: PropTypes.string,
  lastEdited: PropTypes.instanceOf(Date).isRequired,
  deleted: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Comment;