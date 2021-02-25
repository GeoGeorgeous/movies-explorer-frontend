import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logo} alt="Логотип Movies Explorer" />
      </Link>
      <ul>
        <Link to="/signup" className="header__link">Регистрация</Link>
        <Button
          size="small"
          color="green"
          formFactor="square"
          text="Войти"
          url="/signin"
        />
      </ul>
    </header>
  );
}

export default Header;
