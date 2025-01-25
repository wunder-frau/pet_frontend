import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <section className={card.isOpened ? `popup popup_type_image popup_opend` : `popup opup_type_image`}>
      <div className="image-container">
        <button type="button" className="popup__close image-container__close" onClick={onClose}>&times;</button>
        <img src={card.link}
         alt={card.name} 
         className="image-container__image"/>
        <h2 className="image-container__title">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;