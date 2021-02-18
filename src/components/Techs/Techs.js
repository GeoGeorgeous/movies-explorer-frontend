import React from 'react';
import Section from '../Section/Section';
import './Techs.css';

function AboutProject() {
  return (
    <Section title="Технологии" theme="light">
      <div className="techs__container">
        <h3 className="techs__header">7 технологий</h3>
        <p className="techs__subheader">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__icons">
          <li className="techs__icon">HTML</li>
          <li className="techs__icon">CSS</li>
          <li className="techs__icon">JS</li>
          <li className="techs__icon">React</li>
          <li className="techs__icon">Git</li>
          <li className="techs__icon">Express.js</li>
          <li className="techs__icon">mongoDB</li>
        </ul>
      </div>
    </Section>
  );
}

export default AboutProject;
