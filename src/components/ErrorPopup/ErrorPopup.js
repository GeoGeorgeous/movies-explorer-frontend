/* eslint-disable */
import React from 'react';
import './ErrorPopup.css'

function ErrorPopup() {
  return (
    <>
      <div className="error">
        <h4 className="error__header">Ой, что-то пошло не так!</h4>
        <span className="error__message">Не удалось получить ответ от сервера. Попробуйте повторить запрос позднее.</span>
      </div>
    </>
  );
}

export default ErrorPopup;
