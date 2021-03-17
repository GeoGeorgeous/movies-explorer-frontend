/*eslint-disable*/
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
    /*
      Функция проверяет наличие токена в localStorage
      и возвращает статус проверки токена (tokenIsValid = true/false),
      а также меняет стейт переменную в зависимости от проверки.
    */
    let tokenIsValid = false;
    const jwt = localStorage.getItem('jwt'); // Есть ли токен в localStorage?
    if (jwt) { // Если токен есть, проверяем его на API
      mainApi.getUser(jwt) // Отправляем токен на сервер
        .then((res) => { // Получаем ответ от сервера
          if (res) { // Если токен правильный:
            setLoggedIn(true);
            tokenIsValid = true;
          } else { // Если токен неправильный:
            console.error('Неправильный JWT Token')
            setLoggedIn(false);
            tokenIsValid = false
          }
          // setEmail(user.email);
          // setCurrentUser(user);
          // fetchCards(jwt);
        })
        .catch((err) => console.error(err));
    }
    return tokenIsValid;
  };

  const handleLogin = (jwt) => {
    /*
      Функция авторизации принимает строку с JWT токеном,
      проверяет токен и возвращает true/false в зависимости валидности токена.
    */
    localStorage.setItem('jwt', jwt);
    return tokenCheck();
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main
          isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login handleLogin={handleLogin}/>
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          isLoggedIn={isLoggedIn}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          isLoggedIn={isLoggedIn}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          isLoggedIn={isLoggedIn}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
