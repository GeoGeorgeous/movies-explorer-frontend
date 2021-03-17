/*eslint-disable*/
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import mainApi from '../../utils/MainApi';

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  // const history = useHistory();

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUser('2')
        .then((userData) => {
          if (userData) {
            console.log(userData);
            setLoggedIn(true);
          } else {
            console.error('Неправильный JWT Token')
          }
          // setEmail(user.email);
          // setCurrentUser(user);
          // fetchCards(jwt);
        })
        .catch((err) => console.error('Инфы нет'));
    }
  };

  const handleLogin = (jwt) => {
    localStorage.setItem('jwt', jwt);
    tokenCheck();
  }

  useEffect(() => {
    tokenCheck();
    console.log(isLoggedIn);
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login handleLogin={handleLogin}/>
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
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
