/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Button.css';

function Button(props) {
  const {
    text, size, formFactor, color, url, type,
  } = props;
  Button.propTypes = {
    text: PropTypes.string.isRequired, // Текст кнопки
    size: PropTypes.string.isRequired, // Размер строки: small, medium, large
    formFactor: PropTypes.string.isRequired, // Форма кнопки:
    // square, smooth-square, round, extra-round
    color: PropTypes.string.isRequired, // Цвет фона для кнопки: green, gray, blue
    url: PropTypes.string, // Адрес ссылки ('/..')
    type: PropTypes.string,
  };
  Button.defaultProps = {
    url: '',
    type: 'button',
  };

  // Если передан url кнопка обёрнута в Link:
  return (
    url
      ? (
        <Link to={url}>
          <button
            type={type}
            className={`
      button button_size_${size}
      button_form-factor_${formFactor}
      button_color_${color}
      `}
          >
            {text}
          </button>
        </Link>
      )
      : (
        <button
          type={type}
          className={`
      button button_size_${size}
      button_form-factor_${formFactor}
      button_color_${color}
      `}
        >
          {text}
        </button>
      )
  );
}

export default Button;
