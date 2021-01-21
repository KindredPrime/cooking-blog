import { Component } from 'react';
import PropTypes from 'prop-types';
import { isOnLastPage, sortEntities } from '../util';
import Comment from '../Comment/index';
import TransitionButtons from '../TransitionButtons/index';
import './index.css';

class UserCommentsList extends Component {
  state = {
    page: 1,
    sortedComments: [],
    displayButtons: false
  };

  static defaultProps = {
    pageLimit: 10,
    initialComments: []
  };

  componentDidMount() {
    const { initialComments, pageLimit } = this.props;

    this.setState({
      sortedComments: sortEntities(initialComments),
      displayButtons: initialComments.length > pageLimit
    });
  }

  render() {
    const { pageLimit } = this.props;
    const { page, sortedComments, displayButtons } = this.state;

    let commentsToRender = sortedComments.slice((page-1) * pageLimit, page * pageLimit);

    return (
      <section className="UserCommentsList">
        <header>
          <h2>Comments</h2>
        </header>

        <ul>
          {commentsToRender.map((comment) => {
            const { id, lastEdited, content, postId, postTitle, deleted } = comment;

            return (
              <Comment
                key={`comment-${id}`}
                id={id}
                postId={postId}
                postTitle={postTitle}
                content={content}
                lastEdited={lastEdited}
                deleted={deleted}
                handleEdit={() => {}}
                handleDelete={() => {}}
              />
            );
          })}
        </ul>

        {displayButtons
          && <TransitionButtons
            isAtTheBeginning={page === 1}
            isAtTheEnd={isOnLastPage(sortedComments, page, pageLimit)}
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

UserCommentsList.propTypes = {
  initialComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastEdited: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      creatorId: PropTypes.number.isRequired,
      creatorUsername: PropTypes.string.isRequired,
      postId: PropTypes.number.isRequired,
      postTitle: PropTypes.string.isRequired,
    })
  ),
  pageLimit: PropTypes.number
};

export default UserCommentsList;