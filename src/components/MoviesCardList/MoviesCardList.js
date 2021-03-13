import React, { useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MovieFilter from '../MovieFilter/MovieFilter';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const { movies, showShortMovies, searchKey, isLoading } = props;
  MoviesCardList.propTypes = {
    showShortMovies: PropTypes.bool.isRequired, // Показывать только полнометражные фильмы?
    movies: PropTypes.any.isRequired,
    searchKey: PropTypes.string.isRequired,
  };
  // const [isAdding, setAdding] = React.useState(false); // Стейт для показа прелоудера
  const [noShortMovies, setNoShortMovies] = React.useState(true);
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(6);
  const [shownEnough, setShownEnough] = React.useState(false);

  // Обработчик нажатия кнопки добавления фильмов «Ещё»
  const handleShowMoreMovies = () => {
    setVisibleMoviesCount(visibleMoviesCount + 3);
  };

  const handleFoundMoviesAmount = (foundMoviesCounter) => {
    foundMoviesCounter >= visibleMoviesCount
    ? setShownEnough(false)
    : setShownEnough(true)
  }

  useEffect(() => { // Обновляем стейт при изменении пропа
    setNoShortMovies(showShortMovies);
  }, [props.showShortMovies]);

  useEffect(() => { // Обновляем стейт при изменении пропа
    setVisibleMoviesCount(6);
  }, [props.searchKey]);


  return (
    <>
      {searchKey === ''
      // Если ещё ничего не искали, то показать welcome-screen
        ? (
          <section className="movies-card-list__welcome-screen">
            <p className="movies-card-list__welcome-screen-text">
              Введите название или ключевые слова в строку поиска, чтобы найти фильмы.
            </p>
          </section>
        )
        : isLoading
          // Если ищем фильмы, то покажем прелоудер, пока они загружаются
            ? <Preloader />
            : <>
                <section className="movies-card-list">
                <MovieFilter
                  // Фильтрует фильмы и возвращает разметку
                  movies={movies} // Массив фильмов
                  moviesPerPage={visibleMoviesCount} // Фильмов на странице
                  noShortMovies={noShortMovies} // Скрывать короткометражки?
                  searchKey={searchKey}
                  handleFoundMoviesAmount={handleFoundMoviesAmount}
                />
                </section>
                {shownEnough
                  ? ''
                  : <button className="movies-card-list__load-more" type="button" onClick={handleShowMoreMovies}>Ещё</button>}
              </>
          }
      <Footer />
    </>
  );
}

export default MoviesCardList;
