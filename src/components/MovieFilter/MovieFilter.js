/* eslint-disable */
import React, {useEffect} from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MovieFilter(props) {
  const {
    movies, moviesPerPage, noShortMovies,
  } = props;

  const [visibleMovies, setVisibleMovies] = React.useState(moviesPerPage);

  const filterDuration = (movie) => {
    let durationCheck;

    noShortMovies
      ? durationCheck = 0
      : durationCheck = 90;

    const pass = (movie.duration >= durationCheck);
    return pass;
  };

  useEffect(() => { // Обновляем стейт при изменении пропа
    setVisibleMovies(moviesPerPage);
  }, [props]);

  return (
    <>
      {movies
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
        ))}
    </>
  );
}

export default MovieFilter;
