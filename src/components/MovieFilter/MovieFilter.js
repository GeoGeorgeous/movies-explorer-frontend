/* eslint-disable */
import React, {useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MovieFilter(props) {
  const {
    movies, moviesPerPage, noShortMovies, searchKey, handleFoundMoviesAmount
  } = props;

  const [visibleMovies, setVisibleMovies] = React.useState(moviesPerPage);
  const [filteredAndSlicedMovies, setFilteredAndSlicedMovies] = React.useState([]);

  const prepareMovies = (dataArr) => {
    let newDataArr = [...dataArr];
    setFilteredAndSlicedMovies(
      newDataArr
        .filter(filterSearch)
        .filter(filterDuration)
        .slice(0, visibleMovies));
    // handleFoundMoviesAmount(filteredAndSlicedMovies)
  }

  const filterDuration = (movie) => {
    /* Возвращает true, если
    movie.duration больше или равно указанному */
    let durationCheck;
    noShortMovies
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

  useEffect(() => {
    /* Обновляем стейт при изменении moviesPerPage */
    setVisibleMovies(moviesPerPage);
  }, [props]);

  useEffect(() => {
    prepareMovies(movies)
  }, [searchKey]);

  return (
    <>
    { (filteredAndSlicedMovies.length > 0)
      ? filteredAndSlicedMovies
      .map((movie) => (
        <MoviesCard
          key={movie.id}
          uniqueId={movie.id}
          duration={movie.duration}
          cover={movie}
          title={movie.nameRU}
          isFavourite={movie.isFavourite}
        />
      ))
      : <p>Ничего не найдено.</p>
    }
    </>
  );
}

export default MovieFilter;
