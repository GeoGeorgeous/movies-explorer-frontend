import React from 'react';
import Section from '../Section/Section';
import './AboutProject.css';

function AboutProject() {
  return (
    <Section title="О проекте" light="true">
      <div className="about-project__grid">
        <div className="about-project__grid-item">
          <h3 className="about-project__header">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__grid-item">
          <h3 className="about-project__header">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__progress">
          <div className="progress-bar progress-bar__green">1 неделя</div>
          <div className="progress-bar progress-bar__grey">4 недели</div>
          <p className="progress-bar progress-bar__subtitle_small">Back-end</p>
          <p className="progress-bar progress-bar__subtitle_large">Front-end</p>
        </div>

      </div>
    </Section>
  );
}

export default AboutProject;
