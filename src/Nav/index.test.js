import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as API from '../apiCalls';
import { dummyPosts, dummyUsers, dummyComments } from '../dummyData';
import Nav from './index';
import App from '../App';

describe('Nav Component', () => {
  const origAPI = API;

  /**
   * Rewrite API methods to mock their results
   */
  beforeAll(() => {
    API.getAllBlogPosts = () => Promise.resolve(dummyPosts);

    API.getUserById = (id) => new Promise((resolve, reject) => {
      const user = dummyUsers.find((user) => user.id == id);

      if (!user) {
        reject(`There is no user with id ${id}`);
      }

      resolve(user);
    });

    API.getBlogPostsByUser = (id) => new Promise((resolve, reject) => {
      API.getUserById(id)
        .then((user) => {
          resolve(dummyPosts.filter((post) => post.author.username === user.username));
        })
        .catch(reject);
    });

    API.getCommentsByUser = (username) => {
      return Promise.resolve(dummyComments.filter((comment) => comment.creator.username === username));
    };
  });

  /**
   * Reset API methods to their original values
   */
  afterAll(() => {
    API.getAllBlogPosts = origAPI.getAllBlogPosts;
    API.getUserById = origAPI.getUserById;
    API.getBlogPostsByUser = origAPI.getBlogPostsByUser;
    API.getCommentsByUser = origAPI.getCommentsByUser;
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
    await waitFor(() => expect('Welcome to the Cooking Blog!').toBeInTheDocument);

    expect(document.body).toMatchSnapshot();
  });

  it('loads the account page when clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    userEvent.click(screen.getByText('Account'));
    await waitFor(() => expect(dummyUsers[0].username).toBeInTheDocument);

    expect(document.body).toMatchSnapshot();
  });
});