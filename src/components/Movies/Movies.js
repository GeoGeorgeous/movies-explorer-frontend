/* eslint-disable */
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
  const [showShortMovies, setShowShortMovies] = React.useState(true);
  const [movies, setMovies] = React.useState([]);
  const [userSearchInput, setUserSearchInput] = React.useState('');

  function onCheckBoxToggle(isCheckBoxChecked) {
    setShowShortMovies(isCheckBoxChecked);
  }

  function onInputChange(input) {
    setUserSearchInput(input);
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
        onInputChange={onInputChange}
      />
      <MoviesCardList
        showShortMovies={showShortMovies}
        movies={movies}
        searchKey={userSearchInput}
      />
    </>
  );
}

export default Movies;
