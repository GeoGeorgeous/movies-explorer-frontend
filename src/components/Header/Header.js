import React from 'react';
import Button from '../Button/Button';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a><img className="header__logo" src={logo} /></a>
      <ul className="header__links">
        <a href="#" className="header__link">Регистрация</a>
        <Button
          size="small"
          color="green"
          formFactor="square"
          text="Войти"
           />
      </ul>
      </header>
  );
}

export default Header;
