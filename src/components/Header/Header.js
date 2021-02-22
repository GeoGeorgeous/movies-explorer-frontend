/* eslint-disable */
import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <ul className="header__links">

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
