/* eslint-disable */
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound'
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import './App.css';

function App() {
  const [progress, setProgress] = React.useState(0);
  const [progressColor, setProgressColor] = React.useState('#979797');

  function handleProgress(success) {
    if (success === true) {
      setProgressColor('#3DDC84');
      setProgress(progress+100);

    } else {
      setProgressColor('#EE3465');
      setProgress(progress+100);
    }
  }

  useEffect(() => {

    window.addEventListener('load', () => {
      handleProgress(true);
    });

  }, []);

  return (
    <>
      <LoadingBar
      color={progressColor}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
