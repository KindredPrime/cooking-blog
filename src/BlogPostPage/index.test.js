import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import API from '../apiCalls';
import { formatDate } from '../util';
import { clientBlogPosts, clientComments, apiUsers } from '../dummyData';
import BlogPostPage from './index';
import CookingContext from '../CookingContext';

describe('BlogPostPage Component', () => {
  const origAPI = {
    getBlogPostById: API.getBlogPostById,
    patchBlogPost: API.patchBlogPost,
    addComment: API.addComment,
    deleteComment: API.deleteComment,
    getCommentById: API.getCommentById,
    patchComment: API.patchComment,
    getCommentsByBlogPost: API.getCommentsByBlogPost
  };

  /**
   * Rewrite API methods to mock their results
   */
  beforeAll(() => {
    API.getBlogPostById = (id) => new Promise((resolve, reject) => {
      const blogPost = clientBlogPosts.find((post) => post.id === parseInt(id));

      if (!blogPost) {
        reject(`There is no blog post with id ${id}`);
      }

      resolve(blogPost);
    });

    API.patchBlogPost = (id, content) => new Promise((resolve, reject) => {
      API.getBlogPostById(id)
        .then((blogPost) => {
          if (blogPost.content === content) {
            resolve(blogPost);
          }

          const newBlogPost = {
            ...blogPost,
            content,
            lastEdited: formatDate(new Date().toString())
          };
          resolve(newBlogPost);
        })
        .catch(reject);
    });

    API.addComment = (comment) => Promise.resolve({
      ...comment,
      id: clientComments.length + 1,
      lastEdited: formatDate(new Date().toString())
    })

    API.deleteComment = () => Promise.resolve();

    API.getCommentById = (id) => new Promise((resolve, reject) => {
      const comment = clientComments.find((comment) => comment.id === id);

      if (!comment) {
        reject(`Comment with id ${id} does not exist`);
      }

      resolve(comment);
    });

    API.patchComment = (id, content) => new Promise((resolve, reject) => {
      API.getCommentById(id)
        .then((comment) => {
          if (comment.content === content) {
            resolve(comment);
          }

          resolve({
            ...comment,
            content,
            lastEdited: formatDate(new Date().toString())
          });
        })
        .catch(reject);
    });

    API.getCommentsByBlogPost = (id) => (
      Promise.resolve(clientComments.filter((comment) => comment.postId === parseInt(id)))
    );
  });

  /**
   * Reset API methods to their original values
   */
  afterAll(() => {
    API.getBlogPostById = origAPI.getBlogPostById;
    API.patchBlogPost = origAPI.patchBlogPost;
    API.addComment = origAPI.addComment;
    API.deleteComment = origAPI.deleteComment;
    API.getCommentById = origAPI.getCommentById;
    API.patchComment = origAPI.patchComment;
    API.getCommentsByBlogPost = origAPI.getCommentsByBlogPost;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <BlogPostPage match={{ params: { id: '1' } }} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <BrowserRouter>
        <BlogPostPage match={{ params: { id: '1' } }} />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });

  it('renders an error as expected', async () => {
    const error = 'Test Error';
    const tempOrigAPI = {
      getBlogPostById: API.getBlogPostById
    };
    API.getBlogPostById = () => new Promise((resolve, reject) => {
      throw new Error(error);
    });

    render(
      <BrowserRouter>
        <BlogPostPage match={{ params: { id: '1' } }} />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(error)).toBeInTheDocument());
    expect(document.body).toMatchSnapshot();

    // Reset the API
    API.getBlogPostById = tempOrigAPI.getBlogPostById;
  });

  describe('BlogPost Child Component', () => {
    it(
      `changes the post's content and updates the post's timestamp after clicking 'Edit' then 'Submit'`,
      async () => {
        const id = 1;
        const { title, authorId, authorUsername, lastEdited } = clientBlogPosts[id-1];
        const contextValue = {
          user: {
            id: authorId,
            username: authorUsername
          }
        };
        render(
          <BrowserRouter>
            <CookingContext.Provider value={contextValue}>
              <BlogPostPage match={{ params: { id: id.toString() } }} />
            </CookingContext.Provider>
          </BrowserRouter>
        );
        await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());

        UserEvent.click(screen.getAllByText('Edit')[0]);

        // Submit the new content
        const newBlogPostContent = 'New blog post content';
        const editPostTextbox = screen.getAllByRole('textbox')[0];
        UserEvent.clear(editPostTextbox);
        UserEvent.type(editPostTextbox, newBlogPostContent);
        UserEvent.click(screen.getByText('Submit'));

        await waitFor(() => expect(screen.getByText(newBlogPostContent)).toBeInTheDocument());

        // The timestamp has been updated
        const newTimestamp = new Date(document
          .getElementsByClassName('timestamp')[0]
          .textContent
          .split('Last edited: ')
          .join('')
        );
        expect(newTimestamp.valueOf()).toBeGreaterThan(Date.parse(lastEdited));
      }
    );
  });

  describe('CommentsList Child Component', () => {
    const testUser = apiUsers[4];

    async function renderBlogPostPage() {
      const contextValue = {
        user: testUser
      };
      render(
        <BrowserRouter>
          <CookingContext.Provider value={contextValue}>
            <BlogPostPage match={{ params: { id: '1' } }} />
          </CookingContext.Provider>
        </BrowserRouter>
      );

      await waitFor(() => expect(screen.getByText('Comments')).toBeInTheDocument());
    }

    it(
      `adds a new comment to the top of the comments list after clicking 'Add Comment'`,
      async () => {
        await renderBlogPostPage();

        const newComment = 'New Comment';
        UserEvent.type(screen.getByRole('textbox'), newComment);
        UserEvent.click(screen.getByText('Add Comment'));
        await waitFor(() => expect(screen.getByText(newComment)).toBeInTheDocument());

        const addedComment = screen.getByRole('list').firstChild;
        // The comment's user matches the context's username
        expect(addedComment.firstChild.textContent).toEqual(testUser.username);
        // The comment's content matches the new comment
        expect(addedComment.firstChild.nextSibling.textContent).toEqual(newComment);
      }
    );

    it(
      `changes a comment's text and moves it to the top of the comments list after clicking 'Edit' then 'Submit'`,
      async () => {
        await renderBlogPostPage();

        const editButton = screen.getAllByText('Edit')[0];
        UserEvent.click(editButton);

        const newComment = 'Edited Comment';
        // Type in the second text box (the first is for adding comments)
        const editTextbox = screen.getAllByRole('textbox')[1];
        UserEvent.clear(editTextbox);
        UserEvent.type(editTextbox, newComment);
        UserEvent.click(screen.getByText('Submit'));

        await waitFor(() => expect(screen.getByText(newComment)).toBeInTheDocument());

        const editedComment = screen.getByRole('list').firstChild;
        // The comment's user matches the context's username
        expect(editedComment.firstChild.textContent).toEqual(testUser.username);
        // The comment's content matches the new comment
        expect(editedComment.firstChild.nextSibling.textContent).toEqual(newComment);
      }
    );

    it(
      `marks a comment as deleted and moves it to the top of the comments list after clicking 'Delete'`,
      async () => {
        await renderBlogPostPage();

        const deleteButton = screen.getAllByText('Delete')[0];
        const commentToDelete = deleteButton.parentNode.parentNode;
        const commentContent = commentToDelete.firstChild.nextSibling.nextSibling.textContent;

        UserEvent.click(deleteButton);

        // Comment content was replaced
        await waitFor(() => expect(screen.getByText('[Deleted]')).toBeInTheDocument());

        // Original comment content was removed from the page
        expect(screen.queryByText(commentContent)).toEqual(null);

        // Comment was moved to the top of the comments list, since it was the most recently edited
        const deletedComment = screen.getByText('[Deleted]').parentNode;
        expect(deletedComment.previousSibling).toBeNull();
      }
    );
  });
});