/* eslint-disable */
import { func } from 'prop-types';
import React, {useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MovieFilter(props) {
  const {
    movies, moviesPerPage, showShortMovies, searchKey, handleFoundMoviesAmount
  } = props;

  const [visibleMovies, setVisibleMovies] = React.useState(moviesPerPage);
  const [filteredMoviesAmount, setFilteredMoviesAmount] = React.useState(0);

  const filterDuration = (movie) => {
    /* Возвращает true, если
    movie.duration больше или равно указанному */
    let durationCheck;
    showShortMovies
      ? durationCheck = 0
      : durationCheck = 40;
    const pass = (movie.duration >= durationCheck);
    return pass;
  };

  const filterSearch = (movie) => {
    let regex = new RegExp(searchKey, "gi");
    const pass =
    regex.test(movie.description)
    || regex.test(movie.nameRU)
    || regex.test(movie.nameEN);
    return pass;
  };

  function createArr() {
    let filteredMovies = movies
    .filter(filterSearch)
    .filter(filterDuration)
    handleFoundMoviesAmount(filteredMovies.length)
    return filteredMovies
      .slice(0, visibleMovies)
      .map((movie) => (
      <MoviesCard
        key={movie.id}
        uniqueId={movie.id}
        duration={movie.duration}
        cover={movie}
        title={movie.nameRU}
        isFavourite={movie.isFavourite}
      />))
  }

  useEffect(() => { // Изменение количества отображаемых фильмов при изменении стейта
    setVisibleMovies(moviesPerPage)
  }, [moviesPerPage]);

  return (
    <>
    { createArr() }
    </>
  );
}

export default MovieFilter;
