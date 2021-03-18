/* eslint-disable */
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MainApi';

function SavedMovies(props) {
  const {movies, fetchOriginalMovies, toggleMovieLike} = props;
  const [showShortMovies, setShowShortMovies] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [searchKeyWords, setSearchKeyWords] = React.useState('');

  console.log(`Saved Movies Amount: ${movies.length}`)

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


  const handleMovieLike = (movie) => {
    toggleMovieLike(movie, localStorage.getItem('jwt'))
  };

  useEffect(() => {
    fetchOriginalMovies(); // Получили фильмы
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
