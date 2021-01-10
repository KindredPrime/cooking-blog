import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BlogPostCommentsList from './index';
import { dummyComments } from '../dummyData';

describe('BlogPostCommentsList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BlogPostCommentsList
        handleAdd={() => {}}
        handleDelete={() => {}}
        handleEditSubmit={() => {}}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the UI as expected`, () => {
    render(
      <BrowserRouter>
        <BlogPostCommentsList
          comments={dummyComments}
          handleAdd={() => {}}
          handleDelete={() => {}}
          handleEditSubmit={() => {}}
        />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the next group of comments after clicking 'Next'`, () => {
    render(
      <BrowserRouter>
        <BlogPostCommentsList
          comments={dummyComments}
          handleAdd={() => {}}
          handleDelete={() => {}}
          handleEditSubmit={() => {}}
        />
      </BrowserRouter>
    );

    UserEvent.click(screen.getByText('Next'));
    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the previous group of comments after clicking 'Previous'`, () => {
    render(
      <BrowserRouter>
        <BlogPostCommentsList
          comments={dummyComments}
          handleAdd={() => {}}
          handleDelete={() => {}}
          handleEditSubmit={() => {}}
        />
      </BrowserRouter>
    );

    const previous = document.body;

    UserEvent.click(screen.getByText('Next'));
    UserEvent.click(screen.getByText('Previous'));

    expect(document.body).toEqual(previous);
  });
});