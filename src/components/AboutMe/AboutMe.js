import React from 'react';
import Section from '../Section/Section';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';
import avatar from '../../images/avatar.png';

function AboutMe() {
  return (
    <Section
      title="Студент"
      anchor="aboutMe"
    >
      <>
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
        <Portfolio />
      </>
    </Section>
  );
}

export default AboutMe;
