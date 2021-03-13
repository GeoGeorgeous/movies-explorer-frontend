/*eslint-disable */
import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import MovieFilter from '../MovieFilter/MovieFilter';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const moviesPerPage = 6; // Сколько фильмов отображать в начале
const moviesPerAdding = 3; // Сколько фильмов добавляет кнопка «Ещё»

function MoviesCardList(props) {
  const { movies, showShortMovies } = props;
  MoviesCardList.propTypes = {
    onlyFavourite: PropTypes.bool.isRequired, // Показывать только любимые фильмы?
    showShortMovies: PropTypes.bool.isRequired, // Показывать только полнометражные фильмы?
    // eslint-disable-next-line react/forbid-prop-types
    movies: PropTypes.any.isRequired,
  };
  let arrayForHoldingMovies = []; // Массив для хранения фильмов
  // Стейт для фильмов, которые отображаются на странице
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [next, setNext] = React.useState(6); // Стейт для следующих фильмов
  const [isAdding, setAdding] = React.useState(false); // Стейт для показа прелоудера
  const [noShortMovies, setNoShortMovies] = React.useState(true);
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(6);

  // Обработчик нажатия кнопки добавления фильмов «Ещё»
  const handleShowMoreMovies = () => {
    setVisibleMoviesCount(visibleMoviesCount+3);
  };

  useEffect(() => { // Обновляем стейт при изменении пропа
    setNoShortMovies(showShortMovies);
  }, [props]);

  return (
    <>
      <section className="movies-card-list">
        <MovieFilter
        // Фильтрует фильмы и возвращает разметку
          movies={movies} // Массив фильмов
          moviesPerPage={visibleMoviesCount} // Фильмов на странице
          moviesPerAdding={moviesPerAdding} // Фильмов при добавлении
          noShortMovies={noShortMovies}
         />

      </section>
      {isAdding
        ? <Preloader />
        : <button className="movies-card-list__load-more" type="button" onClick={handleShowMoreMovies}>Ещё</button>}
      <Footer />
    </>
  );
}

export default MoviesCardList;
