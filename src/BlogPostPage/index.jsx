import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import * as API from '../apiCalls';
import { formatDate, sortEntities } from '../util';
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

  handlePostEditCancel = () => {
    this.setState({
      isEditingPost: false
    });
  }

  handlePostEditSubmit = (content) => {
    const { id } = this.props.match.params;

    API.patchBlogPost(id, content)
      .then(() => {
        this.setState({
          content,
          isEditingPost: false
        });
      })
      .catch(console.log);
  }

  handleAdd = (content) => {
    const { username } = this.context;
    const { comments, title } = this.state;

    const comment = {
      content,
      creator: username,
      postTitle: title
    };

    API.addComment(comment)
      .then((newComment) => {
        const modifiedComment = {
          ...newComment,
          postTitle: null
        };

        this.setState({
          comments: sortEntities([modifiedComment, ...comments])
        });
      })
      .catch(console.log);
  };

  handleDelete = (id) => {
    const { comments } = this.state;

    API.deleteComment(id)
      .then(() => {
        const commentsIndex = comments.findIndex((comment) => comment.id === id);
        const comment = comments[commentsIndex];
        comments[commentsIndex] = {
          ...comment,
          lastEdited: new Date(Date.now()),
          content: '[Deleted]',
          creator: null,
          deleted: true
        };

        this.setState({
          comments: sortEntities(comments)
        });
      })
      .catch(console.log)
  };

  handleCommentEditSubmit = (id, content) => {
    return API.patchComment(id, content)
      .then((patchedComment) => {
        const { comments } = this.state;

        const commentIndex = comments.findIndex((comment) => comment.id === patchedComment.id);
        comments[commentIndex] = {
          ...patchedComment,
          // It's redundant to include a comment's post title when it's on the blog post page
          postTitle: null
        };

        this.setState({
          comments: sortEntities(comments)
        });
      })
      .catch(console.log);
  };

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
      .then((comments) => this.setState({
        comments: sortEntities(comments)
      }))
      .catch(console.log);
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
          ? <EditPost content={content} handleCancel={this.handlePostEditCancel} handleSubmit={this.handlePostEditSubmit} />
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

        {comments &&
          <BlogPostCommentsList
            comments={comments}
            postTitle={title}
            handleAdd={this.handleAdd}
            handleDelete={this.handleDelete}
            handleEditSubmit={this.handleCommentEditSubmit}
          />}
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