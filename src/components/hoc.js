import React, { Component } from 'react';

const _Loading = () =>{
  return <div>Loading ...</div>
}

const withLoading = Component => ({isLoading, ...rest}) =>
isLoading
  ? <_Loading />
  : <Component { ...rest } />

export { withLoading }