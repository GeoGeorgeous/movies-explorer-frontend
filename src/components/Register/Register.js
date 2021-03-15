/* eslint-disable */
import React from 'react';
import '../SinglePageForm/SinglePageForm.css';
import SinglePageForm from '../SinglePageForm/SinglePageForm';
// import Error from '../Error/Error';

function Register() {

  const [] = React.useState()

  const handleInputError = (input, message = 'Поле заполнено неверно', showError) => {
    const inputError = document.getElementById(`${input.id}Error`)
    input.classList.toggle('spf__error', showError);
    inputError.textContent = message;
    inputError.classList.toggle('spf__error-message_shown', showError)
  }

  const validateInputOnChange = (e, message) => {
    const input = e.target;
    const validity = input.validity.valid;
    validity
    ? handleInputError(input, message, false)
    : handleInputError(input, message, true)
  }

  return (
    <>
      {/* <Error /> */}
      <SinglePageForm
        header="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        hintText="Уже зарегистрированы?"
        hintLinkText="Войти"
        hintLinkUrl="/signin"
      >
        <>
          <label htmlFor="name" className="spf__label">
            Имя
            <input
              type="text"
              className="spf__input"
              placeholder="Виталий"
              id="name"
              autoComplete="on"
              onChange={e => validateInputOnChange(e, 'Имя указано неверно')}
              required
            />
            <span className="spf__error-message" id="nameError">Ошибка.</span>
          </label>

          <label htmlFor="email" className="spf__label">
            E-mail
            <input
              type="email"
              className="spf__input"
              placeholder="email@yandex.com"
              id="email"
              autoComplete="on"
              onChange={e => validateInputOnChange(e, 'Адрес электронной почты указан неверно')}
              required
            />
            <span className="spf__error-message" id="emailError">Ошибка.</span>
          </label>

          <label htmlFor="password" className="spf__label">
            Пароль
            <input
              type="password"
              className="spf__input"
              id="password"
              autoComplete="on"
              placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              required
              onChange={e => validateInputOnChange(e, 'Пароль не должен быть слишком простым')}
              minLength="4"
            />
            <span className="spf__error-message" id="passwordError">Ошибка.</span>
          </label>
        </>
      </SinglePageForm>
    </>
  );
}

export default Register;
