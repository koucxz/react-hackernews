import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NewList, { Search, Table } from './NewList';

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

describe('Search', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search>Search</Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
