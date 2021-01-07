import { Component } from 'react';
import PropTypes from 'prop-types';
import PostsList from '../PostsList/index';
import UserCommentsList from '../UserCommentsList/index';
import * as API from '../apiCalls';

class Account extends Component {
  state = {
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
  }

  render() {
    const { username, email } = this.props;
    const { comments } = this.state;

    return (
      <main className="Account">
        <h1>{username}</h1>

        <p>Email: {email}</p>

        <PostsList onlyUserPosts />

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