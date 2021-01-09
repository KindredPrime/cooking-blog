import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../util';
import CookingContext from '../CookingContext';
import EditPost from '../EditPost/index';

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
    const { lastEdited, title, author, content } = this.props;
    const { isEditing } = this.state;
    const { username } = this.context;

    return (
      <section className="BlogPost">
        <h1>{title}</h1>
        <h2>By {author}</h2>

        <p className="BlogPost__timestamp">Last edited on {formatDate(lastEdited)}</p>

        {isEditing
          ? <EditPost content={content} handleCancel={this.handleEditCancel} handleSubmit={this.handleEditSubmit} />
          : <>
            <p className="BlogPostPage__content">{content}</p>

            {/* Display an edit button if the current user is the author */}
            {(username && username === author) &&
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
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  lastEdited: PropTypes.instanceOf(Date).isRequired,
  handleEditSubmit: PropTypes.func.isRequired
};

export default BlogPost;