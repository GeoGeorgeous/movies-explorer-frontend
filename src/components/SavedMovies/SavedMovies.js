/* eslint-disable */
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies() {
  const [showShortMovies, setShowShortMovies] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchKeyWords, setSearchKeyWords] = React.useState('');

  const onCheckBoxToggle = (isCheckBoxChecked) => {
    setShowShortMovies(isCheckBoxChecked);
  };

  const getMoviesFromLocalStorage = () => JSON.parse(localStorage.getItem('favouriteMovies'));

  const onFormSubmit = (userInput) => {
    setLoading(true); // Включили прелоудер
    if (getMoviesFromLocalStorage()) { // Есть ли фильмы в localStorage?
      setMovies(getMoviesFromLocalStorage());// Взяли фильмы из localStorage и установили в стейт
      setLoading(false); // Выключили лоудер
    } else {
      mainApi.getFavouriteMovies() // Отправили запрос
        .then((serverMovies) => { // Получили ответ
          localStorage.setItem('favouriteMovies', JSON.stringify(serverMovies)); // Сохранили в localStorage
          setMovies(serverMovies); // Взяли фильмы с сервера и установили в стейт
          setLoading(false); // Выключили лоудер
        });
    }
    setSearchKeyWords(userInput); // Ключевые слова для фильтрации
  };

  const getSavedMovies = () => {
    setLoading(true); // Включили прелоудер
    mainApi.getFavouriteMovies() // Отправили запрос
      .then((serverMovies) => {console.log(serverMovies)}) // Получили ответ
      .then(movies => console.log(movies))
    setLoading(false); // Выключили лоудер
  }

  const handleMovieLike = (movie) => {
    // mainApi.getFavouriteMovies()
    //   .then((favouriteMovies) => {
    //     console.log(favouriteMovies);
    //   });

    mainApi.likeMovie(movie)
      .then((feedback) => {
        console.log(feedback)
      })
  };

  useEffect(() => {
    getSavedMovies();
  }, []);

  return (
    <>
      <Header
        loggedIn
      />
      <SearchForm
        onCheckBoxToggle={onCheckBoxToggle}
        onFormSubmit={onFormSubmit}
      />
      <MoviesCardList
        showShortMovies={showShortMovies}
        movies={movies}
        searchKey={searchKeyWords}
        isLoading={loading}
        handleMovieLike={handleMovieLike}
        favouriteOnly
      />
    </>
  );
}

export default SavedMovies;
