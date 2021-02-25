import React from 'react';
import '../SinglePageForm/SinglePageForm.css';
import SinglePageForm from '../SinglePageForm/SinglePageForm';

function Register() {
  return (
    <SinglePageForm
      header="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      hintText="Уже зарегистрированы?"
      hintLinkText="Войти"
      hintLinkUrl="/signin"
    >
      <label htmlFor="name" className="spf__label">
        Имя
        <input
          type="text"
          className="spf__input"
          placeholder="Виталий"
          id="name"
        />
      </label>

      <label htmlFor="email" className="spf__label">
        E-mail
        <input
          type="email"
          className="spf__input"
          placeholder="email@yandex.com"
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

export default Register;
