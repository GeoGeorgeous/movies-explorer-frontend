/*eslint-disable*/
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { UserContext, user } from '../../contexts/userContext';
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
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    id: '',
  })
  const [APIError, setAPIError] = React.useState('');

  const history = useHistory();

  const login = (email, password) => {
    /* Авторизация */
    mainApi.signInUser(
      { email, password },
    )
      .then((response) => { // API вернул статус 2xx при авторизации
        localStorage.setItem('jwt', response.token); // Записали токен в LocalStorage
        setAPIError('') // Убрали ошибку формы
        setLoggedIn(true);
        history.push('/movies'); // Переадресация на movies
      })
      .catch((error) => { // API вернулся с ошибкой
        console.log(error.message)
        setLoggedIn(false);
        setAPIError(error.message); // Показываем ошибку
      });
  }

  const signup = (name, email, password) => {
    /* Регистрация */
    mainApi.signUpUser(
      { name, email, password },
    )
      .then(() => { // API вернул статус 2xx при регистрации
        setAPIError('') // Убрали ошибку формы
        history.push('/signin'); // Переадресация на логин
        login(email, password )
      })
      .catch((error) => { // API вернулся с ошибкой
        setAPIError(error.message); // Показываем ошибку
      });
  }

  const updateUserData = (newData) => {
    console.log(newData)
    const jwt = localStorage.getItem('jwt');
    mainApi.updateUser(newData, jwt)
    .then((res) => {
      console.log(res)
    })
  }

  const logout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
    setUser({
      name: '',
      email: '',
      id: '',
    })
  }

  const getUserData = (jwt) => {
    mainApi.getUser(jwt) // Отправляем токен на сервер
    .then((res) => { // Получаем ответ от сервера
      if (res) { // Если токен правильный:
        setLoggedIn(true);
        setUser({
          name: res.name,
          email: res.email,
        })
      } else { // Если токен неправильный:
        setLoggedIn(false);
      }
    })
    .catch((err) => console.error(err));
  }

  const tokenCheck = () => {

    const jwt = localStorage.getItem('jwt'); // Есть ли токен в localStorage?
    if (jwt) { // Если токен есть, проверяем его на API
      getUserData(jwt)
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <>
    <UserContext.Provider value={user}>
      <Switch>
        <Route exact path="/">
          <Main
          isLoggedIn={isLoggedIn} />
        </Route>
          <Route exact path="/signup">
            <Register
              signup={signup}
              APIError={APIError} />
         </Route>
          <Route exact path="/signin">
            <Login
              login={login}
            />
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
          updateUserData={updateUserData}
          onLogout={logout}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </UserContext.Provider>
    </>
  );
}

export default App;
