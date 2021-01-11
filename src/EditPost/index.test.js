import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import EditPost from './index';

describe('EditPost Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <EditPost content="" handleSubmit={() => {}} handleCancel={() => {}} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <EditPost
        content="Content of the post to be edited"
        handleSubmit={() => {}}
        handleCancel={() => {}}
      />);

    expect(document.body).toMatchSnapshot();
  });

  it('renders an error as expected', async () => {
    const error = 'Test error';
    render(
      <EditPost
        content="Content of the post to be edited"
        handleSubmit={() => new Promise((resolve, reject) => {
          throw new Error(error);
        })}
        handleCancel={() => {}}
      />
    );

    UserEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(screen.getByText(error)).toBeInTheDocument());
    expect(document.body).toMatchSnapshot();
  });
});