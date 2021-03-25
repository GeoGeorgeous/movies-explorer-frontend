/* eslint-disable no-param-reassign */
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

  const fetchFavouriteMovies = () => {
    /*
      Отправляет запрос на API /movies/, получает пролайканные фильмы
      и устаналивает стейт likedMovies с массив пролайканных фильмов.
    */
    mainApi.getFavouriteMovies(localStorage.getItem('jwt')) // Фетчим любимые фильмы
      .then((favouriteMovies) => { // Перебираем любимые фильмы
        setLikedMovies(favouriteMovies);
        // return movies // Находим пролайканные фильмы среди всех фильмов
        //     .filter((movie) => favouriteMovies
        //     .some((likedMovie) => likedMovie.movieId === movie.id))
      })
      .catch((err) => {
        console.log(err.message);
        setLikedMovies([]);
      });
  };

  const fetchOriginalMovies = () => {
    /*
      Отправляет запрос на API BeatFilm, получает 100 фильмов,
      устаналивает их в стейт movies.
    */
    const moviesFromLocalStorage = localStorage.getItem('movies');
    if (moviesFromLocalStorage) {
      setMovies(JSON.parse(moviesFromLocalStorage));
    } else {
      moviesApi.getFilms() // Отправляем запрос на получение фильмов
        .then((moviesFromAPI) => {
          localStorage.setItem('movies', JSON.stringify(moviesFromAPI));
          setMovies(moviesFromAPI);
        })
        .catch((err) => console.log(err));
    }
  };

  const getMovies = () => {
    /*
      Проверяем, есть ли фильмы в LocalStorage, если нет, получаем их
      Также, получаем уже пролайканные фильмы
    */
    setLoading(true); // Включаем прелоудер
    fetchOriginalMovies(); // Достаём фильмы из Local Storage или отправляем запрос к API
    fetchFavouriteMovies(); // Достаём любимые фильмы
    setLoading(false); // Выключает прелоудер
  };

  const likeMovie = (movie) => {
    if (!movie.country) {
      movie.country = 'none';
    }
    mainApi.likeMovie(movie, localStorage.getItem('jwt'))
      .then((resWithLikedMovie) => {
        setLikedMovies([...likedMovies, resWithLikedMovie]);
        console.log(`Фильм «${movie.nameRU}» успешно лайкнут!`);
        fetchFavouriteMovies();
      })
      .catch((err) => console.log(err));
  };

  const dislikeMovie = (movie) => {
    if (!movie._id) {
      movie._id = likedMovies
        .find((likedMovie) => likedMovie.id === movie.id)._id;
    }
    mainApi.deleteMovieLike(movie._id, localStorage.getItem('jwt'))
      .then((success) => {
        console.log(success);
        fetchFavouriteMovies();
      })
      .catch((err) => console.log(err));
  };

  const toggleMovieLike = (movie, isLiked) => {
    isLiked // Лайк стоит?
      ? dislikeMovie(movie) // Стоит, нужно убрать
      : likeMovie(movie);// Не стоит, нужно поставить
  };

  const defMovieLike = (movie) => likedMovies.some((likedMovie) => likedMovie.id === movie.id);

  function keepOnlyFavourite() {
    return movies
      .filter((movie) => likedMovies
        .some((likedMovie) => likedMovie.movieId === movie.id));
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
        setAPIErrorWithTimer('Данные пользователя успешно обновлены.');
      })
      .catch(() => {
        setAPIErrorWithTimer('Не получить обновить данные.');
      });
  };

  const logout = () => {
    /* Выход из аккаунта */
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
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
            movies={likedMovies}
            loading={loading}
            getMovies={getMovies}
            toggleMovieLike={toggleMovieLike}
            defMovieLike={defMovieLike}
            updateMovies={fetchFavouriteMovies}
            keepOnlyFavourite={keepOnlyFavourite}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            updateUserData={updateUserData}
            onLogout={logout}
            message={APIError}
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
