import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../SinglePageForm/SinglePageForm.css';

import SinglePageForm from '../SinglePageForm/SinglePageForm';

function Login(props) {
  const { login, APIError } = props;

  Login.propTypes = {
    login: PropTypes.string.isRequired, // Функция авторизации
    APIError: PropTypes.func.isRequired, // Текст ошибки формы
  };

  const [email, setEmail] = React.useState(''); // Стейт для почты
  const [password, setPassword] = React.useState(''); // Стейт для пароля

  const [isFormValid, setFormValidity] = React.useState(false); // Стейт валидности всей форм

  const handleSubmit = () => {
    /* Логика сабмита формы авторизации */

    // Отправляем запрос:
    login(email, password);

    // Сбрасываем стейты:
    setEmail('');
    setPassword('');

    // Делаем форму невалидной:
    setFormValidity(false);
  };

  const handleInputError = (input, message, isError) => {
    /* Логика отображения ошибки для инпута */
    const inputError = document.getElementById(`${input.id}Error`);
    inputError.textContent = message;
    inputError.classList.toggle('spf__error-message_shown', isError);
  };

  const checkFormValidity = () => {
    /* Логика проверки валидности формы на основе валидности её инпутов */
    const inputs = Array.from(document.getElementsByTagName('input'));
    const areAllInputsValid = inputs.every((input) => input.validity.valid);
    setFormValidity(areAllInputsValid);
  };

  const validateInputOnChange = (e) => {
    // Live-валидация
    const input = e.target;

    if (input.validity.valid) {
      handleInputError(input, input.validationMessage, false);
    } else {
      input.dataset.valid = false;
      handleInputError(input, input.validationMessage, true);
    }
    checkFormValidity();
  };

  const setIputListeners = () => {
    // Слушатели для кастомных текстов ошибок инпутов
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', () => {
      if (emailInput.validity.typeMismatch || emailInput.validity.patternMismatch) {
        emailInput.setCustomValidity('Это не похоже на настоящий email.');
      } else {
        emailInput.setCustomValidity('');
      }
    });

    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', () => {
      if (passwordInput.validity.tooShort) {
        passwordInput.setCustomValidity(`Слишком короткий пароль, минимум 8 символов (Сейчас ${passwordInput.value.length}).`);
      } else {
        passwordInput.setCustomValidity('');
      }
    });
  };

  useEffect(() => {
    // Ставим слушатели при монтировании
    setIputListeners();
  }, []);

  return (
    <SinglePageForm
      header="Рады видеть!"
      buttonText="Войти"
      hintText="Ещё не зарегистрированы?"
      hintLinkText="Регистрация"
      hintLinkUrl="/signup"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      submitErrorText={APIError}
    >
      <>
        <label htmlFor="email" className="spf__label">
          E-mail
          <input
            type="email"
            className="spf__input"
            placeholder="email@yandex.com"
            id="email"
            autoComplete="on"
            pattern="^\S+@\S+\.\S+$"
            minLength="2"
            onChange={(e) => {
              setEmail(e.target.value);
              validateInputOnChange(e);
            }}
            value={email}
            required
          />
          <span className="spf__error-message" id="emailError">Ошибка ввода.</span>
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
            onChange={(e) => {
              setPassword(e.target.value);
              validateInputOnChange(e);
            }}
            value={password}
            minLength="8"
          />
          <span className="spf__error-message" id="passwordError">Ошибка ввода.</span>
        </label>
      </>
    </SinglePageForm>
  );
}

export default Login;
