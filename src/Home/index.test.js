import ReactDOM from 'react-dom';
import Home from './index';

describe('Home Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});