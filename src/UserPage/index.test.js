import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as API from '../apiCalls';
import UserPage from './index';
import { dummyPosts, dummyComments, dummyUsers } from '../dummyData';
import CookingContext from '../CookingContext';

describe('UserPage Component', () => {
  const origAPI = API;

  // Mock API calls
  beforeAll(() => {
    API.getUserById = (id) => {
      return Promise.resolve(dummyUsers.find((user) => user.id === parseInt(id)));
    };

    API.getCommentsByUser = (username) => {
      return Promise.resolve(dummyComments.filter((comment) => comment.creator === username));
    };

    API.getBlogPostsByUser = (username) => {
      return Promise.resolve(dummyPosts.filter((post) => post.author === username));
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
        <UserPage match={{ params: { id: '' }}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', async () => {
    const id = '3';
    const contextValue = {
      username: dummyUsers[id-1].username
    };
    render(
      <BrowserRouter>
        <CookingContext.Provider value={contextValue}>
          <UserPage match={{ params: { id }}} />
        </CookingContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(dummyUsers[id-1].username)).toBeInTheDocument());

    expect(document.body).toMatchSnapshot();
  });
});