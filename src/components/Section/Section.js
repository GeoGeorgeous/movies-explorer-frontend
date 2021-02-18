/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './Section.css';

function Section(props) {
  const { title, children, theme} = props;
  Section.propTypes = {
    title: PropTypes.string.isRequired,
    theme: PropTypes.string,
    children: PropTypes.element.isRequired,
  };
  let sectionClass = 'section';
  theme ? sectionClass += ` section__theme_${theme}` : '';

  return (
    <section className={sectionClass}>
      <h2 className="section__header">{title}</h2>
      <hr className="section__line" />
      {children}
    </section>
  );
}

export default Section;
