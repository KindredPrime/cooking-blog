import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Comment from './index';
import CookingContext from '../CookingContext';
import { dummyComments } from '../dummyData';

describe('Comment Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Comment
          id={1}
          creator={dummyComments[0].creator}
          content="content"
          lastEdited={new Date()}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const id = 1;
    const contextValue = {
      user: dummyComments[id-1].creator
    };

    render(
      <BrowserRouter>
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
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });
});