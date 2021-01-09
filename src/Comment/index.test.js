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
          id={1}
          creator="creator"
          content="content"
          lastEdited={new Date()}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </CookingContext.Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const id = 1;
    const contextValue = {
      username: dummyComments[id-1].creator
    };

    render(
      <CookingContext.Provider value={contextValue}>
        <Comment
          id={id}
          creator={dummyComments[id-1].creator}
          content={dummyComments[id-1].content}
          lastEdited={dummyComments[id-1].lastEdited}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </CookingContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });
});