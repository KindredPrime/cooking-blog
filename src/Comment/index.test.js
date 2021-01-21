import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserEvent from '@testing-library/user-event';
import Comment from './index';
import CookingContext from '../CookingContext';
import { clientComments } from '../dummyData';

describe('Comment Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Comment
          id={1}
          creatorId={clientComments[0].creatorId}
          creatorUsername={clientComments[0].creatorUsername}
          postId={clientComments[0].postId}
          postTitle={clientComments[0].postTitle}
          content="content"
          lastEdited={'today'}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const id = 1;
    const contextValue = {
      user: {
        id: clientComments[id-1].creatorId,
        username: clientComments[id-1].creatorUsername
      }
    };

    render(
      <BrowserRouter>
        <CookingContext.Provider value={contextValue}>
          <Comment
            id={id}
            creatorId={clientComments[id-1].creatorId}
            creatorUsername={clientComments[id-1].creatorUsername}
            postId={clientComments[id-1].postId}
            postTitle={clientComments[id-1].postTitle}
            content={clientComments[id-1].content}
            lastEdited={clientComments[id-1].lastEdited}
            handleEdit={() => {}}
            handleDelete={() => {}}
          />
        </CookingContext.Provider>
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });

  it('renders an error as expected', async () => {
    const error = 'Test Error';
    const id = 1;
    const comment = clientComments[id-1];
    const contextValue = {
      user: {
        id: comment.creatorId,
        username: comment.creatorUsername
      }
    };

    render(
      <BrowserRouter>
        <CookingContext.Provider value={contextValue}>
          <Comment
            id={id}
            creatorId={comment.creatorId}
            creatorUsername={comment.creatorUsername}
            postId={comment.postId}
            postTitle={comment.postTitle}
            content={comment.content}
            lastEdited={comment.lastEdited}
            handleEdit={() => {}}
            handleDelete={() => new Promise((resolve, reject) => {
              throw new Error(error);
            })}
          />
        </CookingContext.Provider>
      </BrowserRouter>
    );

    UserEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(screen.getByText(error)).toBeInTheDocument());
    expect(document.body).toMatchSnapshot();
  });
});