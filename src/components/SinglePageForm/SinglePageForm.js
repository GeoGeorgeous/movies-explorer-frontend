import React from 'react';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './SinglePageForm.css';
import PropTypes from 'prop-types';
import logo from '../../images/logo-sm.svg';

function SinglePageForm(props) {
  const [progress, setProgress] = React.useState(0);
  const [progressColor, setProgressColor] = React.useState('#979797');

  const {
    header, buttonText, hintText, hintLinkText, hintLinkUrl, children,
  } = props;
  SinglePageForm.propTypes = {
    header: PropTypes.string.isRequired, // Заголовок формы
    buttonText: PropTypes.string.isRequired, // Текст кнопка действия
    hintText: PropTypes.string.isRequired, // Текст подсказки (совета залогиниться или регистрации)
    hintLinkText: PropTypes.string.isRequired, // Текст ссылки в подсказке (вход / регистрация)
    children: PropTypes.element.isRequired, // Дочерние импуты формы
    hintLinkUrl: PropTypes.string.isRequired, // Адрес ссылки в подсказке
  };

  /* Симуляция нажатия на отправку формы для проверки статус бара */
  function handleProgress(success) {
    if (success === true) {
      setProgressColor('#3DDC84');
      setProgress(progress + 100);
    } else {
      setProgressColor('#EE3465');
      setProgress(progress + 100);
    }
  }
  /* Симуляция нажатия на отправку формы для проверки статус бара */
  function handleSubmit(event) {
    event.preventDefault();
    setProgress(10);
    setTimeout(() => {
      handleProgress(false);
    }, 1000);
  }

  return (
    <>
      <LoadingBar
        color={progressColor}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="spf">
        <Link className="spf__logo-link" to="/"><img className="spf__logo" src={logo} alt="Логотип Movies Explorer" /></Link>
        <h1 className="spf__header">{header}</h1>
        <form className="spf__form" id="spf" onSubmit={handleSubmit}>
          {children}
        </form>
        <button
          form="spf"
          className="spf__button"
          type="submit"
        >
          {buttonText}
        </button>
        <p className="spf__hint">
          {hintText}
          {' '}
          <Link to={hintLinkUrl} className="spf__hint-link">{hintLinkText}</Link>
        </p>
      </div>
    </>
  );
}

export default SinglePageForm;
