/*eslint-disable*/
import React, { useEffect } from 'react';
import { UserContext } from '../../contexts/userContext';
import Header from '../Header/Header';
import './Profile.css';

function Profile(props) {
  const { updateUserData, onLogout } = props;

  const user = React.useContext(UserContext);
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [isFormValid, setFormValidty] = React.useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateUserData({name, email});
  };

  const handleLogOut = () => {
    onLogout();
  }

  const handleInputError = (input, message, isError) => {
    /* Логика отображения ошибки для инпута */
    const inputError = document.getElementById(`${input.id}Error`);
    input.classList.toggle('profile__error', isError);
    inputError.textContent = message;
    inputError.classList.toggle('profile__error-message_shown', isError);
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
  };

  useEffect(() => {
    setIputListeners();
  }, []);

  return (
    <>
      <Header
        loggedIn
      />
      <div className="profile">
        <h1 className="profile__header">Привет, Виталий!</h1>
        <form className="profile__form" id="profile" onSubmit={(e) => handleFormSubmit(e)} noValidate>
          <label className="profile__label" htmlFor="name">
            Имя
            <input
              className="profile__input"
              type="text"
              id="name"
              value={name}
              maxLength="25"
              minLength="2"
              pattern="^(?! )[A-Za-zА-Яа-яЁё\- ]*[^\s]"
              required
              onChange={(e) => {
                setName(e.target.value);
                validateInputOnChange(e);
              }}
            />
            <span className="profile__error-message" id="nameError"></span>
          </label>
          <hr className="profile__divider" />
          <label className="profile__label" htmlFor="email">
            Почта

            <input
              className="profile__input"
              type="text"
              id="email"
              value={email}
              pattern="^\S+@\S+\.\S+$"
              minLength="2"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                validateInputOnChange(e);
              }}
            />
            <span className="profile__error-message" id="emailError"></span>
          </label>
        </form>
        <div className="profile__buttons">
          <button className="profile__button profile__button_type_submit" type="submit" form="profile" disabled={!isFormValid}>Редактировать</button>
          <button className="profile__button profile__button_type_logout" type="button" onClick={handleLogOut}>Выйти из аккаунта</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
