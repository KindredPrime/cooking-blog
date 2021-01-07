import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import UserCommentsList from './index';
import { dummyComments } from '../dummyData';

describe('UserCommentsList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <UserCommentsList />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`renders the UI as expected`, () => {
    render(<UserCommentsList initialComments={dummyComments} />);

    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the next group of comments after clicking 'Next'`, () => {
    render(<UserCommentsList initialComments={dummyComments} />);

    UserEvent.click(screen.getByText('Next'));
    expect(document.body).toMatchSnapshot();
  });

  it(`switches to the previous group of comments after clicking 'Previous'`, () => {
    render(<UserCommentsList initialComments={dummyComments} />);

    const previous = document.body;

    UserEvent.click(screen.getByText('Next'));
    UserEvent.click(screen.getByText('Previous'));

    expect(document.body).toEqual(previous);
  });
});