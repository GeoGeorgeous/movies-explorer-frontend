/*eslint-disable*/
import React, { useEffect } from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MovieFilter from '../MovieFilter/MovieFilter';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const {
    movies, showShortMovies, searchKey, isLoading, handleMovieLike, favouriteOnly, defMovieLike,
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
    defMovieLike: PropTypes.func.isRequired,
  };

  MoviesCardList.defaultProps = {
    favouriteOnly: false,
  };

  // Количество фильмов, показываемых изначально (до нажатия на кнопку загрузить ещё)
  const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(6);
  const [addMoreCount, setAddMoreCount] = React.useState(3);
  const [screenWidth, setScreenWidth] = React.useState(0);
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
    setVisibleMoviesCount(visibleMoviesCount + addMoreCount);
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
  const returnSearchHandlingMarkUp = () => {
    if (searchKey === '') {
      return (
        <section className="movies-card-list__welcome-screen">
          <p className="movies-card-list__message">
            Введите название или ключевые слова в строку поиска, чтобы найти фильмы.
          </p>
        </section>
      );
    }
    return (isLoading
      ? <Preloader /> // Если ищем фильмы, то покажем прелоудер, пока они загружаются
      : ( // Если фильмы найдены, передадим компоненту MovieFilter нужные пропсы
        <>
          <section className="movies-card-list">
            <MovieFilter // Фильтрует фильмы и возвращает разметку
              movies={movies} // Массив фильмов * Object
              moviesPerPage={visibleMoviesCount} // Фильмов на странице * Number
              showShortMovies={showShortMovies} // Показывать короткометражки? * Bool
              searchKey={searchKey} // Ключевые слова * String
              handleFoundMoviesAmount={handleFoundMoviesAmount} // Обработчик количества найденных фильмов
              handleMovieLike={handleMovieLike} // Обработчик изменения лайка фильма
              defMovieLike={defMovieLike} // Определяет, лайкнут ли фильм
            />
          </section>
          { handleButtonAppear() }
        </>
      )
    );
  };

  const returnFavouriteMoviesMarkUp = () => {
  return (
    movies.length > 0
    ? <section className="movies-card-list">
        <MovieFilter // Фильтрует фильмы и возвращает разметку
          movies={movies} // Массив фильмов * Object
          moviesPerPage={visibleMoviesCount} // Фильмов на странице * Number
          showShortMovies={showShortMovies} // Показывать короткометражки? * Bool
          searchKey={searchKey} // Ключевые слова * String
          handleFoundMoviesAmount={handleFoundMoviesAmount} // Обработчик количества найденных фильмов
          handleMovieLike={handleMovieLike} // Обработчик изменения лайка фильма
          defMovieLike={defMovieLike} // Определяет, лайкнут ли фильм
          onlyFavourite
        />
      </section>

      : <section className="movies-card-list__welcome-screen">
        <p className="movies-card-list__message">
           Вы ещё не сохранили ни одного фильма.
        </p>
         </section>)
  };

  useEffect(() => {
    // Сбрасываем количество фильмов на странице при изменении ключевого слова
    setVisibleMoviesCount(6);
  }, [searchKey]);

  function setNewWidth() {
    setScreenWidth(window.innerWidth)
  }


  useEffect(() => {
    function handleScreenResize() {
      setTimeout(setNewWidth, 600)
    }

    window.addEventListener('resize', handleScreenResize)

    return function () {
      window.removeEventListener('resize', handleScreenResize)
    }
  }, [])

  useEffect(() => {
    screenWidth
    if (screenWidth <= 480) {
      setVisibleMoviesCount(5);
      setAddMoreCount(2);
    }
    if (screenWidth > 480 && screenWidth <= 768) {
      setVisibleMoviesCount(8);
      setAddMoreCount(2);
    }
    if (screenWidth > 768) {
      setVisibleMoviesCount(12);
      setAddMoreCount(3);
    }
  }, [screenWidth])

  useEffect(() => {
    setMoviesFoundAmount(foundMovies);
  }, [handleFoundMoviesAmount]);

  return (
    <>
      {
        favouriteOnly
          ? returnFavouriteMoviesMarkUp() // Если ещё ничего не искали, то показать welcome-screen
          : returnSearchHandlingMarkUp()
      }
      <Footer />
    </>
  );
}

export default MoviesCardList;
