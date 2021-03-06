/* eslint-disable */
import React from 'react';
import './MobileNav.css';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

function MobileNav(props) {
  const {isPopUpOpen, onClose} = props;
  // добавление active class для активной ссылки
  const location = useLocation();
  const moviesActive = location.pathname === '/movies' ? 'header__link-active' : '';
  const savedMoviesActive = location.pathname === '/saved-movies' ? 'header__link-active' : '';
  // открытие/закрытие попапа
  let showPopUpClass;
  isPopUpOpen
  ? showPopUpClass = '_opened'
  : showPopUpClass = '_hided'

  const handlePopupClose = () => {
    onClose();
  }

  return (
    <>
      <div className={`mobile-nav__popup mobile-nav__popup${showPopUpClass}`} >
        <nav className={`mobile-nav mobile-nav${showPopUpClass}`}>
          <ul className="mobile-nav__links">
            <li className="mobile-nav__link-item">
              <Link to="/" className={`mobile-nav__link`}>Главная</Link>
            </li>
            <li className="mobile-nav__link-item">
              <Link to="/movies" className={`mobile-nav__link ${moviesActive}`}>Фильмы</Link>
            </li>
            <li className="mobile-nav__link-item">
              <Link to="/saved-movies" className={`mobile-nav__link ${savedMoviesActive}`}>Сохранённые фильмы</Link>
            </li>
          </ul>
          <Button
                size="wide"
                color="gray"
                formFactor="extra-round"
                text="Аккаунт"
                url="/signin"
              />
        </nav>
        <button type="button" aria-label="Закрыть меню" className="mobile-nav__close-button" onClick={handlePopupClose} />
      </div>
    </>
  );
}

export default MobileNav;
