/* eslint-disable */
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
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  /*
  «»»—–––————««»
    ФИЛЬМЫ:
  «»»—–––————««»
  */

  // Получаем фильмы из localStorage:
  const getMoviesFromLocalStorage = () => JSON.parse(localStorage.getItem('movies'));

  // Записываем фильмы в localStorage:
  const recordMoviesToLocalStorage = (data) => localStorage.setItem('movies', JSON.stringify(data));

  const fetchLikedMovies = (jwt) => {
    mainApi.getFavouriteMovies(jwt) // Фетчим любимые фильмы
    .then(likedMoviesArr => { // Перебираем любимые фильмы
      likedMoviesArr.forEach(movie => { // И проставляем лайки
        const originalMovie = movies.find(trueMovie => trueMovie.id === movie.movieId)
        originalMovie.isLiked = true;
      })
      recordMoviesToLocalStorage(movies) // обновляем localStorage
    })
  }

  const fetchOriginalMovies = () => {
  // Загружаем оригинальные фильмы с сервера
    setLoading(true); // Включили прелоудер
    const moviesFromLocalStorage = getMoviesFromLocalStorage();
    if (moviesFromLocalStorage) { // Есть ли фильмы в localStorage?
      setMovies(moviesFromLocalStorage);// Взяли фильмы из localStorage и установили в стейт
      setLoading(false); // Выключили лоудер
    } else { // В localStorage пусто
      moviesApi.getFilms() // Отправили запрос
        .then((serverMovies) => { // Получили ответ
          const moviesEnhanced = serverMovies.map((movie) => ({
            // Добавили для всех фильмов поле isLiked равное false
            ...movie,
            isLiked: false,
          }));
          fetchLikedMovies(JSON.parse(localStorage.getItem('jwt'))) // Получили пролайканные фильмы
          recordMoviesToLocalStorage(JSON.stringify(moviesEnhanced)); // Сохранили в localStorage
          setMovies(moviesEnhanced); // Взяли фильмы с сервера и установили в стейт
          setLoading(false); // Выключили лоудер
        });
    }
  };

  const likeMovie = (movie, jwt) => {
    mainApi.likeMovie(movie, jwt)
      .then((cardFromAPI) => {
        const originalMovie = movies.find(movie => movie.id === cardFromAPI.movieId)
        originalMovie.isLiked = true;
        originalMovie.apiID = cardFromAPI._id
        fetchLikedMovies(jwt);
      })
      .catch((err) => console.log(err));
  };

  const dislikeMovie = (movie, jwt) => {
    mainApi.deleteMovieLike(movie.apiID, jwt)
      .then((success) => {
        console.log(success.message);
        const originalMovie = movies.find(movie => movie.id === movie.id)
        // originalMovie.isLiked = false;
      })
      .catch((err) => console.log(err));
  };

  const toggleMovieLike = (movie, jwt) => {
    movie.isLiked // Лайк стоит?
      ? dislikeMovie(movie, jwt) // Стоит, нужно убрать
      : likeMovie(movie, jwt)// Не стоит, нужно поставить
  };

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
            fetchOriginalMovies={fetchOriginalMovies}
            toggleMovieLike={toggleMovieLike}
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
