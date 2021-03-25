/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable  */
import React, { useEffect } from 'react';
import './MoviesCard.css';
import PropTypes from 'prop-types';
import noCover from '../../images/no-cover.png';
import calcDuration from '../../utils/calcDuration';

function MoviesCard(props) {
  const {
    defMovieLike, duration, cover, title, trailerLink, uniqueId, isLiked, handleMovieLike, wholeMovie
  } = props;

  const [isHovered, setHovered] = React.useState(false);
  const [isChecked, setChecked] = React.useState(defMovieLike(wholeMovie));

  MoviesCard.propTypes = {
    uniqueId: PropTypes.number.isRequired, // Уникальный ID для добавления/удаления из сохранённых
    duration: PropTypes.number.isRequired, // Длительность в минутах
    cover: PropTypes.object.isRequired, // Изображение карточки
    title: PropTypes.string.isRequired, // Название фильма
    trailerLink: PropTypes.string,
    defMovieLike: PropTypes.func.isRequired,
  };

  function onChange(e) {
    handleMovieLike(wholeMovie, isChecked);
    setChecked(!isChecked);
  }

  let inputOpenClass;
  isHovered
  ? inputOpenClass = 'show'
  : inputOpenClass = ''

  const inputId = `favourite${uniqueId}`;
  const movieImage = cover.image ? `https://api.nomoreparties.co${cover.image.url}` : noCover;

  useEffect(() => {
    defMovieLike(wholeMovie);
  }, []);

  return (
    <article
    onMouseEnter={(e) => setHovered(true)}
    onMouseLeave={(e) => setHovered(false)}
    className="movies-card">
      <a
      href={trailerLink ? trailerLink : ''} target="_blank" className="movies-card__cover">
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
