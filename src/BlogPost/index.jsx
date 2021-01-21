import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    const { title, authorId, authorUsername, content, lastEdited } = this.props;
    const { isEditing } = this.state;
    const { user } = this.context;

    return (
      <section className="BlogPost">
        <header>
          <h1>{title}</h1>
          <p>
            By <Link className="BlogPost__author" to={`/users/${authorId}`}>{authorUsername}</Link>
          </p>
        </header>

        <p className="timestamp">Last edited: {lastEdited}</p>

        {isEditing
          ? <EditPost content={content} handleCancel={this.handleEditCancel} handleSubmit={this.handleEditSubmit} />
          : <>
            <p className="BlogPostPage__content">{content}</p>

            {/* Display an edit button if the current user is the author */}
            {(user && user.id === authorId) &&
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
  authorId: PropTypes.number.isRequired,
  authorUsername: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  lastEdited: PropTypes.string.isRequired,
  handleEditSubmit: PropTypes.func.isRequired
};

export default BlogPost;