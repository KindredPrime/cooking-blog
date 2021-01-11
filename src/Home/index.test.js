import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './index';
import * as API from '../apiCalls';

describe('Home Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders an error as expected', async () => {
    const error = 'Test Error';
    const tempOrigAPI = {
      getAllBlogPosts: API.getAllBlogPosts
    };
    API.getAllBlogPosts = () => new Promise((resolve, reject) => {
      throw new Error(error);
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(error)).toBeInTheDocument());
    expect(document.body).toMatchSnapshot();

    // Reset the API
    API.getAllBlogPosts = tempOrigAPI.getAllBlogPosts;
  });
});