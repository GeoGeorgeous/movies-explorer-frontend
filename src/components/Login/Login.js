/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import '../SinglePageForm/SinglePageForm.css';
import SinglePageForm from '../SinglePageForm/SinglePageForm';

function Login() {
  return (
    <SinglePageForm
      header="Рады видеть!"
      buttonText="Войти"
      hintText="Ещё не зарегистрированы?"
      hintLinkText="Регистрация"
      hintLinkUrl="/signup"
    >
      <label htmlFor="email" className="spf__label">
        E-mail
        <input
          type="email"
          className="spf__input"
          placeholder="vitaly@email.com"
          id="email"
        />
      </label>

      <label htmlFor="password" className="spf__label">
        Пароль
        <input
          type="password"
          className="spf__input"
          id="password"
          placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
        />
      </label>

    </SinglePageForm>
  );
}

export default Login;
