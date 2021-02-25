import React from 'react';
import Section from '../Section/Section';
import './AboutMe.css';
import avatar from '../../images/avatar.png';

function AboutMe() {
  return (
    <Section
      title="Студент"
      anchor="aboutMe"
    >
      <div className="about-me__container">
        <div className="about-me__author">
          <h3 className="about-me__header">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
            и ушёл с постоянной работы.
          </p>
          <ul className="about-me__social-links">
            <li className="about-me__link-item">
              <a className="about-me__social-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            </li>
            <li className="about-me__link-item">
              <a className="about-me__social-link" href="https://github.com/GeoGeorgeous" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Фотография автора" />
      </div>
      <h4 className="about-me__portfolio-header">Портфолио</h4>
      <ul className="about-me__project-buttons">
        <li className="about-me__project-button-item">
          <a href="https://github.com/GeoGeorgeous/how-to-learn" target="_blank" rel="noreferrer">
            <button className="about-me__project-button" type="button">Статичный сайт</button>
          </a>
        </li>
        <li className="about-me__project-button-item">
          <a href="https://github.com/GeoGeorgeous/russian-travel" target="_blank" rel="noreferrer">
            <button className="about-me__project-button" type="button">Адаптивный сайт</button>
          </a>
        </li>
        <li className="about-me__project-button-item">
          <a href="https://mesto.students.nomoredomains.work/" target="_blank" rel="noreferrer">
            <button className="about-me__project-button" type="button">Одностраничное приложение</button>
          </a>
        </li>
      </ul>
    </Section>
  );
}

export default AboutMe;
