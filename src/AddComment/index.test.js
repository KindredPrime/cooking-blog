import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import AddComment from './index';

describe('AddComment Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <AddComment handleSubmit={() => {}} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders an error as expected', async () => {
    const error = 'Test Error';
    render(<AddComment handleSubmit={() => new Promise((resolve, reject) => {
      throw new Error(error);
    })} />);

    UserEvent.type(screen.getByRole('textbox'), 'New Comment');
    UserEvent.click(screen.getByText('Add Comment'));

    await waitFor(() => expect(screen.getByText(error)).toBeInTheDocument());
    expect(document.body).toMatchSnapshot();
  });
});