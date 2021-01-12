import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import TransitionButtons from './index';

describe('TransitionButtons Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <TransitionButtons
        isAtTheBeginning={true}
        isAtTheEnd={true}
        handlePrevClick={() => {}}
        handleNextClick={() => {}}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected, at the beginning', () => {
    render(
      <TransitionButtons
        isAtTheBeginning={true}
        isAtTheEnd={false}
        handlePrevClick={() => {}}
        handleNextClick={() => {}}
      />
    );

    expect(document.body).toMatchSnapshot();
  });

  it('renders the UI as expected, in the middle', () => {
    render(
      <TransitionButtons
        isAtTheBeginning={false}
        isAtTheEnd={false}
        handlePrevClick={() => {}}
        handleNextClick={() => {}}
      />
    );

    expect(document.body).toMatchSnapshot();
  });

  it('renders the UI as expected, at the end', () => {
    render(
      <TransitionButtons
        isAtTheBeginning={false}
        isAtTheEnd={true}
        handlePrevClick={() => {}}
        handleNextClick={() => {}}
      />
    );

    expect(document.body).toMatchSnapshot();
  });
});