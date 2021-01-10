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

  handleEditSubmit = (content) => {
    this.props.handleEditSubmit(content)
      .then(() => this.setState({ isEditing: false }))
      .catch(console.log);
  }

  render() {
    const { title, author, content, lastEdited } = this.props;
    const { isEditing } = this.state;
    const { user } = this.context;

    return (
      <section className="BlogPost">
        <h1>{title}</h1>
        <h2>
          By <Link className="BlogPost__author" to={`/user/${author.id}`}>{author.username}</Link>
        </h2>

        <p className="BlogPost__timestamp">Last edited on {formatDate(lastEdited)}</p>

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