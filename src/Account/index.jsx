import PropTypes from 'prop-types';
import PostsList from '../PostsList/index';
import CommentsList from '../CommentsList/index';

function Account(props) {
  const { username, email } = props;

  return (
    <main className="Account">
      <h1>{username}</h1>

      <p>Email: {email}</p>

      <PostsList />

      <CommentsList />
    </main>
  );
}

Account.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default Account;