import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Comment from './index';
import CookingContext from '../CookingContext';
import { dummyComments } from '../dummyData';

describe('Comment Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CookingContext.Provider value={{username: 'username'}}>
        <Comment
          creator="creator"
          content="content"
          lastEdited="today"
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </CookingContext.Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const contextValue = {
      username: dummyComments[0].creator
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <Comment
          creator={dummyComments[0].creator}
          content={dummyComments[0].content}
          lastEdited={dummyComments[0].lastEdited}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </CookingContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });
});