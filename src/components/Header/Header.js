import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './Header.css';
import logo from '../../images/logo.svg';

function Header(props) {
  const { loggedIn } = props;
  Header.propTypes = {
    loggedIn: PropTypes.bool.isRequired, // logged in? (хардкод до авторизации)
  };
  return (
    <header className="header">
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logo} alt="Логотип Movies Explorer" />
      </Link>
      {/* Разные хедоры, в зависимости от loggedIn */}
      {loggedIn
        ? (
          <>
            <ul className="header__links">
              <li className="header__link-item">
                <Link to="/movies" className="header__link">Фильмы</Link>
              </li>
              <li className="header__link-item">
                <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
              </li>
            </ul>
            <Button
              size="small"
              color="gray"
              formFactor="extra-round"
              text="Аккаунт"
              url="/signin"
            />
          </>
        )
        : (
          <ul className="header__links">
            <li className="header__link-item">
              <Link to="/signup" className="header__link">Регистрация</Link>
            </li>
            <li className="header__link-item">
              <Button
                size="small"
                color="green"
                formFactor="square"
                text="Войти"
                url="/signin"
              />
            </li>
          </ul>
        )}

    </header>
  );
}

export default Header;
