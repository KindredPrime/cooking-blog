import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import * as API from '../apiCalls';
import Comment from '../Comment/index';
import EditComment from '../EditComment/index';
import AddComment from '../AddComment/index';
import './index.css';

class CommentsList extends Component {
  static contextType = CookingContext;

  state = {
    page: 1,
    currentComments: this.props.initialComments,
    editingCommentId: null
  };

  static defaultProps = {
    pageLimit: 10,
    initialComments: []
  };

  excludeFields(comment) {
    const { isExcludingCreator, isExcludingPostTitle } = this.props;

    // Exclude the creator from the comment when rendering
    if (isExcludingCreator) {
      comment = {
        ...comment,
        creator: null
      };
    }

    // Exclude the post title from the comment when rendering
    if (isExcludingPostTitle) {
      comment = {
        ...comment,
        postTitle: null
      };
    }

    return comment;
  }

  sortComments(comments) {
    return comments.sort((a, b) => {
      return b.lastEdited.valueOf() - a.lastEdited.valueOf();
    });
  }

  renderEdit = (id) => {
    this.setState({
      editingCommentId: id
    });
  }

  handleEditSubmit = (id, content) => {
    API.patchCommentById(id, content)
      .then((patchedComment) => {
        const { currentComments } = this.state;

        const commentIndex = currentComments.findIndex((comment) => comment.id === patchedComment.id);
        currentComments[commentIndex] = this.excludeFields(patchedComment);

        this.setState({
          currentComments: this.sortComments(currentComments),
          editingCommentId: null
        });
      })
      .catch(console.log);
  };

  handleEditCancel = () => {
    this.setState({
      editingCommentId: null
    });
  };

  handleDelete = (id) => {
    const { currentComments } = this.state;

    API.deleteCommentById(id)
      .then(() => {
        const commentsIndex = currentComments.findIndex((comment) => comment.id === id);
        const comment = currentComments[commentsIndex];
        currentComments[commentsIndex] = {
          ...comment,
          lastEdited: new Date(Date.now()),
          content: null,
          creator: null,
          deleted: true
        };

        this.setState({
          currentComments: this.sortComments(currentComments)
        });
      })
      .catch(console.log)
  };

  handleAddSubmit = (content) => {
    const { postTitle } = this.props;
    const { username } = this.context;
    const { currentComments } = this.state;

    const comment = {
      content,
      creator: username,
      postTitle
    };

    API.addComment(comment)
      .then((newComment) => {
        const modifiedComment = this.excludeFields(newComment);

        this.setState({
          currentComments: [modifiedComment, ...currentComments]
        })
      })
      .catch(console.log);
  };

  isOnLastPage() {
    const { pageLimit } = this.props;
    const { page, currentComments } = this.state;
    return page * pageLimit > currentComments.length;
  }

  componentDidMount() {
    const { initialComments } = this.props;

    const modifiedComments = initialComments
      .map((comment) => this.excludeFields(comment));

    this.setState({
      currentComments: this.sortComments(modifiedComments)
    });
  }

  componentWillUnmount() {
    API.abortTasks();
  }

  render() {
    const { username } = this.context;
    const { pageLimit, renderAdd } = this.props;
    const { currentComments, page, editingCommentId } = this.state;

    let commentsToRender = currentComments;
    let displayButtons = false;
    if (currentComments.length > pageLimit) {
      commentsToRender = currentComments.slice((page-1) * pageLimit, page * pageLimit);
      displayButtons = true;
    }

    return (
      <section className="CommentsList">
        <h2>Comments</h2>

        {renderAdd && username && <AddComment handleSubmit={this.handleAddSubmit} />}

        <ul>
          {commentsToRender.map((comment) => {
            const { id, lastEdited, content, creator, postTitle, deleted } = comment;

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
                creator={creator}
                postTitle={postTitle}
                content={content}
                lastEdited={lastEdited}
                deleted={deleted}
                handleEdit={this.renderEdit}
                handleDelete={this.handleDelete}
              />
            );
          })}
        </ul>

        {displayButtons && (
          <>
            <button
              type="button"
              className="page-button prev"
              disabled={page === 1}
              onClick={() => this.setState({
                page: page-1
              })}
            >
              Previous
            </button>
            <button
              type="button"
              className="page-button next"
              disabled={this.isOnLastPage()}
              onClick={() => this.setState({
                page: page+1
              })}
            >
              Next
            </button>
          </>
        )}
      </section>
    );
  }
}

CommentsList.propTypes = {
  initialComments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastEdited: PropTypes.instanceOf(Date),
      content: PropTypes.string.isRequired,
      creator: PropTypes.string,
      postTitle: PropTypes.string
    })
  ),
  pageLimit: PropTypes.number,
  isExcludingPostTitle: PropTypes.bool,
  isExcludingCreator: PropTypes.bool,
  renderAdd: PropTypes.bool,
  postTitle: PropTypes.string
};

export default CommentsList;