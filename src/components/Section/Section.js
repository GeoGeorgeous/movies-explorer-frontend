/* eslint-disable react/require-default-props */
import React from 'react';
import './Section.css';
import PropTypes from 'prop-types';

function Section(props) {
  const {
    title, children, theme, anchor,
  } = props;
  Section.propTypes = {
    title: PropTypes.string.isRequired,
    theme: PropTypes.string,
    anchor: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
  };
  let sectionClass = 'section';
  if (theme) {
    sectionClass += ` section__theme_${theme}`;
  }

  return (
    <section className={sectionClass} id={anchor}>
      <h2 className="section__header">{title}</h2>
      <hr className="section__divider" />
      {children}
    </section>
  );
}

export default Section;
