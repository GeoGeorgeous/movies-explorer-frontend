/* eslint-disable */
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className="footer__line" />
      <div className="footer__underline">
        <p className="footer__copyright">&copy; 2020</p>
        <ul className="footer__links">
          <li className="footer__link-item">
            <a href="#" className="footer__link">Яндекс.Практикум</a>
          </li>
          <li className="footer__link-item">
            <a href="#" className="footer__link">Github</a>
          </li>
          <li className="footer__link-item">
            <a href="#" className="footer__link">Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
