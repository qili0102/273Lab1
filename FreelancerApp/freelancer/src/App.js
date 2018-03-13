import React, { Component } from 'react';
import './App.css';
import NavBar from './navigation';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './home';
import LogIn from './signin';
import Signup from './signup';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FreeLancer</h1>
        </header>
        <NavBar />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Signup} />    
        </div>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;