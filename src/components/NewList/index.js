import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import './index.css';

import Table from '../Table';
import Search from '../Search';

// api
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '20';

const Loading = () =>{
  return <div>Loading ...</div>
}

  class NewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      isLoading: false,
      error: null
    };
  }

  componentDidMount () {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const moreHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: moreHits, page }
      },
      isLoading: false
    });
  }
  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }
  onSearchChange = e => {
    this.setState({ searchTerm: e.target.value });
  }
  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }
  onSearchSubmit = e => {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading
    } = this.state;

    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    
    return (
      <div className="interactions">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        { error ? <div className="interactions">
            <p>Something went wrong.</p>
          </div> : 
          <Table 
          list={list}
          // pattern={searchTerm}
          onDismiss={this.onDismiss} 
        />}
        <div className="interactions">
          { isLoading
            ? <Loading />
            : <button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)} type="button">
              More
            </button>
          }
        </div>
      </div>
    );
  }
}

export default NewList;