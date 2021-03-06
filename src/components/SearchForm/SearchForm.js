/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const { onCheckBoxToggle } = props;
  SearchForm.propTypes = {
    onCheckBoxToggle: PropTypes.func.isRequired, // callback
  };
  return (
    <>
      <div className="sf">
        <form className="sf__form">
          <input
            type="text"
            className="sf__input"
            placeholder="Фильм"
            id="movie"
          />
          <Button
            size="large"
            color="blue"
            formFactor="square"
            text="Найти"
            url="/signin"
          />
        </form>
        <label className="sf__filter" htmlFor="filter">
          <FilterCheckbox
            identificator="filter"
            onCheckBoxToggle={onCheckBoxToggle}
          />
          Короткометражки
        </label>
        <hr className="sf__divider" />
      </div>
    </>
  );
}

export default SearchForm;
