import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Sort from './index';

describe('Sort', () => {

  const props = {
    sortKey: '',
    onSort () {}
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sort { ...props } >Sort</Sort>, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Sort { ...props } >Sort</Sort>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});