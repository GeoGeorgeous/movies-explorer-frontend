import React from 'react';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <>
      <Header
        loggedIn={false}
      />
      <Hero />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </>
  );
}

export default Main;
