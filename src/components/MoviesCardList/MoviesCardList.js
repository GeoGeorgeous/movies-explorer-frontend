import React from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesDB from '../../utils/moviesDB';
import Footer from '../Footer/Footer';

function MoviesCardList(props) {
  const { onlyFavourite, onlyFullMovies } = props;
  MoviesCardList.propTypes = {
    onlyFavourite: PropTypes.bool.isRequired, // Показывать только сохранённые фильмы? bool
    onlyFullMovies: PropTypes.bool.isRequired, // Показывать только полноценные фильмы? bool
  };
  function keepOnlyFavourited(moviesArr) {
    return moviesArr.filter((movie) => movie.isFavourite);
  }
  function keepOnlyFull(moviesArr) {
    return moviesArr.filter((movie) => movie.duration >= 40);
  }
  const filteredByFavMovies = onlyFavourite
    ? keepOnlyFavourited(moviesDB)
    : moviesDB;
  const filteredByFullMovies = onlyFullMovies
    ? keepOnlyFull(filteredByFavMovies)
    : filteredByFavMovies;

  return (
    <>
      <section className="movies-card-list">
        {filteredByFullMovies && filteredByFullMovies.map((movie) => (
          <MoviesCard
            key={movie._id}
            uniqueId={movie._id}
            duration={movie.duration}
            cover={movie.cover}
            title={movie.title}
            isFavourite={movie.isFavourite}
          />
        ))}
      </section>
      <button className="movies-card-list__load-more" type="button">Ещё</button>
      <Footer />
    </>
  );
}

export default MoviesCardList;
