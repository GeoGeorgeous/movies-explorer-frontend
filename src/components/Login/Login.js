/*eslint-disable*/
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../SinglePageForm/SinglePageForm.css';
import mainApi from '../../utils/MainApi';
import SinglePageForm from '../SinglePageForm/SinglePageForm';

function Login(props) {
  const { handleLogin } = props;

  Login.propTypes = {
    handleLogin: PropTypes.func.isRequired, // Заголовок формы
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isFormValid, setFormValidty] = React.useState(false);

  const history = useHistory();

  const handleSubmit = (validData) => {
    console.log('тык');
    /* Логика сабмита форма регистрации */
    mainApi.authorize(
      {
        email: validData.email,
        password: validData.password,
      },
    )
      .then((res) => {
        if (res) {
          setEmail('');
          setPassword('');
          // handleToolTipOpen({ success: true });
          handleLogin(res.token)
          history.push('/movies');
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
        passwordInput.setCustomValidity(`Слишком короткий пароль, минимум 8 символов: [${passwordInput.value.length}/8].`);
      } else {
        passwordInput.setCustomValidity('');
      }
    });
  };

  useEffect(() => {
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
      inputData={{ email, password }}
      isFormValid={isFormValid}
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
  );
}

export default Login;
