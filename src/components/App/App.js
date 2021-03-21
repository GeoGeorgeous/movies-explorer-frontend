/*eslint-disable */
import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    id: '',
  });
  const [APIError, setAPIError] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const getFavouriteMovies = () => {
    mainApi.getFavouriteMovies(localStorage.getItem('jwt')) // Фетчим любимые фильмы
      .then((favouriteMovies) => { // Перебираем любимые фильмы
        setLikedMovies(favouriteMovies);
      })
      .catch((err) => { console.log(err); });
  };

  const filterMoviesByFavourites = () => {
    const a =  movies.filter((movie) => {
      return likedMovies.some((item) => item.movieId === movie.id);
    })
    console.log(a);
    return a;
  };

  const getMovies = () => {
    setLoading(true); // Включаем прелоудер
    moviesApi.getFilms() // Отправляем запрос на получение фильмов
      .then((films) => {
        setMovies(films);
      });
    getFavouriteMovies();
    setLoading(false); // Выключает прелоудер
  };

  const likeMovie = (movie) => {
    mainApi.likeMovie(movie, localStorage.getItem('jwt'))
      .then((resWithLikedMovie) => {
        setLikedMovies([...likedMovies, resWithLikedMovie]);
        console.log(`Фильм «${movie.nameRU}» успешно лайкнут!`);
      })
      .then(true)
      .catch((err) => console.log(err));
  };

  const dislikeMovie = (movie) => {
    const movieId = likedMovies.find((likedMovie) => likedMovie.movieId === movie.id)._id;
    mainApi.deleteMovieLike(movieId, localStorage.getItem('jwt'))
      .then((success) => {
        console.log(success);
      })
      .catch((err) => console.log(err));
  };

  const toggleMovieLike = (movie, isLiked) => {
    isLiked // Лайк стоит?
      ? dislikeMovie(movie) // Стоит, нужно убрать
      : likeMovie(movie);// Не стоит, нужно поставить
  };

  const defMovieLike = (movie) => likedMovies.some((likedMovie) => likedMovie.movieId === movie.id);

  function keepOnlyFavourite() {
    console.log(movies.filter((movie) => likedMovies.some((likedMovie) => likedMovie.movieId === movie.id)));
  }

  /*
  «»»—–––——––––––—–––——––––––—–––——––––––—–––——––––––—–––——–––––––—––««»
    АВТОРИЗАЦИЯ, РЕГИСТРАЦИЯ, ТОКЕН И ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЬСКИХ ДАННЫХ:
  «»»—–––——––––––—–––——––––––—–––——––––––—–––——––––––—–––——–––––––—––««»
  */

  const setAPIErrorWithTimer = (error) => {
    setAPIError(error);
    setTimeout(() => setAPIError(''), 5000);
  };

  /* Проверка токена в LocalStorage */
  function tokenCheck() { return localStorage.getItem('jwt'); }

  const checkTokenAndGetUserData = () => {
    /* Получение данных пользователя */
    const jwt = tokenCheck();
    if (jwt) {
      mainApi.getUser(jwt) // Отправляем токен на сервер
        .then((res) => { // Получаем ответ от сервера
          if (res) { // Если токен правильный:
            setLoggedIn(true);
            setUser({
              ...user,
              name: res.name,
              email: res.email,
              _id: res._id,
            });
          } else { // Если токен неправильный:
            setLoggedIn(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const login = (email, password) => {
    /* Авторизация */
    mainApi.signInUser(
      { email, password },
    )
      .then((response) => { // API вернул статус 2xx при авторизации
        localStorage.setItem('jwt', response.token); // Записали токен в LocalStorage
        checkTokenAndGetUserData(); // Получили пользовательские данные
        setAPIError(''); // Убрали ошибку формы
        setLoggedIn(true);
        history.push('/movies'); // Переадресация на movies
      })
      .catch((error) => { // API вернулся с ошибкой
        console.log(error.message);
        setLoggedIn(false);
        setAPIErrorWithTimer(error.message); // Показываем ошибку
      });
  };

  const signup = (name, email, password) => {
    /* Регистрация */
    mainApi.signUpUser(
      { name, email, password },
    )
      .then(() => { // API вернул статус 2xx при регистрации
        setAPIError(''); // Убрали ошибку формы
        login(email, password);
      })
      .catch((error) => { // API вернулся с ошибкой
        setAPIErrorWithTimer(error.message); // Показываем ошибку
      });
  };

  const updateUserData = (newData) => {
    /* Обновление данных пользователя */
    const jwt = localStorage.getItem('jwt');
    mainApi.updateUser(newData, jwt)
      .then(() => {
        checkTokenAndGetUserData();
      });
  };

  const logout = () => {
    /* Выход из аккаунта */
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
    setUser({
      name: '',
      email: '',
      id: '',
    });
  };

  useEffect(() => {
    checkTokenAndGetUserData();
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <Switch>
          <Route exact path="/">
            <Main
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path="/signup">
            <Register
              signup={signup}
              APIError={APIError}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path="/signin">
            <Login
              login={login}
              APIError={APIError}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            movies={movies}
            loading={loading}
            getMovies={getMovies}
            toggleMovieLike={toggleMovieLike}
            defMovieLike={defMovieLike}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            loading={loading}
            toggleMovieLike={toggleMovieLike}
            defMovieLike={defMovieLike}
            filterMoviesByFavourites={filterMoviesByFavourites}
            movies={movies}
            keepOnlyFavourite={keepOnlyFavourite}
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
