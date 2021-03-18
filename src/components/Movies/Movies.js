/*eslint-disable */
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies(props) {
  const {movies, loading, fetchOriginalMovies, toggleMovieLike} = props
  const [showShortMovies, setShowShortMovies] = React.useState(true);
  const [searchKeyWords, setSearchKeyWords] = React.useState('');

  const onCheckBoxToggle = (isCheckBoxChecked) => {
    setShowShortMovies(isCheckBoxChecked);
  };

  const onFormSubmit = (userInput) => {
    fetchOriginalMovies(); // Получили фильмы
    setSearchKeyWords(userInput); // Ключевые слова для фильтрации
  };

  const handleMovieLike = (movie) => {
    toggleMovieLike(movie, localStorage.getItem('jwt'))
  };

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
      />
    </>
  );
}

export default Movies;
