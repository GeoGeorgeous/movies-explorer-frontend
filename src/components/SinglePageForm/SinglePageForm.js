/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import './SinglePageForm.css';
import PropTypes from 'prop-types';
import logo from '../../images/logo-sm.svg'

function SinglePageForm(props) {
  const {
    header, buttonText, hintText, hintLinkText, hintLinkUrl, children
  } = props;
  SinglePageForm.propTypes = {
    header: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    hintText: PropTypes.string.isRequired,
    hintLinkText: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    hintLinkUrl: PropTypes.string.isRequired,
  };

  return (
    <div className="spf">
      <img className="spf__logo" src={logo}/>
      <h1 className="spf__header">{header}</h1>
      <form className="spf__form">
        {children}
      </form>
      <button
        className="spf__button"
        type="submit">{buttonText}</button>
      <p className="spf__hint">{hintText} <Link to={hintLinkUrl} className="spf__hint-link">{hintLinkText}</Link></p>
    </div>
  );
}

export default SinglePageForm;
