import ReactDOM from 'react-dom';
import { render, waitFor } from '@testing-library/react';
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
    API.getPostById = (id) => new Promise((resolve, reject) => {
      resolve(dummyPosts.find((post) => post.id === parseInt(id)));
    });
  });

  /**
   * Reset API methods to their original values
   */
  afterAll(() => {
    API.getAllPosts = origAPI.getAllPosts;
    API.getPostsByUser = origAPI.getPostsByUser;
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
        <PostPage match={{ params: { id } }} />
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
        <PostPage match={{ params: { id } }} />
      </CookingContext.Provider>
    );

    await waitFor(() => expect(dummyPosts[id-1].title).toBeInTheDocument);
    expect(document.body).toMatchSnapshot();
  });
});