import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CookingContext from '../CookingContext';
import APIError from '../APIError/index';
import './index.css';

class Comment extends Component {
  static contextType = CookingContext;

  state = {
    error: null
  };

  handleDelete(id) {
    this.props.handleDelete(id)
      .then(() => {
        this.setState({
          error: null
        });
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
  }

  render() {
    const { user } = this.context;
    const { id, creatorId, creatorUsername, postId, postTitle, content, lastEdited, deleted, handleEdit } = this.props;
    const { error } = this.state;

    return (
      <li className="Comment">
        {(creatorId && creatorUsername)
          && <Link className="Comment__creator" to={`/users/${creatorId}`}>{creatorUsername}</Link>}
        {(postId && postTitle)
          && <Link className="Comment__post-title" to={`/blog-posts/${postId}`}>
            {postTitle}
          </Link>}
        <p className="Comment__content">{content}</p>
        <p className="timestamp">Last edited: {lastEdited}</p>

        {(!deleted && user && creatorId && user.id === creatorId) &&
          <div className="Comment__buttons">
            <button
              type="button"
              onClick={() => handleEdit(id)}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => this.handleDelete(id)}
            >
              Delete
            </button>
          </div>}

        {error && <APIError message={error.message} />}
      </li>
    );
  }
}

/*
  There are instances where it is redundant to include either the creator or the blog post,
  so they're optional.
  Example: the comments on a user's account page do not need to include the user as their creator

  content is null when the comment has been marked as deleted
*/
Comment.propTypes = {
  id: PropTypes.number.isRequired,
  creatorId: PropTypes.number,
  creatorUsername: PropTypes.string,
  postId: PropTypes.number,
  postTitle: PropTypes.string,
  content: PropTypes.string,
  lastEdited: PropTypes.string.isRequired,
  deleted: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Comment;