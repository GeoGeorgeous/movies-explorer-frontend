/*eslint-disable*/
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies(props) {
  const {movies, loading, getMovies, toggleMovieLike, defMovieLike} = props
  const [showShortMovies, setShowShortMovies] = React.useState(true);
  const [searchKeyWords, setSearchKeyWords] = React.useState('');

  const onCheckBoxToggle = (isCheckBoxChecked) => {
    setShowShortMovies(isCheckBoxChecked);
  };

  const onFormSubmit = (userInput) => {
    getMovies();
    setSearchKeyWords(userInput);
  }


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
      />
    </>
  );
}

export default Movies;
