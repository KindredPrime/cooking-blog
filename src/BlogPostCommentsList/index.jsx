import { Component } from 'react';
import PropTypes from 'prop-types';
import CookingContext from '../CookingContext';
import { isOnLastPage } from '../util';
import Comment from '../Comment/index';
import EditComment from '../EditComment/index';
import AddComment from '../AddComment/index';
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

  renderEdit = (id) => {
    this.setState({
      editingCommentId: id
    });
  };

  handleEditSubmit = (id, content) => {
    this.props.handleEditSubmit(id, content)
      // Un-render the EditComment after the API updates the comment
      .then(() => this.setState({
        editingCommentId: null
      }))
      .catch(console.log);
  };

  handleEditCancel = () => {
    this.setState({
      editingCommentId: null
    });
  };

  render() {
    const { username } = this.context;
    const { comments, pageLimit, handleAdd, handleDelete } = this.props;
    const { page, editingCommentId } = this.state;

    const displayButtons = comments.length > pageLimit;
    const commentsToRender = comments.slice((page-1) * pageLimit, page * pageLimit);

    return (
      <section className="BlogPostCommentsList">
        <h2>Comments</h2>

        {username && <AddComment handleSubmit={handleAdd} />}

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
                handleDelete={handleDelete}
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
              disabled={isOnLastPage(comments, page, pageLimit)}
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
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lastEdited: PropTypes.instanceOf(Date),
      content: PropTypes.string.isRequired,
      creator: PropTypes.string,
      postTitle: PropTypes.string
    })
  ),
  pageLimit: PropTypes.number,
  postTitle: PropTypes.string.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditSubmit: PropTypes.func.isRequired
};

export default BlogPostCommentsList;