/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable  */
import React from 'react';
import './MoviesCard.css';
import PropTypes from 'prop-types';
import noCover from '../../images/no-cover.png';

function MoviesCard(props) {
  const {
    duration, cover, title, trailerLink, uniqueId, isLiked, handleMovieLike, wholeMovie
  } = props;

  const [isHovered, setHovered] = React.useState(false);
  const [isChecked, setChecked] = React.useState(isLiked);

  MoviesCard.propTypes = {
    uniqueId: PropTypes.number.isRequired, // Уникальный ID для добавления/удаления из сохранённых
    duration: PropTypes.number.isRequired, // Длительность в минутах
    cover: PropTypes.object.isRequired, // Изображение карточки
    title: PropTypes.string.isRequired, // Название фильма
    trailerLink: PropTypes.string.isRequired,
  };

  /*
    Вычисляет длительность фильма в часах и минутах
    и возвращает строку вида '2ч 14м'

    @param movieDurationInMinutes: длительность в минутах
  */
  function calcDuration(movieDurationInMinutes) {
    const hours = Math.floor(movieDurationInMinutes / 60);
    const minutes = Math.floor(movieDurationInMinutes - hours * 60);
    return `${hours}ч ${minutes}м`;
  }

  function onChange(e) {
    setChecked(e.target.checked);
    handleMovieLike(wholeMovie);
  }

  let inputOpenClass;
  isHovered
  ? inputOpenClass = 'show'
  : inputOpenClass = ''

  const inputId = `favourite${uniqueId}`;
  const movieImage = cover.image ? `https://api.nomoreparties.co${cover.image.url}` : noCover;

  return (
    <article
    onMouseEnter={(e) => setHovered(true)}
    onMouseLeave={(e) => setHovered(false)}
    className="movies-card">
      <a
      href={trailerLink} target="_blank" className="movies-card__cover">
        <img src={movieImage} className="movies-card__cover-image" alt={title} />
      </a>
      <h4 className="movies-card__title">{title}</h4>
      <span className="movies-card__duration">{calcDuration(duration)}</span>
      <input
        className={`movies-card__save-button ${inputOpenClass}`}
        type="checkbox"
        id={inputId}
        checked={isChecked}
        onChange={(e) => onChange(e)}
      />
    </article>
  );
}

export default MoviesCard;
