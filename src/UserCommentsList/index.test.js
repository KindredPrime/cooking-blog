import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import UserCommentsList from './index';
import { clientComments } from '../dummyData';

describe('UserCommentsList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <UserCommentsList />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the UI as expected`, () => {
    render(
      <BrowserRouter>
        <UserCommentsList initialComments={clientComments} />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the next group of comments after clicking 'Next'`, () => {
    render(
      <BrowserRouter>
        <UserCommentsList initialComments={clientComments} />
      </BrowserRouter>
    );

    UserEvent.click(screen.getByText('Next'));
    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the previous group of comments after clicking 'Previous'`, () => {
    render(
      <BrowserRouter>
        <UserCommentsList initialComments={clientComments} />
      </BrowserRouter>
    );

    const previous = document.body;

    UserEvent.click(screen.getByText('Next'));
    UserEvent.click(screen.getByText('Previous'));

    expect(document.body).toEqual(previous);
  });
});