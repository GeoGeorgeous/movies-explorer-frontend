/* eslint-disable */
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
  const [showShortMovies, setShowShortMovies] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [searchKeyWords, setSearchKeyWords] = React.useState('');

  function onCheckBoxToggle(isCheckBoxChecked) {
    setShowShortMovies(isCheckBoxChecked);
  }

  function onFormSubmit(userInput) {
    console.log('moviesShown')
    // setSearchKeyWords(userInput);
  }

  useEffect(() => {
    moviesApi.getFilms()
      .then((serverMovies) => {
        setMovies(serverMovies);
      });
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
      />
    </>
  );
}

export default Movies;
