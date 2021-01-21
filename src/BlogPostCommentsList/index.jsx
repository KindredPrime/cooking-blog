import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import { isOnLastPage } from '../util';
import Comment from '../Comment/index';
import EditComment from '../EditComment/index';
import AddComment from '../AddComment/index';
import TransitionButtons from '../TransitionButtons/index';
import './index.css';

class BlogPostCommentsList extends Component {
  static contextType = CookingContext;

  state = {
    page: 1,
    editingCommentId: null
  };

  static defaultProps = {
    pageLimit: 10,
    comments: []
  };

  // Any errors thrown by this function are caught in AddComment
  handleAdd = (content) => {
    const { user } = this.context;
    return this.props.handleAdd(content, user.id, user.username);
  }

  renderEdit = (id) => {
    this.setState({
      editingCommentId: id
    });
  };

  // Errors are caught and handled by the EditComment component
  handleEditSubmit = (id, content) => {
    return this.props.handleEditSubmit(id, content)
      // Un-render the EditComment
      .then(() => this.setState({
        editingCommentId: null
      }));
  };

  handleEditCancel = () => {
    this.setState({
      editingCommentId: null
    });
  };

  render() {
    const { user } = this.context;
    const { comments, pageLimit, handleDelete } = this.props;
    const { page, editingCommentId } = this.state;

    const displayButtons = comments.length > pageLimit;
    const commentsToRender = comments.slice((page-1) * pageLimit, page * pageLimit);

    return (
      <section className="BlogPostCommentsList">
        <header>
          <h2>Comments</h2>
        </header>

        {user && <AddComment handleSubmit={this.handleAdd} />}

        <ul>
          {commentsToRender.map((comment) => {
            const { id, lastEdited, content, creatorId, creatorUsername, deleted } = comment;

            if (!deleted && editingCommentId && id === editingCommentId) {
              return (
                <EditComment
                  key={`comment-${id}`}
                  id={id}
                  initialContent={content}
                  handleSubmit={this.handleEditSubmit}
                  handleCancel={this.handleEditCancel}
                />
              );
            }

            return (
              <Comment
                key={`comment-${id}`}
                id={id}
                creatorId={creatorId}
                creatorUsername={creatorUsername}
                content={content}
                lastEdited={lastEdited}
                deleted={deleted}
                handleEdit={this.renderEdit}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>

        {displayButtons
          && <TransitionButtons
            isAtTheBeginning={page === 1}
            isAtTheEnd={isOnLastPage(comments, page, pageLimit)}
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

BlogPostCommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      creatorId: PropTypes.number,
      creatorUsername: PropTypes.string,
      postId: PropTypes.number,
      postTitle: PropTypes.string,
      content: PropTypes.string.isRequired,
      lastEdited: PropTypes.string.isRequired
    })
  ),
  pageLimit: PropTypes.number,
  // handleAdd must return a thenable object
  handleAdd: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  // handleEditSubmit must return a thenable object
  handleEditSubmit: PropTypes.func.isRequired
};

export default BlogPostCommentsList;