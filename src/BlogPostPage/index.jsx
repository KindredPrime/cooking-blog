import { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../apiCalls';
import { formatDate, sortEntities } from '../util';
import APIError from '../APIError/index';
import BlogPost from '../BlogPost/index';
import BlogPostCommentsList from '../BlogPostCommentsList/index';
import './index.css';

class BlogPostPage extends Component {
  state = {
    blogPost: null,
    comments: null,
    error: null
  };

  /*
    Errors thrown by the API call are caught and handled in the BlogPost component
  */
  handlePostEditSubmit = (content) => {
    const { id } = this.props.match.params;

    return API.patchBlogPost(id, content)
      .then((blogPost) => this.setState({ blogPost }))
  };

  // Errors thrown by the API call are caught and handled in the BlogPostCommentsList component
  handleCommentAdd = (content, creatorId, creatorUsername) => {
    const { comments, blogPost } = this.state;

    const comment = {
      content,
      creatorId,
      creatorUsername,
      postId: blogPost.id,
      postTitle: blogPost.title
    };

    return API.addComment(comment)
      .then((newComment) => {
        const modifiedComment = {
          ...newComment,
          // nullify these fields so they aren't rendered
          postId: null,
          postTitle: null
        };

        this.setState({
          comments: sortEntities([modifiedComment, ...comments])
        });
      });
  };

  // Errors thrown by the API call are caught and handled in the BlogPostCommentsList component
  handleCommentDelete = (id) => {
    const { comments } = this.state;

    return API.deleteComment(id)
      .then(() => {
        const commentsIndex = comments.findIndex((comment) => comment.id === id);
        const comment = comments[commentsIndex];
        comments[commentsIndex] = {
          ...comment,
          lastEdited: formatDate(new Date().toString()),
          content: '[Deleted]',
          creatorId: null,
          creatorUsername: null,
          deleted: true
        };

        this.setState({
          comments: sortEntities(comments)
        });
      });
  };

  // Errors thrown by the API call are caught and handled in the BlogPostCommentsList component
  handleCommentEditSubmit = (id, content) => {
    return API.patchComment(id, content)
      .then((patchedComment) => {
        const { comments } = this.state;

        const commentIndex = comments.findIndex((comment) => comment.id === patchedComment.id);
        comments[commentIndex] = {
          ...patchedComment,
          // It's redundant to include a comment's post title when it's on the blog post page
          blogPost: null
        };

        this.setState({
          comments: sortEntities(comments)
        });
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    API.getBlogPostById(id)
      .then((blogPost) => {
        this.setState({
          blogPost,
          blogPostError: null,
          error: null
        });
      })
      .then(() => API.getCommentsByBlogPost(id))
      .then((comments) => {
        this.setState({
          comments: sortEntities(comments)
        });
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
  }

  componentWillUnmount() {
    API.abortTasks();
  }

  render() {
    const { blogPost, comments, error } = this.state;

    return (
      <main className="BlogPostPage">
        {error && <APIError message={error.message} />}

        {blogPost && <BlogPost
          title={blogPost.title}
          authorId={blogPost.authorId}
          authorUsername={blogPost.authorUsername}
          content={blogPost.content}
          lastEdited={blogPost.lastEdited}
          handleEditSubmit={this.handlePostEditSubmit}
        />}

        {comments &&
          <BlogPostCommentsList
            comments={comments}
            handleAdd={this.handleCommentAdd}
            handleDelete={this.handleCommentDelete}
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