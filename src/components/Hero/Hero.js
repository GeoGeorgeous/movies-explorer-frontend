import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__banner">
        <h1 className="hero__banner-header">Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab />
      </div>
    </section>
  );
}

export default Hero;
