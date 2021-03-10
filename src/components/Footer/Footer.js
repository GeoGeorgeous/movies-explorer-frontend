import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className="footer__divider" />
      <div className="footer__underline">
        <p className="footer__copyright">&copy; 2020</p>
        <ul className="footer__links">
          <li className="footer__link-item">
            <a href="https://praktikum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__link-item">
            <a href="https://github.com/GeoGeorgeous" className="footer__link" target="_blank" rel="noreferrer">Github</a>
          </li>
          <li className="footer__link-item">
            <a href="https://www.facebook.com/" className="footer__link" target="_blank" rel="noreferrer">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
