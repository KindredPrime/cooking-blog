import { Component } from 'react';
import PropTypes from 'prop-types';
import * as API from '../apiCalls';
import { sortEntities } from '../util';
import BlogPost from '../BlogPost/index';
import BlogPostCommentsList from '../BlogPostCommentsList/index';
import './index.css';

class BlogPostPage extends Component {
  state = {
    blogPost: null,
    comments: null
  };

  handlePostEditSubmit = (content) => {
    const { id } = this.props.match.params;

    return API.patchBlogPost(id, content)
      .then((blogPost) => this.setState({ blogPost }))
      .catch(console.log);
  };

  handleCommentAdd = (content, creator) => {
    const { comments, blogPost } = this.state;

    const comment = {
      content,
      creator,
      postTitle: blogPost.title
    };

    return API.addComment(comment)
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

  handleCommentDelete = (id) => {
    const { comments } = this.state;

    API.deleteComment(id)
      .then(() => {
        const commentsIndex = comments.findIndex((comment) => comment.id === id);
        const comment = comments[commentsIndex];
        comments[commentsIndex] = {
          ...comment,
          lastEdited: new Date(),
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
      .then((blogPost) => {
        this.setState({
          blogPost
        });

        return blogPost.title;
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
    const { blogPost, comments } = this.state;

    return (
      <main className="BlogPostPage">
        {blogPost && <BlogPost
          title={blogPost.title}
          author={blogPost.author}
          content={blogPost.content}
          lastEdited={blogPost.lastEdited}
          handleEditSubmit={this.handlePostEditSubmit}
        />}

        {comments &&
          <BlogPostCommentsList
            comments={comments}
            postTitle={blogPost.title}
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