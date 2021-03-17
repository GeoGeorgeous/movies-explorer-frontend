import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../SinglePageForm/SinglePageForm.css';
import SinglePageForm from '../SinglePageForm/SinglePageForm';
import mainApi from '../../utils/MainApi';
// import Error from '../Error/Error';

function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isFormValid, setFormValidty] = React.useState(false);

  const history = useHistory();

  const handleSubmit = (validData) => {
    /* Логика сабмита форма регистрации */
    mainApi.signUpUser(
      {
        name: validData.name,
        email: validData.email,
        password: validData.password,
      },
    )
      .then((res) => {
        if (res) {
          // handleToolTipOpen({ success: true });
          history.push('/signin');
        } else {
          // handleToolTipOpen({
          //   success: false,
          // });
          // console.log('показать ошибку');
        }
      });
  };

  const handleInputError = (input, message, isError) => {
    /* Логика отображения ошибки для инпута */
    const inputError = document.getElementById(`${input.id}Error`);
    input.classList.toggle('spf__error', isError);
    inputError.textContent = message;
    inputError.classList.toggle('spf__error-message_shown', isError);
  };

  const checkFormValidity = () => {
    const inputs = Array.from(document.getElementsByTagName('input'));
    const areAllInputsValid = inputs.every((input) => input.validity.valid);
    setFormValidty(areAllInputsValid);
  };

  const validateInputOnChange = (e) => {
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
    setIputListeners();
  }, []);

  return (
    <>
      {/* <Error /> */}
      <SinglePageForm
        header="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        hintText="Уже зарегистрированы?"
        hintLinkText="Войти"
        hintLinkUrl="/signin"
        onSubmit={handleSubmit}
        inputData={{ name, email, password }}
        isFormValid={isFormValid}
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
