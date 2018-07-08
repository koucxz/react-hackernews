import React, { Component } from 'react';
import './NewList.css';
// style
const largeColumn = {  width: '40%' };
const midColumn = {  width: '30%' };
const smallColumn = {  width: '10%' };

// api
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_QUERY = 'redux';

// const isSearched = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());

class NewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  componentDidMount () {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => {
    const { hits, page } = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
    const moreHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      result: { hits: moreHits, page }
    });
  }
  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({ 
      result: { ...this.state.result, hits: updatedHits }
    });
  }
  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  }
  onSearchSubmit = e => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const { result, searchTerm } = this.state;
    const page = (result && result.page) || 0;
    if (!result) { return 'loading...'; }

    return (
      <div className="interactions">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        <Table 
          list={result.hits}
          // pattern={searchTerm}
          onDismiss={this.onDismiss} 
        />
        <div className="interactions">
          <button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)} type="button">
            More
          </button>
        </div>
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { 
      list,
      // pattern,
      onDismiss
    } = this.props;
    return (
      <div className="table">
        {/* {list.filter(isSearched(pattern)).map(item => */}
        {list.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default NewList;