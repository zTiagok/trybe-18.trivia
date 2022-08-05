import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';

import Login from './pages/Login';
import Config from './pages/Config';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/config" exact component={ Config } />
      </Switch>
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
      </header> */}
    </div>
  );
}
