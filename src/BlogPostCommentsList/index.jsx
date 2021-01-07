import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import * as API from '../apiCalls';
import { isOnLastPage, sortEntities } from '../util';
import Comment from '../Comment/index';
import EditComment from '../EditComment/index';
import AddComment from '../AddComment/index';
import './index.css';

class BlogPostCommentsList extends Component {
  static contextType = CookingContext;

  state = {
    page: 1,
    currentComments: [],
    displayButtons: false,
    editingCommentId: null
  };

  static defaultProps = {
    pageLimit: 10,
    initialComments: []
  };

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
        currentComments[commentIndex] = {
          ...patchedComment,
          postTitle: null
        };

        this.setState({
          currentComments: sortEntities(currentComments),
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
          currentComments: sortEntities(currentComments)
        });
      })
      .catch(console.log)
  };

  handleAddSubmit = (content) => {
    const { postTitle, pageLimit } = this.props;
    const { username } = this.context;
    const { currentComments } = this.state;

    const comment = {
      content,
      creator: username,
      postTitle
    };

    API.addComment(comment)
      .then((newComment) => {
        const modifiedComment = {
          ...newComment,
          postTitle: null
        };

        this.setState({
          currentComments: [modifiedComment, ...currentComments],
          displayButtons: currentComments.length > pageLimit
        });
      })
      .catch(console.log);
  };

  componentDidMount() {
    const { initialComments, pageLimit } = this.props;

    this.setState({
      currentComments: sortEntities(initialComments),
      displayButtons: initialComments.length > pageLimit
    });
  }

  componentWillUnmount() {
    API.abortTasks();
  }

  render() {
    const { username } = this.context;
    const { pageLimit } = this.props;
    const { page, currentComments, displayButtons, editingCommentId } = this.state;

    let commentsToRender = currentComments.slice((page-1) * pageLimit, page * pageLimit);

    return (
      <section className="BlogPostCommentsList">
        <h2>Comments</h2>

        {username && <AddComment handleSubmit={this.handleAddSubmit} />}

        <ul>
          {commentsToRender.map((comment) => {
            const { id, lastEdited, content, creator, deleted } = comment;

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
              disabled={isOnLastPage(currentComments, page, pageLimit)}
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

BlogPostCommentsList.propTypes = {
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
  postTitle: PropTypes.string.isRequired
};

export default BlogPostCommentsList;