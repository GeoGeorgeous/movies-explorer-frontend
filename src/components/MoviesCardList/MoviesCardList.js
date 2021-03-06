/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../utils/moviesDB';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';


const moviesPerPage = 6; // Сколько фильмов отображать в начале
const moviesPerAdding = 3; // Сколько фильмов добавляет кнопка «Ещё»
let arrayForHoldingMovies = []; // Массив для хранения фильмов

function MoviesCardList(props) {
  const { onlyFavourite, onlyFullMovies } = props;
  MoviesCardList.propTypes = {
    onlyFavourite: PropTypes.bool.isRequired, // Показывать только любимые фильмы
    onlyFullMovies: PropTypes.bool.isRequired, // Показывать только полнометражные фильмы
  };

  const [moviesToShow, setMoviesToShow] = useState([]); // Стейт для фильмов, которые отображаются на странице
  const [next, setNext] = useState(6); // Стейт для следующих фильмов
  const [isAdding, setAdding] = useState(false); // Стейт для показа прелоудера

  // Обрезает массив фильмов и передаёт новый массив
  const loopWithSlice = (start, end) => {
    const slicedPosts = movies.slice(start, end);
    arrayForHoldingMovies = [...arrayForHoldingMovies, ...slicedPosts];
    setMoviesToShow(arrayForHoldingMovies);
  };

  // Хардкод для проверки прелоудера
  const handleShowMoreMoviesWithTimeout = () => {
    setAdding(true); // Показываем прелоудер
    setTimeout(handleShowMoreMovies, 2000)
  }

  // Обработчик нажатия кнопки добавления фильмов «Ещё»
  const handleShowMoreMovies = () => {
    loopWithSlice(next, next + moviesPerAdding); // Готовим новый массив фильмов
    setNext(next + moviesPerAdding); // Меняем начальную точку для следующего добавления
    setAdding(false); // Скрываем прелоудер
  };

  // function keepOnlyFavourited(moviesArr) {
  //   return moviesArr.filter((movie) => movie.isFavourite);
  // }
  // function keepOnlyFull(moviesArr) {
  //   return moviesArr.filter((movie) => movie.duration >= 40);
  // }
  // const filteredByFavMovies = onlyFavourite
  //   ? keepOnlyFavourited(moviesDB)
  //   : moviesDB;
  // const filteredByFullMovies = onlyFullMovies
  //   ? keepOnlyFull(filteredByFavMovies)
  //   : filteredByFavMovies;

  useEffect(() => {
    loopWithSlice(0, moviesPerPage);
  }, []);

  return (
    <>
      <section className="movies-card-list">
        {moviesToShow && moviesToShow.map((movie) => (
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
