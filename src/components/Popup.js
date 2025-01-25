import React from "react";

function Popup({ name, isOpen, onClose, children }) {
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
        {children}
      </div>
    </section>
  );
}

export default Popup;
