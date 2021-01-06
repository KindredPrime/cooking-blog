import ReactDOM from 'react-dom';
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
});