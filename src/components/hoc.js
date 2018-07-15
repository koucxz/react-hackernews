import React from 'react';

const Loading = () =>{
  return <div><i className="fa fa-spinner" /> loading</div>
}

const withLoading = Component => ({isLoading, ...rest}) =>
isLoading
  ? <Loading />
  : <Component { ...rest } />

export { withLoading }