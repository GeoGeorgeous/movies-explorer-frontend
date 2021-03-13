/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const { onCheckBoxToggle, onFormSubmit } = props;
  const [userInput, setUserInput] = React.useState('');
  // Валидна ли форма? Изначально true, чтобы не показывать ошибки:
  const [formValidity, setFormValidity] = React.useState(true);
  SearchForm.propTypes = {
    onCheckBoxToggle: PropTypes.func.isRequired, // Коллбэк изменения чекбокса
    onFormSubmit: PropTypes.func.isRequired, // Коллбэк отправки формы
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setFormValidity(true);
  };

  const handleFocusOut = () => {
    // Убираем ошибки валидации при focus out с инпута
    setFormValidity(true);
  };

  const validateForm = (form) => {
    setFormValidity(
      form
        .querySelector('.sf__input')
        .validity
        .valid,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(e.target);
    onFormSubmit(userInput);
  };

  // Объект с классами для отображения ошибки
  let errorClasses = {
    inputErrorClass: '',
    errorMsgClass: '',
  };

  // Показать ошибки, если форма невалидна
  if (!formValidity) {
    errorClasses = {
      inputErrorClass: 'sf__input-error',
      errorMsgClass: 'sf__form-error_show',
    };
  }

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
