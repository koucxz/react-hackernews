import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';

import NewList from '../NewList';

class App extends Component {
  render() {
    let helloWorld = 'Welcome to the Road to learn React';
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{helloWorld}</h1>
        </header>
        <div className="Adivp-intro">
          <NewList />
        </div>
      </div>
    );
  }
}

export default App;
