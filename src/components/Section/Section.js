import React from 'react';
import PropTypes from 'prop-types';
import './Section.css';

function Section(props) {
  const { title, children } = props;
  Section.propTypes = {
    title: PropTypes.string.isRequired,
    light: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
  };

  return (
    // <section className={`section ${light ? 'section__light' : ''}`}>
    <section className="section section__light">
      <h2 className="section__header">{title}</h2>
      <hr className="section__line" />
      {children}
    </section>
  );
}

export default Section;
