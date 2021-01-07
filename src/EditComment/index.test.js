import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import EditComment from './index';

describe('EditComment Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <EditComment initialContent="" handleSubmit={() => {}} handleCancel={() => {}} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <EditComment initialContent="Initial Content" handleSubmit={() => {}} handleCancel={() => {}} />
    );

    expect(document.body).toMatchSnapshot();
  });
});