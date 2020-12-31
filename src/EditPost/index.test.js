import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
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
});