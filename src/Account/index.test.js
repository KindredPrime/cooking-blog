import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Account from './index';

describe('Account Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Account username="username" email="email" />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <BrowserRouter>
        <Account username="username" email="email" />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });
});