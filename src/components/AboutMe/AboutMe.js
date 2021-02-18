/* eslint-disable */
import React from 'react';
import Section from '../Section/Section';
import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <Section title="Студент">
      <div className="about-me__container">
        <div className="about-me__author">
          <h3 className="about-me__header">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
            и ушёл с постоянной работы.
          </p>
        </div>
        <img className="about-me__avatar" src={avatar} />
      </div>
    </Section>
  );
}

export default AboutMe;
