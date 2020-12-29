import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PostsList from './index';

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
});