import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardConfirmationPopup({isOpen, onClose, card, onDeleteConfirm, closePopupByOverlayClick, buttonText}) {

  function handleSubmit(event) {
    event.preventDefault();
    onDeleteConfirm(card);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      closePopupByOverlayClick={closePopupByOverlayClick}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
      name="delete"
      title="Вы уверены?"
      buttonName="Да"
    />
  )
}

export default DeleteCardConfirmationPopup;