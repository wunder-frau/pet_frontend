import React from "react";

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  handleSubmit,
  buttonText,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opend" : ""}`}
    >
      <div className="popup__modal">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <form className={`form form_${name}`} onSubmit={handleSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className={`form__submit form__submit_${name}`}>
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
