/* eslint-disable */
import React from 'react';
import Header from '../Header/Header';
import '../Profile/Profile.css';

function Profile() {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');

  return (
    <>
    <Header />
    <div className="profile">
      <h1 className="profile__header">Привет, Виталий!</h1>
      <form className="profile__form">
        <label className="profile__label" for="name">Имя</label>
        <input
        className="profile__input"
        type="text" id="name"
        value={name}
        onChange={(e) => {setName(e.target.value)}}
        />
        <hr className="profile__divider" />
        <label className="profile__label" for="email">Почта</label>
        <input
          className="profile__input"
          type="text" id="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
      </form>
      <div className="profile__buttons">
      <button className="profile__edit-button" type="submit">Редактировать</button>
      <button className="profile__signout-button" type="button">Выйти из аккаунта</button>
      </div>
    </div>
    </>
  );
}

export default Profile;
