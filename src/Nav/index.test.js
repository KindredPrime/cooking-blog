import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AbortController from 'abort-controller';
import * as API from '../apiCalls';
import { dummyPosts, dummyUsers } from '../dummyData';
import Nav from './index';
import App from '../App';

describe('Nav Component', () => {
  const origAPI = API;
  let controller = new AbortController();
  let signal = controller.signal;

  /**
   * Rewrite API methods to mock their results
   */
  beforeAll(() => {
    API.abortTasks = () => {
      controller.abort();
      controller = new AbortController();
      signal = controller.signal;
    };
    API.getAllBlogPosts = () => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => {
        reject('API call has been aborted');
      });

      resolve(dummyPosts);
    });
    API.getBlogPostsByUser = (id) => new Promise((resolve, reject) => {
      signal.addEventListener('abort', () => {
        reject('API call has been aborted');
      });

      const user = dummyUsers.find((user) => user.id === id);

      if (!user) {
        throw new Error(`There is no user with id ${id}`);
      }

      const userPosts = dummyPosts.filter((post) => post.author === user.username);
      resolve(userPosts);
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
    await waitFor(() => expect('User1').toBeInTheDocument);

    expect(document.body).toMatchSnapshot();
  });
});