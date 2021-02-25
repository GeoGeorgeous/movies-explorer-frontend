/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
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
          <FilterCheckbox identificator="filter" />
          Короткометражки
        </label>
        <hr className="sf__line" />
      </div>
    </>
  );
}

export default SearchForm;
