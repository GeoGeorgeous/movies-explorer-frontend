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
        loggedIn="True"
      />
      <SearchForm
        onCheckBoxToggle={onCheckBoxToggle}/>
      <MoviesCardList
        onlyFavourite="True"
        onlyFullMovies={showShortMovies}
      />
    </>
  );
}

export default SavedMovies;
