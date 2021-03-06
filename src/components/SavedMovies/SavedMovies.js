/* eslint-disable */
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  const [showShortMovies, setShowShortMovies] = React.useState(true);

  function onCheckBoxToggle(isCheckBoxChecked) {
    setShowShortMovies(isCheckBoxChecked);
  }

  return (
    <>
      <Header
        loggedIn
      />
      <SearchForm
        onCheckBoxToggle={onCheckBoxToggle}/>
      <MoviesCardList
        onlyFavourite
        showShortMovies={showShortMovies}
      />
    </>
  );
}

export default SavedMovies;
