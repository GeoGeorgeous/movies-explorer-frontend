/* eslint-disable*/
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route exact path={props.path}>
    {
        () => ((props.isLoggedIn) ? <Component {...props} /> : <Redirect to="./signin" />)
      }
  </Route>
);

export default ProtectedRoute;
