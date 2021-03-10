/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './MoviesCard.css';
import PropTypes from 'prop-types';

function MoviesCard(props) {
  const {
    duration, cover, title, isFavourite, uniqueId,
  } = props;

  const [isChecked, setChecked] = React.useState(isFavourite);

  MoviesCard.propTypes = {
    uniqueId: PropTypes.string.isRequired, // Уникальный ID для добавления/удаления из сохранённых
    duration: PropTypes.number.isRequired, // Длительность в минутах
    cover: PropTypes.string.isRequired, // Изображение карточки
    title: PropTypes.string.isRequired, // Название фильма
    isFavourite: PropTypes.bool.isRequired, // Добавлено в любимые? Bool
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
  }

  const inputId = `favourite${uniqueId}`;

  return (
    <article className="movies-card">
      <label htmlFor={inputId} className="movies-card__cover">
        <img src={cover} className="movies-card__cover-image" alt={title} />
      </label>
      <h4 className="movies-card__title">{title}</h4>
      <span className="movies-card__duration">{calcDuration(duration)}</span>
      <input
        className="movied-card__save-button"
        type="checkbox"
        id={inputId}
        checked={isChecked}
        onChange={(e) => onChange(e)}
      />
    </article>
  );
}

export default MoviesCard;
