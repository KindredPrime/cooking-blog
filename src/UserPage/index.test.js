import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import API from '../apiCalls';
import UserPage from './index';
import { clientBlogPosts, clientComments, apiUsers } from '../dummyData';
import CookingContext from '../CookingContext';

describe('UserPage Component', () => {
  const origAPI = {
    getUserById: API.getUserById,
    getCommentsByCreator: API.getCommentsByCreator,
    getBlogPostsByAuthor: API.getBlogPostsByAuthor
  };

  // Mock API calls
  beforeAll(() => {
    API.getUserById = (id) => {
      return Promise.resolve(apiUsers.find((user) => user.id === parseInt(id)));
    };

    API.getCommentsByCreator = (id) => {
      return Promise.resolve(clientComments.filter((comment) => comment.creatorId === id));
    };

    API.getBlogPostsByAuthor = (id) => {
      return Promise.resolve(clientBlogPosts.filter((post) => post.authorId === id));
    };
  });

  afterAll(() => {
    API.getUserById = origAPI.getUserById;
    API.getCommentsByCreator = origAPI.getCommentsByCreator;
    API.getBlogPostsByAuthor = origAPI.getBlogPostsByAuthor;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <UserPage match={{ params: { id: '1' }}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', async () => {
    const id = 3;
    const testUser = apiUsers[id-1];
    const contextValue = {
      user: testUser
    };
    render(
      <BrowserRouter>
        <CookingContext.Provider value={contextValue}>
          <UserPage match={{ params: { id: id.toString() }}} />
        </CookingContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(testUser.username)).toBeInTheDocument());

    expect(document.body).toMatchSnapshot();
  });

  it('renders an error as expected', async () => {
    const error = 'Test Error';
    const tempOrigAPI = {
      getUserById: API.getUserById
    };
    API.getUserById = () => new Promise((resolve, reject) => {
      throw new Error(error);
    });

    render(
      <BrowserRouter>
        <UserPage match={{ params: { id: '1' } }} />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(error)).toBeInTheDocument());
    expect(document.body).toMatchSnapshot();

    // Reset the API
    API.getUserById = tempOrigAPI.getUserById;
  });
});