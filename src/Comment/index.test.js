import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserEvent from '@testing-library/user-event';
import Comment from './index';
import CookingContext from '../CookingContext';
import { dummyComments } from '../dummyData';

describe('Comment Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Comment
          id={1}
          creator={dummyComments[0].creator}
          blogPost={dummyComments[0].blogPost}
          content="content"
          lastEdited={new Date()}
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
      user: dummyComments[id-1].creator
    };

    render(
      <BrowserRouter>
        <CookingContext.Provider value={contextValue}>
          <Comment
            id={id}
            creator={dummyComments[id-1].creator}
            blogPost={dummyComments[id-1].blogPost}
            content={dummyComments[id-1].content}
            lastEdited={dummyComments[id-1].lastEdited}
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
    const comment = dummyComments[id-1];
    const contextValue = {
      user: comment.creator
    };

    render(
      <BrowserRouter>
        <CookingContext.Provider value={contextValue}>
          <Comment
            id={id}
            creator={comment.creator}
            blogPost={comment.blogPost}
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