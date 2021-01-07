import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import BlogPostCommentsList from './index';
import { dummyComments, dummyUsers } from '../dummyData';
import CookingContext from '../CookingContext';

describe('BlogPostCommentsList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BlogPostCommentsList postTitle="" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the UI as expected`, () => {
    render(<BlogPostCommentsList initialComments={dummyComments} postTitle="" />);

    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the next group of comments after clicking 'Next'`, () => {
    render(<BlogPostCommentsList initialComments={dummyComments} postTitle="" />);

    UserEvent.click(screen.getByText('Next'));
    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the previous group of comments after clicking 'Previous'`, () => {
    render(<BlogPostCommentsList initialComments={dummyComments} postTitle="" />);

    const previous = document.body;

    UserEvent.click(screen.getByText('Next'));
    UserEvent.click(screen.getByText('Previous'));

    expect(document.body).toEqual(previous);
  });

  it(`marks a comment as deleted after clicking 'Delete'`, async () => {
    const contextValue = {
      username: dummyUsers[4].username
    };
    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPostCommentsList initialComments={dummyComments} />
      </CookingContext.Provider>
    );

    const deleteButton = screen.getAllByText('Delete')[0];
    const commentToDelete = deleteButton.parentNode.parentNode;
    const commentContent = commentToDelete.firstChild.nextSibling.nextSibling.textContent;

    UserEvent.click(deleteButton);

    // Comment content was replaced
    await waitFor(() => expect(screen.getByText('[Deleted]')).toBeInTheDocument());

    // Comment content was removed from the page
    expect(screen.queryByText(commentContent)).toEqual(null);

    // Comment was moved to the top of the comments list, since it was the most recently edited
    const deletedComment = screen.getByText('[Deleted]').parentNode;
    expect(deletedComment.previousSibling).toBeNull();
  });
});