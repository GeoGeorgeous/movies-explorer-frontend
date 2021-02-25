import React from 'react';
import Header from '../Header/Header';
import './Profile.css';

function Profile() {
  const [name, setName] = React.useState('Виталий');
  const [email, setEmail] = React.useState('pochta@yandex.ru');

  return (
    <>
      <Header />
      <div className="profile">
        <h1 className="profile__header">Привет, Виталий!</h1>
        <form className="profile__form" id="profile">
          <label className="profile__label" htmlFor="name">
            Имя
            <input
              className="profile__input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => { setName(e.target.value); }}
            />
          </label>
          <hr className="profile__divider" />
          <label className="profile__label" htmlFor="email">
            Почта

            <input
              className="profile__input"
              type="text"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </label>
        </form>
        <div className="profile__buttons">
          <button className="profile__button profile__button_type_submit" type="submit" form="profile">Редактировать</button>
          <button className="profile__button profile__button_type_logout" type="button">Выйти из аккаунта</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
