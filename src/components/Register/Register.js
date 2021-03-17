/*eslint-disable*/
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../SinglePageForm/SinglePageForm.css';
import SinglePageForm from '../SinglePageForm/SinglePageForm';

function Register(props) {
  const { signup, APIError} = props;
  const [name, setName] = React.useState(''); // Стейт для имени
  const [email, setEmail] = React.useState(''); // Стейт для почты
  const [password, setPassword] = React.useState(''); // Стейт для пароля

  const [isFormValid, setFormValidity] = React.useState(false); // Стейт валидности всей формы

  const history = useHistory();

  const handleSubmit = () => {
    /* Логика сабмита форма регистрации */

    // Отправляем запрос:
    signup(name, email, password);

    // Сбрасываем стейты:
    setName('');
    setEmail('');
    setPassword('');

    // Делаем форму невалидной:
    setFormValidity(false);
  };

  const handleInputError = (input, message, isError) => {
    /* Логика отображения ошибки для инпута */
    const inputError = document.getElementById(`${input.id}Error`);
    input.classList.toggle('spf__error', isError);
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
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('input', () => {
      if (nameInput.validity.patternMismatch) {
        nameInput.setCustomValidity('Имя может содержать только буквы, пробел и тире.');
      } else if (nameInput.validity.tooShort) {
        nameInput.setCustomValidity('Имя слишком короткое.');
      } else if (nameInput.validity.valueMissing) {
        nameInput.setCustomValidity('Введите ваше имя на латинице или кириллице.');
      } else {
        nameInput.setCustomValidity('');
      }
    });

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
        passwordInput.setCustomValidity(`Слишком простой пароль, минимум 8 символов: [${passwordInput.value.length}/8].`);
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
    <>
      <SinglePageForm
        header="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        hintText="Уже зарегистрированы?"
        hintLinkText="Войти"
        hintLinkUrl="/signin"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        submitErrorText={APIError}
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
              onChange={(e) => {
                setName(e.target.value);
                validateInputOnChange(e);
              }}
              value={name}
              maxLength="25"
              minLength="2"
              pattern="^(?! )[A-Za-zА-Яа-яЁё\- ]*[^\s]"
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
              pattern="^\S+@\S+\.\S+$"
              minLength="2"
              onChange={(e) => {
                setEmail(e.target.value);
                validateInputOnChange(e);
              }}
              value={email}
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
              onChange={(e) => {
                setPassword(e.target.value);
                validateInputOnChange(e);
              }}
              value={password}
              minLength="8"
            />
            <span className="spf__error-message" id="passwordError">Ошибка.</span>
          </label>
        </>
      </SinglePageForm>
    </>
  );
}

export default Register;
