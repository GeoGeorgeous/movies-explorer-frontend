/* eslint-disable */
import React from 'react';
import './SearchForm.css'
import Button from '../Button/Button'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (
    <div className="sf">
      <form className="sf__form">
      <input
        type="text"
        className="sf__input"
        placeholder="Фильм"
        id="movie"/>
      <Button
            size="large"
            color="blue"
            formFactor="square"
            text="Найти"
            url="/signin"
          />
      </form>
      <div className="sf__filter">
        <FilterCheckbox identificator="filter" />
        <label for="filter" className="sf__filter-label">Короткометражки</label>
      </div>
      <hr className="sf__line" />
    </div>
  );
}

export default SearchForm;
