import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import movies from '../../utils/moviesDB';

const moviesPerPage = 6; // Сколько фильмов отображать в начале
const moviesPerAdding = 3; // Сколько фильмов добавляет кнопка «Ещё»
// let arrayForHoldingMovies = []; // Массив для хранения фильмов

function MoviesCardList(props) {
  const { onlyFavourite, showShortMovies } = props;
  MoviesCardList.propTypes = {
    onlyFavourite: PropTypes.bool.isRequired, // Показывать только любимые фильмы?
    showShortMovies: PropTypes.bool.isRequired, // Показывать только полнометражные фильмы?
  };
  let arrayForHoldingMovies = []; // Массив для хранения фильмов
  // Стейт для фильмов, которые отображаются на странице
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [next, setNext] = useState(6); // Стейт для следующих фильмов
  const [isAdding, setAdding] = useState(false); // Стейт для показа прелоудера
  const [isShowShortMoviesOn, setShowShortMoviesOn] = useState(true);
  const [isShowFavouriteMoviesOnlyOn, setShowFavouriteMoviesOnlyOn] = useState(false);

  const filterMovies = (movie) => {
    let durationCheck;
    let favouriteCheck;

    isShowShortMoviesOn
      ? durationCheck = 0
      : durationCheck = 40;

    isShowFavouriteMoviesOnlyOn
      ? favouriteCheck = 0
      : favouriteCheck = -1;

    const pass = (movie.duration >= durationCheck && movie.isFavourite > favouriteCheck);
    return pass;
  };

  // Обрезает массив фильмов и передаёт новый массив
  const loopWithSlice = (start, end) => {
    const slicedMovies = movies.slice(start, end);
    arrayForHoldingMovies = [...moviesToShow, ...slicedMovies];
    setMoviesToShow(arrayForHoldingMovies);
  };

  // Обработчик нажатия кнопки добавления фильмов «Ещё»
  const handleShowMoreMovies = () => {
    loopWithSlice(next, next + moviesPerAdding); // Готовим новый массив фильмов
    setNext(next + moviesPerAdding); // Меняем начальную точку для следующего добавления
    setAdding(false); // Скрываем прелоудер
  };

  // Хардкод для проверки прелоудера
  const handleShowMoreMoviesWithTimeout = () => {
    setAdding(true); // Показываем прелоудер
    setTimeout(handleShowMoreMovies, 2000);
  };

  useEffect(() => {
    loopWithSlice(0, moviesPerPage);
  }, []);

  useEffect(() => { // Обновляем стейт при изменении пропа
    setShowShortMoviesOn(showShortMovies);
    setShowFavouriteMoviesOnlyOn(onlyFavourite);
  }, [props]);

  return (
    <>
      <section className="movies-card-list">
        {moviesToShow && moviesToShow
          .filter(filterMovies)
          .map((movie) => (
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
      {isAdding
        ? <Preloader />
        : <button className="movies-card-list__load-more" type="button" onClick={handleShowMoreMoviesWithTimeout}>Ещё</button>}
      <Footer />
    </>
  );
}

export default MoviesCardList;
