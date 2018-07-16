import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Sort extends Component {
  render() {
    const {
      sortKey,
      onSort,
      activeSortKey,
      isSortReverse,
      children
    } = this.props;

    const sortClass = classNames(
      'button-inline',
      { 'button-active': sortKey === activeSortKey }
    );
  
    return (
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={sortClass}
      >
        {children}&thinsp;
        <SortIcon
          sortKey={sortKey}
          activeSortKey={activeSortKey}
          isSortReverse={isSortReverse} />
      </button>
    );
  }
}

class SortIcon extends Component {
  render() {
    const {
      sortKey,
      activeSortKey,
      isSortReverse
    } = this.props;

    if (sortKey !== activeSortKey) {
      return <i>&emsp;</i>
    }
    if (isSortReverse) {
      return <i className="fa fa-long-arrow-up" />
    }
    return <i className="fa fa-long-arrow-down" />
  }
}

Sort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  activeSortKey: PropTypes.string,
  children: PropTypes.node,
};

export default Sort