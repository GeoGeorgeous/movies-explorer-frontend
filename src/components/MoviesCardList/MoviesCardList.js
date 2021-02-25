/* eslint-disable */
import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import moviesDB from '../../utils/moviesDB';
import Footer from '../Footer/Footer';

function MoviesCardList(props) {
  const {includeShortMovies} = props;
  return (
    <>
    <section className="movies-card-list">
      {moviesDB && moviesDB.map( (movie) => (
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
    <button className="movies-card-list__load-more">Ещё</button>
    <Footer />
    </>
  );
}

export default MoviesCardList;
