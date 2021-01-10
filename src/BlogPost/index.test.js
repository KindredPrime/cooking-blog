import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import BlogPost from './index';
import CookingContext from '../CookingContext';
import { dummyPosts } from '../dummyData';

describe('BlogPost Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BlogPost
        title=""
        author={dummyPosts[0].author}
        content=""
        lastEdited={new Date()}
        handleEditSubmit={() => {}}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the post as expected, where the user is NOT the post's author`, async () => {
    const id = 1;
    const { title, author, content, lastEdited } = dummyPosts[id-1];
    const contextValue = {
      user: {
        id: -1,
        username: 'not the author'
      }
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPost
          title={title}
          author={author}
          content={content}
          lastEdited={lastEdited}
          handleEditSubmit={() => {}}
        />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(title).toBeInTheDocument);
    expect(document.body).toMatchSnapshot();
  });

  it(`renders the post as expected, where the user IS the post's author`, async () => {
    const id = 1;
    const { title, author, content, lastEdited } = dummyPosts[id-1];
    const contextValue = {
      user: author
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPost
          title={title}
          author={author}
          content={content}
          lastEdited={lastEdited}
          handleEditSubmit={() => {}}
        />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(title).toBeInTheDocument);
    expect(document.body).toMatchSnapshot();
  });

  it(`renders the edit form when the 'Edit' button is clicked`, async () => {
    const id = 1;
    const { title, author, content, lastEdited } = dummyPosts[id-1];
    const contextValue = {
      user: author
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPost
          title={title}
          author={author}
          content={content}
          lastEdited={lastEdited}
          handleEditSubmit={() => {}}
        />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(title).toBeInTheDocument);

    UserEvent.click(screen.getByText('Edit'));
    expect(document.body).toMatchSnapshot();
  });

  it(`un-renders the edit form after clicking 'Cancel'`, async () => {
    const id = 1;
    const { title, author, content, lastEdited } = dummyPosts[id-1];
    const contextValue = {
      user: author
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <BlogPost
          title={title}
          author={author}
          content={content}
          lastEdited={lastEdited}
          handleEditSubmit={() => {}}
        />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(title).toBeInTheDocument);

    UserEvent.click(screen.getByText('Edit'));
    UserEvent.click(screen.getByText('Cancel'));
    expect(document.body).toMatchSnapshot();
  });
});