import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as API from '../apiCalls';
import UserPage from './index';
import { dummyPosts, dummyComments, dummyUsers } from '../dummyData';
import CookingContext from '../CookingContext';

describe('UserPage Component', () => {
  const origAPI = {
    getUserById: API.getUserById,
    getCommentsByUser: API.getCommentsByUser,
    getBlogPostsByUser: API.getBlogPostsByUser
  };

  // Mock API calls
  beforeAll(() => {
    API.getUserById = (id) => {
      return Promise.resolve(dummyUsers.find((user) => user.id === parseInt(id)));
    };

    API.getCommentsByUser = (username) => {
      return Promise.resolve(dummyComments.filter((comment) => comment.creator.username === username));
    };

    API.getBlogPostsByUser = (username) => {
      return Promise.resolve(dummyPosts.filter((post) => post.author.username === username));
    };
  });

  afterAll(() => {
    API.getUserById = origAPI.getUserById;
    API.getCommentsByUser = origAPI.getCommentsByUser;
    API.getBlogPostsByUser = origAPI.getBlogPostsByUser;
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
    const testUser = dummyUsers[id-1];
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