import React, { useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MovieFilter from '../MovieFilter/MovieFilter';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const {
    movies, showShortMovies, searchKey, isLoading, handleMovieLike, favouriteOnly,
  } = props;

  MoviesCardList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({ // Массив объектов с фильмами * Object
      country: PropTypes.string,
      created_at: PropTypes.string,
      description: PropTypes.string,
      director: PropTypes.string,
      duration: PropTypes.number,
      id: PropTypes.number,
      // eslint-disable-next-line react/forbid-prop-types
      image: PropTypes.object,
      nameEN: PropTypes.string,
      nameRU: PropTypes.string,
      trailerLink: PropTypes.string,
      updated_at: PropTypes.string,
      year: PropTypes.string,
    })).isRequired,
    showShortMovies: PropTypes.bool.isRequired, // Показывать короткий метр? * Bool
    searchKey: PropTypes.string.isRequired, // Ключевые слова для поиска фильмов * String
    isLoading: PropTypes.bool.isRequired, // Промис pending? * Bool
    handleMovieLike: PropTypes.func.isRequired,
    favouriteOnly: PropTypes.bool,
  };

  MoviesCardList.defaultProps = {
    favouriteOnly: false,
  };

  // Количество фильмов, показываемых изначально (до нажатия на кнопку загрузить ещё)
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(6);
  let foundMovies = 0; // Количество найденных фильмов
  /*
    Warning: Cannot update a component (`MoviesCardList`)
    while rendering a different component (`MovieFilter`).
    To locate the bad setState() call inside `MovieFilter`,
    follow the stack trace as described in https://reactjs.org/link/setstate-in-render
  */
  const [moviesFound, setMoviesFoundAmount] = React.useState(0); // Стейт найденных

  // Обработчик нажатия кнопки добавления фильмов «Ещё»
  const handleShowMoreMovies = () => {
    setVisibleMoviesCount(visibleMoviesCount + 3);
  };

  const handleButtonAppear = () => {
    if (moviesFound > visibleMoviesCount) { // Логика показывания / скрывания кнопки «Ещё»
      return <button className="movies-card-list__load-more" type="button" onClick={handleShowMoreMovies}>Ещё</button>;
    }
    if (moviesFound === 0) {
      return (
        <p className="movies-card-list__message">
          {favouriteOnly ? 'Вы ещё не сохранили ни одного фильма.' : 'Ничего не найдено.'}
        </p>
      );
    }
    return (
      <p className="movies-card-list__message">
        {searchKey ? `Показаны все [${moviesFound}] найденные фильмы по запросу «${searchKey}»` : `Сохранённых фильмов: [${moviesFound}]`}
      </p>
    );
  };

  // Задаём стейт shownEnough в зависимости от количество найденныхи показанных фильмов
  const handleFoundMoviesAmount = (foundMoviesCounter) => {
    foundMovies = foundMoviesCounter;
  };

  // Возвращает разметку при незаданном поиске
  const returnUntouchedSearchMarkUp = () => (
    <section className="movies-card-list__welcome-screen">
      <p className="movies-card-list__message">
        Введите название или ключевые слова в строку поиска, чтобы найти фильмы.
      </p>
    </section>
  );

  // Возвращает разметку заданного поиска
  const returnSearchHandlingMarkUp = () => (
    isLoading
      // Если ищем фильмы, то покажем прелоудер, пока они загружаются
      ? <Preloader />
      // Если фильмы найдены, передадим компоненту MovieFilter нужные пропсы
      : (
        <>
          <section className="movies-card-list">
            <MovieFilter // Фильтрует фильмы и возвращает разметку
              movies={movies} // Массив фильмов * Object
              moviesPerPage={visibleMoviesCount} // Фильмов на странице * Number
              showShortMovies={showShortMovies} // Показывать короткометражки? * Bool
              searchKey={searchKey} // Ключевые слова * String
              handleFoundMoviesAmount={handleFoundMoviesAmount}
              handleMovieLike={handleMovieLike}
              // Коллбэк изменения количества фильмов * func
            />
          </section>
          { handleButtonAppear() }
        </>
      )
  );

  useEffect(() => {
    // Сбрасываем количество фильмов на странице при изменении ключевого слова
    setVisibleMoviesCount(6);
  }, [searchKey]);

  useEffect(() => {
    setMoviesFoundAmount(foundMovies);
  }, [handleFoundMoviesAmount]);

  return (
    <>
      {
        searchKey === '' && !favouriteOnly
          ? returnUntouchedSearchMarkUp() // Если ещё ничего не искали, то показать welcome-screen
          : returnSearchHandlingMarkUp() // А если искали, то работаем с фильмами дальше
      }
      <Footer />
    </>
  );
}

export default MoviesCardList;
