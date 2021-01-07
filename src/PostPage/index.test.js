import ReactDOM from 'react-dom';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as API from '../apiCalls';
import { dummyPosts } from '../dummyData';
import PostPage from './index';
import CookingContext from '../CookingContext';

describe('PostPage Component', () => {
  const origAPI = API;

  /**
   * Rewrite API methods to mock their results
   */
  beforeAll(() => {
    API.getBlogPostById = (id) => new Promise((resolve, reject) => {
      resolve(dummyPosts.find((post) => post.id === parseInt(id)));
    });
  });

  /**
   * Reset API methods to their original values
   */
  afterAll(() => {
    API.getAllBlogPosts = origAPI.getAllBlogPosts;
    API.getBlogPostsByUser = origAPI.getBlogPostsByUser;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <PostPage match={{ params: { id: '1' } }} />,
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
        <PostPage match={{ params: { id: id.toString() } }} />
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
        <PostPage match={{ params: { id: id.toString() } }} />
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
        <PostPage match={{ params: { id: id.toString() } }} />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(dummyPosts[id-1].title).toBeInTheDocument);

    userEvent.click(screen.getByText('Edit'));
    expect(document.body).toMatchSnapshot();
  });
});