import React, { Component } from 'react';
import './App.css';
import NavBar from './navigation';
import {Provider} from 'react-redux';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FreeLancer</h1>
        </header>
        <NavBar />
      </div>
      </Provider>
    );
  }
}

export default App;
