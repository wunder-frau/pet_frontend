import React from 'react';
import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const { name, avatar, about} = useContext(CurrentUserContext);


  return (
    <main className="page__content content">

      <section className="profile">
        <div className="profile__info">
          <div className="profile__container">
            <div className="profile__container-avatar">
              <img src={avatar} alt="аватар" className="profile__avatar" />
              <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
            </div>
            <div className="profile__container-info">
              <h1 className="profile__title">{name}</h1>
              <p className="profile__subtitle">{about}</p>
            </div>
          </div>
          <button type="button" id ="show-popup" className="profile__edit" onClick={onEditProfile}></button>
        </div>
        <button type="button" id ="add-popup" className="profile__add" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {
            cards.map((card) => (
              < Card key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}/>
            )
          ).reverse()
          }
        </ul>
      </section>

    </main>
  );
}

export default Main;