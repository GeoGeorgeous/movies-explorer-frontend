import React from 'react';
import PropTypes from 'prop-types';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
  const { identificator } = props;
  FilterCheckbox.propTypes = {
    identificator: PropTypes.string.isRequired,
  };
  return (
    <input id={identificator} className="checkbox" type="checkbox" />
  );
}

export default FilterCheckbox;
