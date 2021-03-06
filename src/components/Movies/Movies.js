/* eslint-disable */
import React, {useEffect} from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  const [showShortMovies, setShowShortMovies] = React.useState(false);

  function onCheckBoxToggle(isCheckBoxChecked) {
    setShowShortMovies(isCheckBoxChecked);
  }


  return (
    <>
      <Header
        loggedIn
      />
      <SearchForm
        onCheckBoxToggle={onCheckBoxToggle}
      />
      {/* <MoviesCardList
        onlyFavourite={false}
        onlyFullMovies={showShortMovies}
      /> */}
    </>
  );
}

export default Movies;
