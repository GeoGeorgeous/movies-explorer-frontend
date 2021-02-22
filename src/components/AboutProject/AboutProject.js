import React from 'react';
import Section from '../Section/Section';
import './AboutProject.css';

function AboutProject() {
  return (
    <Section title="О проекте" light="true" anchor="aboutProject">
      <div className="about-project__grid">
        <div className="about-project__grid-item">
          <h3 className="about-project__header">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__grid-item">
          <h3 className="about-project__header">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__progress___grid">
        <span className="about-project__backend" />
        <span className="about-project__frontend" />
      </div>
    </Section>
  );
}

export default AboutProject;
