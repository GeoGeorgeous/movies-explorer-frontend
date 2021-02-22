/* eslint-disable */
import React from 'react';
import '../SinglePageForm/SinglePageForm.css'
import SinglePageForm from '../SinglePageForm/SinglePageForm'

function Register() {
  return (
    <SinglePageForm
    header="Добро пожаловать!"
    buttonText="Зарегистрироваться"
    hintText="Уже зарегистрированы?"
    hintLinkText="Войти"
    >
      <label for="name" className="spf__label">Имя</label>
      <input
      type="text"
      className="spf__input"
      placeholder="Виталий"
      id="name"/>

      <label for="email" className="spf__label">E-mail</label>
      <input
      type="email"
      className="spf__input"
      placeholder="vitaly@email.com"
      id="email"/>

      <label for="password" className="spf__label">Пароль</label>
      <input
      type="password"
      className="spf__input"
      placeholder="vitaliy@yandex.com"
      id="password"
      placeholder="" />

    </SinglePageForm>
  );
}

export default Register;
