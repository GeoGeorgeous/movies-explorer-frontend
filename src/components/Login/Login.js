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
      <>
        <label htmlFor="email" className="spf__label">
          E-mail
          <input
            type="email"
            className="spf__input"
            placeholder="email@yandex.com"
            id="email"
            required
          />
        </label>

        <label htmlFor="password" className="spf__label">
          Пароль
          <input
            type="password"
            className="spf__input"
            id="password"
            autoComplete="on"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            required
            minLength="4"
          />
        </label>
      </>
    </SinglePageForm>
  );
}

export default Login;
