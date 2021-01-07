import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PostsList from './index';
import { render, screen } from '@testing-library/react';
import { dummyPosts } from '../dummyData';
import UserEvent from '@testing-library/user-event';

describe('PostsList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <PostsList />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <BrowserRouter>
        <PostsList initialBlogPosts={dummyPosts} pageLimit={3} />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the next group of blog posts after clicking 'Next'`, () => {
    render(
      <BrowserRouter>
        <PostsList initialBlogPosts={dummyPosts} />
      </BrowserRouter>
    );

    UserEvent.click(screen.getByText('Next'));
    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the previous group of comments after clicking 'Previous'`, () => {
    render(
      <BrowserRouter>
        <PostsList initialBlogPosts={dummyPosts} />
      </BrowserRouter>
    );

    const previous = document.body;

    UserEvent.click(screen.getByText('Next'));
    UserEvent.click(screen.getByText('Previous'));

    expect(document.body).toEqual(previous);
  });
});