/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const { onCheckBoxToggle, onFormSubmit } = props;
  const [userInput, setUserInput] = React.useState('');
  const [isErrorShown, setErrorShown] = React.useState(false);
  SearchForm.propTypes = {
    onCheckBoxToggle: PropTypes.func.isRequired, // Коллбэк изменения чекбокса
    onFormSubmit: PropTypes.func.isRequired, // Коллбэк отправки формы
  };

  // Объект с классами для отображения ошибки
  let errorClasses = {
    inputErrorClass: '',
    errorMsgClass: '',
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setErrorShown(false);
  };

  const handleFocusOut = () => {
    // Убираем ошибки валидации при focus out с инпута
    setErrorShown(false);
  };

  const validateForm = (form) => {
    const isValid = form
      .querySelector('.sf__input')
      .validity
      .valid;
    setErrorShown(!isValid);
    localStorage.removeItem('searchKey');
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(e.target)) {
      onFormSubmit(userInput);
      localStorage.setItem('searchKey', userInput);
    }
  };

  useEffect(() => { // Изменение количества отображаемых фильмов при изменении стейта
    const savedSearchKey = localStorage.getItem('searchKey');
    if (savedSearchKey) {
      setUserInput(savedSearchKey);
      onFormSubmit(userInput);
    }
  }, []);

  isErrorShown
    ? errorClasses = {
      inputErrorClass: 'sf__input-error',
      errorMsgClass: 'sf__form-error_show',
    }
    : errorClasses = {
      inputErrorClass: '',
      errorMsgClass: '',
    };

  return (
    <>
      <div className="sf">
        <form
          className="sf__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="text"
            className={`sf__input ${errorClasses.inputErrorClass}`}
            placeholder="Фильм"
            id="movie"
            value={userInput}
            onChange={handleChange}
            onBlur={handleFocusOut}
            required
          />
          <Button
            size="large"
            color="blue"
            formFactor="square"
            text="Найти"
            type="submit"
          />
        </form>
        <span className={`sf__form-error ${errorClasses.errorMsgClass}`}>Нужно ввести ключевое слово</span>
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
