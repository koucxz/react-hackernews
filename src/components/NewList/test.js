import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NewList from './index';

describe('NewList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewList />, div);
  });
  
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <NewList />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});