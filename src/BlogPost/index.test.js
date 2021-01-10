import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import BlogPost from './index';
import CookingContext from '../CookingContext';
import { dummyPosts } from '../dummyData';

describe('BlogPost Component', () => {
  const id = 1;
  const { title, author, content, lastEdited } = dummyPosts[id-1];

  async function renderBlogPost(contextValue) {
    render(
      <BrowserRouter>
        <CookingContext.Provider value={contextValue}>
          <BlogPost
            title={title}
            author={author}
            content={content}
            lastEdited={lastEdited}
            handleEditSubmit={() => {}}
          />
        </CookingContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(title).toBeInTheDocument);
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <BlogPost
          title=""
          author={dummyPosts[0].author}
          content=""
          lastEdited={new Date()}
          handleEditSubmit={() => {}}
        />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the post as expected, where the user is NOT the post's author`, async () => {
    const contextValue = {
      user: {
        id: -1,
        username: 'not the author'
      }
    };

    await renderBlogPost(contextValue);
    expect(document.body).toMatchSnapshot();
  });

  it(`renders the post as expected, where the user IS the post's author`, async () => {
    const contextValue = {
      user: author
    };

    await renderBlogPost(contextValue);
    expect(document.body).toMatchSnapshot();
  });

  it(`renders the edit form when the 'Edit' button is clicked`, async () => {
    const contextValue = {
      user: author
    };

    await renderBlogPost(contextValue);

    UserEvent.click(screen.getByText('Edit'));
    expect(document.body).toMatchSnapshot();
  });

  it(`un-renders the edit form after clicking 'Cancel'`, async () => {
    const contextValue = {
      user: author
    };

    await renderBlogPost(contextValue);

    UserEvent.click(screen.getByText('Edit'));
    UserEvent.click(screen.getByText('Cancel'));
    expect(document.body).toMatchSnapshot();
  });
});