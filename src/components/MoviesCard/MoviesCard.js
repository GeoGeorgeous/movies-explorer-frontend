/* eslint-disable */
import React from 'react';
import './MoviesCard.css';
import PropTypes from 'prop-types';

function MoviesCard(props) {
  const {
    duration, cover, title, isFavourite, uniqueId,
  } = props;

  const [saved, setSaved] = React.useState(isFavourite);
  
  MoviesCard.propTypes = {
    duration: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isFavourite: PropTypes.bool.isRequired,
  };

  function calcDuration(movieDurationInMinutes) {
    const hours = Math.floor(movieDurationInMinutes / 60);
    const minutes = Math.floor(movieDurationInMinutes - hours * 60);
    return `${hours}ч ${minutes}м`
  }

  function handleMovieClick(e) {
    setSaved(!saved);
  }

  const inputId = `favourite${uniqueId}`

  return (
    <article className="movies-card">
      <label for={inputId} className="movies-card__cover">
        <img src={cover} className="movies-card__cover-image" />
      </label>
      <h4 className="movies-card__title">{title}</h4>
      <span className="movies-card__duration">{calcDuration(duration)}</span>
      <input className="movied-card__save-button" type="checkbox" id={inputId} onClick={handleMovieClick} checked={saved}/>
    </article>
  );
}

export default MoviesCard;
