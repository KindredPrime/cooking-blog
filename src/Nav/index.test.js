import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import API from '../apiCalls';
import { clientBlogPosts, apiUsers, clientComments } from '../dummyData';
import Nav from './index';
import App from '../App';

describe('Nav Component', () => {
  const origAPI = {
    getAllBlogPosts: API.getAllBlogPosts,
    getUserById: API.getUserById,
    getBlogPostsByAuthor: API.getBlogPostsByAuthor,
    getCommentsByCreator: API.getCommentsByCreator
  };

  /**
   * Rewrite API methods to mock their results
   */
  beforeAll(() => {
    API.getAllBlogPosts = () => Promise.resolve(clientBlogPosts);

    API.getUserById = (id) => new Promise((resolve, reject) => {
      const user = apiUsers.find((user) => user.id == id);

      if (!user) {
        reject(new Error(`There is no user with id ${id}`));
      }

      resolve(user);
    });

    API.getBlogPostsByAuthor = (id) => new Promise((resolve, reject) => {
      const userPosts = clientBlogPosts.filter((post) => post.authorId === id);

      resolve(userPosts)
    });

    API.getCommentsByCreator = (id) => {
      return Promise.resolve(clientComments.filter((comment) => comment.creatorId === id));
    };
  });

  /**
   * Reset API methods to their original values
   */
  afterAll(() => {
    API.getAllBlogPosts = origAPI.getAllBlogPosts;
    API.getUserById = origAPI.getUserById;
    API.getBlogPostsByAuthor = origAPI.getBlogPostsByAuthor;
    API.getCommentsByCreator = origAPI.getCommentsByCreator;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('loads the homepage when clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/account']}>
        <App />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('Home'));
    await waitFor(() => expect(screen.getByText('Welcome to the Cooking Blog!')).toBeInTheDocument());

    expect(document.body).toMatchSnapshot();
  });

  it('loads the account page when clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('Account'));
    await waitFor(() => expect(screen.getByText(apiUsers[0].username)).toBeInTheDocument());

    //screen.debug();
    expect(document.body).toMatchSnapshot();
  });
});