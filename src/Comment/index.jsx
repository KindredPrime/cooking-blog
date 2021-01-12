import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CookingContext from '../CookingContext';
import { formatDate } from '../util';
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
    const { id, creator, blogPost, content, lastEdited, deleted, handleEdit } = this.props;
    const { error } = this.state;

    return (
      <li className="Comment">
        {creator && <Link className="Comment__creator" to={`/users/${creator.id}`}>{creator.username}</Link>}
        {blogPost
          && <Link className="Comment__post-title" to={`/blog-posts/${blogPost.id}`}>
            {blogPost.title}
          </Link>}
        <p className="Comment__content">{content}</p>
        <p className="Comment__timestamp">Last edited on {formatDate(lastEdited)}</p>

        {(!deleted && user && creator && user.id === creator.id) &&
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
  There are instances where it is redundant to include either the creator or the blog post title,
  so they're optional.
  Example: the comments on a user's account page do not need to include the user as their creator

  content is null when the comment has been marked as deleted
*/
Comment.propTypes = {
  id: PropTypes.number.isRequired,
  creator: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }),
  blogPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastEdited: PropTypes.instanceOf(Date).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired,
    content: PropTypes.string.isRequired
  }),
  content: PropTypes.string,
  lastEdited: PropTypes.instanceOf(Date).isRequired,
  deleted: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Comment;