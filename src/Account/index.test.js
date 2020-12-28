import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Account from './index';

describe('Account Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Account username="username" email="email" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <Account username="username" email="email" />
    );

    expect(document.body).toMatchSnapshot();
  });
});