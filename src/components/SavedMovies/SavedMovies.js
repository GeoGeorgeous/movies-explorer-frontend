/* eslint-disable */
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorPopup from '../ErrorPopup/ErrorPopup'

function SavedMovies() {
  const [showShortMovies, setShowShortMovies] = React.useState(false);

  function onCheckBoxToggle(isCheckBoxChecked) {
    // setShowShortMovies(isCheckBoxChecked);
  }

  return (
    <>
      <ErrorPopup />
      <Header
        loggedIn
      />
      <SearchForm
        onCheckBoxToggle={onCheckBoxToggle}/>
      <MoviesCardList
        onlyFavourite
        onlyFullMovies={showShortMovies}
      />
    </>
  );
}

export default SavedMovies;
