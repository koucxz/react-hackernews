import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

// style
const largeColumn = {  width: '40%' };
const midColumn = {  width: '30%' };
const smallColumn = {  width: '10%' };

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

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};
Table.defaultProps = {
  list: []
};

export default Table;
