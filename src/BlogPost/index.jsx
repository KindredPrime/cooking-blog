import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../util';
import CookingContext from '../CookingContext';
import EditPost from '../EditPost/index';
import './index.css';

class BlogPost extends Component {
  static contextType = CookingContext;

  state = {
    isEditing: false
  };

  handleEditCancel = () => {
    this.setState({
      isEditing: false
    });
  }

  /*
    Any errors thrown by this function are caught by the function that calls this function
  */
  handleEditSubmit = (content) => {
    return this.props.handleEditSubmit(content)
      .then(() => this.setState({
        isEditing: false
      }));
  }

  render() {
    const { title, author, content, lastEdited } = this.props;
    const { isEditing, error } = this.state;
    const { user } = this.context;

    return (
      <section className="BlogPost">
        <header>
          <h1>{title}</h1>
          <p>
            By <Link className="BlogPost__author" to={`/users/${author.id}`}>{author.username}</Link>
          </p>
        </header>

        <p className="BlogPost__timestamp">Last edited: {formatDate(lastEdited)}</p>

        {isEditing
          ? <EditPost content={content} handleCancel={this.handleEditCancel} handleSubmit={this.handleEditSubmit} />
          : <>
            <p className="BlogPostPage__content">{content}</p>

            {/* Display an edit button if the current user is the author */}
            {(user && user.id === author.id) &&
              <button
                type="button"
                onClick={() => this.setState({ isEditing: true })}
              >
                Edit
              </button>}
          </>}
      </section>
    );
  }
}

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired,
  content: PropTypes.string.isRequired,
  lastEdited: PropTypes.instanceOf(Date).isRequired,
  handleEditSubmit: PropTypes.func.isRequired
};

export default BlogPost;