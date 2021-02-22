/* eslint-disable */
import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './App.css';

function App() {
  return (
    <>
    <Route exact path="/">
      <Main />
    </Route>
    <Route exact path="/signup">
      <Register />
    </Route>
    <Route exact path="/signin">
      <Login />
    </Route>
    </>
  );
}

export default App;
