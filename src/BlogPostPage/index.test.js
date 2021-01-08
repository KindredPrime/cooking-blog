import ReactDOM from 'react-dom';
import { render, waitFor, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import * as API from '../apiCalls';
import { dummyPosts, dummyComments, dummyUsers } from '../dummyData';
import BlogPostPage from './index';
import CookingContext from '../CookingContext';

describe('BlogPostPage Component', () => {
  const origAPI = API;

  /**
   * Rewrite API methods to mock their results
   */
  beforeAll(() => {
    API.getBlogPostById = (id) => new Promise((resolve, reject) => {
      resolve(dummyPosts.find((post) => post.id === parseInt(id)));
    });

    API.patchBlogPost = () => Promise.resolve();

    API.addComment = (comment) => Promise.resolve({
      ...comment,
      id: dummyComments.length + 1,
      lastEdited: new Date(Date.now())
    })

    API.deleteComment = () => Promise.resolve();

    API.getCommentById = (id) => new Promise((resolve, reject) => {
      const comment = dummyComments.find((comment) => comment.id === id);

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
            lastEdited: new Date(Date.now())
          });
        })
        .catch(reject);
    });

    API.getBlogPostById = (id) => new Promise((resolve, reject) => {
      const blogPost = dummyPosts.find((post) => post.id === parseInt(id));

      if (!blogPost) {
        reject(`There is no blog post with id ${id}`);
      }

      resolve(blogPost);
    });

    API.getCommentsByBlogPost = (title) => (
      Promise.resolve(dummyComments.filter((comment) => comment.postTitle === title))
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
    API.getBlogPostById = origAPI.getBlogPostById;
    API.getCommentsByBlogPost = origAPI.getCommentsByBlogPost;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BlogPostPage match={{ params: { id: '1' } }} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the post as expected, where the user is NOT the post's author`, async () => {
    const contextValue = {
      username: 'not-the-author'
    };
    const id = 1;

    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPostPage match={{ params: { id: id.toString() } }} />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(dummyPosts[id-1].title).toBeInTheDocument);
    expect(document.body).toMatchSnapshot();
  });

  it(`renders the post as expected, where the user IS the post's author`, async () => {
    const id = 1;
    const contextValue = {
      username: dummyPosts[id-1].author
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPostPage match={{ params: { id: id.toString() } }} />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(dummyPosts[id-1].title).toBeInTheDocument);
    expect(document.body).toMatchSnapshot();
  });

  it(`renders the edit form when the 'Edit' button is clicked`, async () => {
    const id = 1;
    const contextValue = {
      username: dummyPosts[id-1].author
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPostPage match={{ params: { id: id.toString() } }} />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(dummyPosts[id-1].title).toBeInTheDocument);

    UserEvent.click(screen.getByText('Edit'));
    expect(document.body).toMatchSnapshot();
  });

  it(`marks a comment as deleted after clicking 'Delete'`, async () => {
    const contextValue = {
      username: dummyUsers[4].username
    };
    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPostPage match={{ params: { id: '1' } }} />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(screen.getByText('Comments')).toBeInTheDocument());

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
  });
});