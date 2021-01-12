import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import * as API from '../apiCalls';
import APIError from '../APIError';
import PostsList from '../PostsList/index';
import UserCommentsList from '../UserCommentsList/index';

class UserPage extends Component {
  static contextType = CookingContext;

  state = {
    username: null,
    email: null,
    blogPosts: null,
    comments: null,
    error: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const { user } = this.context;

    let pageUsername;
    API.getUserById(id)
      .then((pageUser) => {
        pageUsername = pageUser.username;

        if (user && pageUser.id === user.id) {
          this.setState({
            email: pageUser.email
          });
        }

        this.setState({
          username: pageUsername,
          error: null
        });
      })
      .then(() => API.getCommentsByCreator(pageUsername))
      .then((comments) => {
        this.setState({ comments })
      })
      .then(() => API.getBlogPostsByAuthor(pageUsername))
      .then((blogPosts) => {
        this.setState({ blogPosts })
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
    const { username, email, blogPosts, comments, error } = this.state;

    return (
      <main className="UserPage">
        <h1>{username}</h1>

        {email && <p>Email: {email}</p>}

        {error && <APIError message={error.message} />}

        {blogPosts && <PostsList initialBlogPosts={blogPosts} />}

        {comments && <UserCommentsList initialComments={comments} />}
      </main>
    );
  }
}

UserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default UserPage;