import { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sortEntities, formatDate, isOnLastPage } from '../util';
import TransitionButtons from '../TransitionButtons/index';
import './index.css';

class PostsList extends Component {
  state = {
    page: 1,
    sortedPosts: [],
    displayButtons: false
  };

  static defaultProps = {
    pageLimit: 10,
    initialBlogPosts: []
  };

  componentDidMount() {
    const { initialBlogPosts, pageLimit } = this.props;

    this.setState({
      sortedPosts: sortEntities(initialBlogPosts),
      displayButtons: initialBlogPosts.length > pageLimit
    });
  }

  render() {
    const { pageLimit } = this.props;
    const { page, sortedPosts, displayButtons } = this.state;

    const postsToRender = sortedPosts.slice((page-1) * pageLimit, page * pageLimit);

    return (
      <section className="PostsList">
        <header>
          <h2>Posts</h2>
        </header>

        <ul>
          {postsToRender.map((post) => {
            const { id, title, lastEdited } = post;

            return (
              <li key={`post-${id}`} className="PostsList__blog-post">
                <Link className="PostsList__title" to={`/blog-posts/${id}`}>{title}</Link>
                <p className="timestamp">Last edited: {formatDate(lastEdited)}</p>
              </li>
            );
          })}
        </ul>

        {displayButtons
          && <TransitionButtons
            isAtTheBeginning={page === 1}
            isAtTheEnd={isOnLastPage(sortedPosts, page, pageLimit)}
            handlePrevClick={() => {
              this.setState({
                page: page - 1
              });
            }}
            handleNextClick={() => {
              this.setState({
                page: page + 1
              });
            }}
          />}
      </section>
    );
  }
}

PostsList.propTypes = {
  initialBlogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastEdited: PropTypes.instanceOf(Date).isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ),
  pageLimit: PropTypes.number
};

export default PostsList;