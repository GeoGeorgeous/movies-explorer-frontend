import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main(props) {
  const { isLoggedIn } = props;
  Main.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired, // Заголовок формы
  };
  return (
    <>
      <Header
        loggedIn={isLoggedIn}
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
