import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = isOwn
    ? "element__delete element__delete_visible"
    : "element__delete";

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = isLiked
    ? "element__like element__like_active"
    : "element__like";

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__text-box">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
