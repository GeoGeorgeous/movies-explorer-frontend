/*eslint-disable*/
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const {movies, loading, getMovies, toggleMovieLike, defMovieLike, updateMovies } = props
  const [showShortMovies, setShowShortMovies] = React.useState(true);
  const [searchKeyWords, setSearchKeyWords] = React.useState('');

  const onCheckBoxToggle = (isCheckBoxChecked) => {
    setShowShortMovies(isCheckBoxChecked);
  };

  const onFormSubmit = (userInput) => {
    getMovies();
    setSearchKeyWords(userInput); // Ключевые слова для фильтрации
  };

  useEffect( () => {
    getMovies();
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
        defMovieLike={defMovieLike}
        handleMovieLike={toggleMovieLike}
        favouriteOnly
      />
    </>
  );
}

export default SavedMovies;
