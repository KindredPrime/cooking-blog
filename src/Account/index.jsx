import { Component } from 'react';
import PropTypes from 'prop-types';
import PostsList from '../PostsList/index';
import UserCommentsList from '../UserCommentsList/index';
import * as API from '../apiCalls';

class Account extends Component {
  state = {
    blogPosts: null,
    comments: null
  };

  componentDidMount() {
    const { username } = this.props;

    API.getCommentsByUser(username)
      .then((comments) => {
        this.setState({
          comments
        });
      })
      .catch(console.log);

    API.getBlogPostsByUser(username)
      .then((blogPosts) => this.setState({ blogPosts }))
      .catch(console.log);
  }

  componentWillUnmount() {
    API.abortTasks();
  }

  render() {
    const { username, email } = this.props;
    const { blogPosts, comments } = this.state;

    return (
      <main className="Account">
        <h1>{username}</h1>

        <p>Email: {email}</p>

        {blogPosts && <PostsList initialBlogPosts={blogPosts} />}

        {comments && <UserCommentsList initialComments={comments} />}
      </main>
    );
  }
}

Account.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default Account;