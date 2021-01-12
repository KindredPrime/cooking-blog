import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as API from '../apiCalls';
import { dummyPosts, dummyUsers, dummyComments } from '../dummyData';
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
    API.getAllBlogPosts = () => Promise.resolve(dummyPosts);

    API.getUserById = (id) => new Promise((resolve, reject) => {
      const user = dummyUsers.find((user) => user.id == id);

      if (!user) {
        reject(new Error(`There is no user with id ${id}`));
      }

      resolve(user);
    });

    API.getBlogPostsByAuthor = (username) => new Promise((resolve, reject) => {
      const userPosts = dummyPosts.filter((post) => post.author.username === username);

      resolve(userPosts)
    });

    API.getCommentsByCreator = (username) => {
      return Promise.resolve(dummyComments.filter((comment) => comment.creator.username === username));
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
    await waitFor(() => expect(screen.getByText(dummyUsers[0].username)).toBeInTheDocument());

    //screen.debug();
    expect(document.body).toMatchSnapshot();
  });
});