import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button(props) {
  const {
    text, size, formFactor, color,
  } = props;
  Button.propTypes = {
    text: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    formFactor: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  return (
    <button
      type="button"
      className={`
    button button_size_${size}
    button_form-factor_${formFactor}
    button_color_${color}
    `}
    >
      {text}
    </button>
  );
}

export default Button;
