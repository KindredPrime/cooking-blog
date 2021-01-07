import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import * as API from '../apiCalls';
import { formatDate } from '../util';
import EditPost from '../EditPost/index';
import BlogPostCommentsList from '../BlogPostCommentsList/index';
import './index.css';

class BlogPostPage extends Component {
  static contextType = CookingContext;

  state = {
    isEditingPost: false,
    lastEdited: null,
    title: null,
    author: null,
    content: null,
    comments: null
  };

  handleEditCancel = () => {
    this.setState({
      isEditingPost: false
    });
  }

  handleEditSubmit = (content) => {
    const { id } = this.props.match.params;

    API.patchBlogPostById(id, content)
      .then(() => {
        this.setState({
          content,
          isEditingPost: false
        });
      })
      .catch(console.log);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    API.getBlogPostById(id)
      .then((post) => {
        const { lastEdited, title, author, content } = post;

        this.setState({
          lastEdited,
          title,
          author,
          content
        });

        return title;
      })
      .then((title) => API.getCommentsByBlogPost(title))
      .then((comments) => {
        this.setState({
          comments
        });
      })
      .catch((error) => console.log(error));
  }

  componentWillUnmount() {
    API.abortTasks();
  }

  render() {
    const { isEditingPost, lastEdited, title, author, content, comments } = this.state;
    const { username } = this.context;

    return (
      <main className="BlogPostPage">
        <h1>{title}</h1>
        <h2>By {author}</h2>

        <p>Last edited on {formatDate(lastEdited)}</p>

        {isEditingPost
          ? <EditPost content={content} handleCancel={this.handleEditCancel} handleSubmit={this.handleEditSubmit} />
          : <>
            <p className="BlogPostPage__content">{content}</p>

            {/* Display an edit button if the current user is the author */}
            {(username && username === author) &&
              <button
                type="button"
                onClick={() => this.setState({ isEditingPost: true })}
              >
                Edit
              </button>}
          </>}

        {comments && <BlogPostCommentsList initialComments={comments} postTitle={title} />}
      </main>
    );
  }
}

BlogPostPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

export default BlogPostPage;