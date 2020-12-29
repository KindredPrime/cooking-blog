import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../apiCalls';
import './index.css';

class PostsList extends Component {
  state = {
    posts: [],
    page: 1
  };

  isOnLastPage() {
    const { pageLimit } = this.props;
    const { page, posts } = this.state;
    return page * pageLimit > posts.length;
  }

  componentDidMount() {
    const { onlyUserPosts } = this.props;

    if (onlyUserPosts) {
      API.getPostsByUser(1)
        .then((posts) => this.setState({
          posts
        }))
        .catch(() => console.log('API process was aborted'));
    } else {
      API.getAllPosts()
        .then((posts) => {
          this.setState({
            posts
          });
        })
        // What else can/should I do when the process is aborted?
        .catch(() => console.log('API process was aborted'));
    }
  }

  componentWillUnmount() {
    // Abort any API calls that are still running
    API.abortTasks();
  }

  render() {
    const { pageLimit } = this.props;
    const { page, posts } = this.state;

    let postsToRender = posts || [];
    let displayButtons = false;
    if (posts && posts.length > pageLimit) {
      postsToRender = posts.slice((page-1) * pageLimit, page * pageLimit);
      displayButtons = true;
    }

    return (
      <div className="PostsList">
        <h1>Posts</h1>

        <ul>
          {postsToRender.map((post) => {
            const { id, title, lastEdited } = post;

            return (
              <li key={`post${id}`} className="blog-post">
                <NavLink className="blog-title" to={`/blogs/${id}`}>{title}</NavLink>
                <p className="timestamp">Last edited on {lastEdited}</p>
              </li>
            );
          })}
        </ul>

        {displayButtons &&
          <>
            <button
              type="button"
              className="page-button prev-posts"
              disabled={page === 1}
              onClick={() => this.setState({
                page: page-1
              })}
            >
              Previous
            </button>
            <button
              type="button"
              className="page-button"
              disabled={this.isOnLastPage()}
              onClick={() => this.setState({
                page: page+1
              })}
            >
              Next
            </button>
          </>}
      </div>
    );
  }
}

PostsList.defaultProps = {
  pageLimit: 10,
  onlyUserPosts: false
};

PostsList.propTypes = {
  pageLimit: PropTypes.number,
  onlyUserPosts: PropTypes.bool
};

export default PostsList;