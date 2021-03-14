import React, { useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MovieFilter from '../MovieFilter/MovieFilter';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const {
    movies, showShortMovies, searchKey, isLoading,
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
  };

  // Количество фильмов, показываемых изначально (до нажатия на кнопку загрузить ещё)
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(6);

  /*
    Показаны все фильмы, соответствующие запросы или можно загрузить ещё?
    true — фильмов достаточно, false — можно загрузить ещё
    Управляется функцией handleFoundMoviesAmount()
  */
  const [moviesFound, setMoviesFoundAmount] = React.useState(0);

  // Обработчик нажатия кнопки добавления фильмов «Ещё»
  const handleShowMoreMovies = () => {
    setVisibleMoviesCount(visibleMoviesCount + 3);
  };

  const handleButtonAppear = () => {
    if (moviesFound >= visibleMoviesCount) { // Логика показывания / скрывания кнопки «Ещё»
      return <button className="movies-card-list__load-more" type="button" onClick={handleShowMoreMovies}>Ещё</button>;
    }
    if (moviesFound === 0) {
      return (
        <p className="movies-card-list__message">
          Ничего не найдено.
        </p>
      );
    }
    return (
      <p className="movies-card-list__message">
        Показаны все найденные фильмы.
      </p>
    );
  };

  // Задаём стейт shownEnough в зависимости от количество найденныхи показанных фильмов
  const handleFoundMoviesAmount = (foundMoviesCounter) => {
    setMoviesFoundAmount(foundMoviesCounter);
  };

  // Возвращает разметку при незаданном поиске
  const returnUntouchedSearchMarkUp = () => (
    <section className="movies-card-list__welcome-screen">
      <p className="movies-card-list__welcome-screen-text">
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

  return (
    <>
      {
        searchKey === ''
          ? returnUntouchedSearchMarkUp() // Если ещё ничего не искали, то показать welcome-screen
          : returnSearchHandlingMarkUp() // А если искали, то работаем с фильмами дальше
      }
      <Footer />
    </>
  );
}

export default MoviesCardList;
