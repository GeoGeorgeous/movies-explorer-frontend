/* eslint-disable */
import React, {useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MovieFilter(props) {
  const {
    movies, moviesPerPage, noShortMovies, searchKey
  } = props;

  const [visibleMovies, setVisibleMovies] = React.useState(moviesPerPage);

  const filterDuration = (movie) => {
    /* Возвращает true, если
    movie.duration >= указанной  в durationCheck */
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
  }, [props.moviesPerPage]);

  return (
    <>
    { searchKey === ''
      ? <p>Ничего не найдено :(</p>
      : (movies
        .filter(filterSearch)
        .filter(filterDuration)
        .slice(0, visibleMovies)
        .map((movie) => (
          <MoviesCard
            key={movie.id}
            uniqueId={movie.id}
            duration={movie.duration}
            cover={movie}
            title={movie.nameRU}
            isFavourite={movie.isFavourite}
          />
        )))
    }
    </>
  );
}

export default MovieFilter;
