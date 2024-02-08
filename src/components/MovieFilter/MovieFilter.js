/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';

function MovieFilter(props) {
  const {
    movies, moviesPerPage, showShortMovies, searchKey, handleFoundMoviesAmount,
    handleMovieLike, defMovieLike, onlyFavourite,
  } = props;

  MovieFilter.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({ // Массив объектов с фильмами * Object
      country: PropTypes.string,
      created_at: PropTypes.string,
      description: PropTypes.string,
      director: PropTypes.string,
      duration: PropTypes.number,
      id: PropTypes.number,
      image: PropTypes.object,
      nameEN: PropTypes.string,
      nameRU: PropTypes.string,
      trailerLink: PropTypes.string,
      updated_at: PropTypes.string,
      year: PropTypes.string,
    })).isRequired,
    moviesPerPage: PropTypes.number.isRequired, // Фильмов на странице * Number
    showShortMovies: PropTypes.bool.isRequired, // Показывать короткометражки? * Bool
    searchKey: PropTypes.string.isRequired, // Ключевые слова для поиска фильмов * String
    // Обработчик нажатия кнопки добавления фильмов «Ещё» * Func:
    handleFoundMoviesAmount: PropTypes.func.isRequired,
    handleMovieLike: PropTypes.func.isRequired,
    defMovieLike: PropTypes.func.isRequired,
    onlyFavourite: PropTypes.bool,
  };

  MovieFilter.defaultProps = {
    onlyFavourite: false,
  };

  // Стейт количества отображаемых фильмов
  const [visibleMovies, setVisibleMovies] = React.useState(moviesPerPage);

  const filterDuration = (movie) => {
    /*
      Возвращает true, если
      movie.duration больше или равно указанному

      movie — объект фильма
    */
    let durationCheck;
    showShortMovies
      ? durationCheck = 0
      : durationCheck = 40;
    const pass = (movie.duration >= durationCheck);
    return pass;
  };

  const filterSearch = (movie) => {
    /*
      Возвращает true, если
      searchKey есть в описании к фильму или в названиях

      movie — объект фильма
    */
    const regex = new RegExp(searchKey, 'gi');
    const pass = regex.test(movie.description)
    || regex.test(movie.nameRU)
    || regex.test(movie.nameEN);
    return pass;
  };

  function createFilteredMoviesMarkUp() {
    // Фильтрует массив и возвращает разметку

    const filteredMovies = movies
      .filter(filterSearch) // Фильтр по ключевому слову
      .filter(filterDuration); // Фильтр по длительности
    handleFoundMoviesAmount(filteredMovies.length); // Обработчик количество найденных фильмов

    return filteredMovies
      .slice(0, visibleMovies) // Обрезаем массив до нужного количества
      .map((movie) => ( // Создаём карточки с фильмом
        <MoviesCard
          defMovieLike={defMovieLike}
          key={movie.id}
          uniqueId={movie.id}
          duration={movie.duration}
          cover={movie}
          title={movie.nameRU}
          trailerLink={movie.trailerLink}
          handleMovieLike={handleMovieLike}
          wholeMovie={movie}
        />
      ));
  }

  function createFavouriteMoviesMarkUp() {
    // Фильтрует массив и возвращает разметку

    const filteredMovies = movies
      .filter(filterSearch) // Фильтр по ключевому слову
      .filter(filterDuration); // Фильтр по длительности
    handleFoundMoviesAmount(filteredMovies.length); // Обработчик количество найденных фильмов

    return filteredMovies
      .map((movie) => ( // Создаём карточки с фильмом
        <MoviesCard
          defMovieLike={defMovieLike}
          key={movie.id}
          uniqueId={movie.id}
          duration={movie.duration}
          cover={movie}
          title={movie.nameRU}
          trailerLink={movie.trailerLink}
          handleMovieLike={handleMovieLike}
          wholeMovie={movie}
        />
      ));
  }

  useEffect(() => { // Изменение количества отображаемых фильмов при изменении стейта
    setVisibleMovies(moviesPerPage);
  }, [moviesPerPage]);

  return (
    <>
      { onlyFavourite
        ? createFavouriteMoviesMarkUp()
        : createFilteredMoviesMarkUp() }
    </>
  );
}

export default MovieFilter;
