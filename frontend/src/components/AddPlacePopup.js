import { React, useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { content } from "../utils/content";
import { LangContext } from "../contexts/LangContext";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [lang] = useContext(LangContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeLink(event) {
    setLink(event.target.value);
  }

  // Dynamic button
  const initialText = content[lang]["SaveButton"];
  const [buttonText, setButtonText] = useState(initialText);

  function handleClick() {
    setButtonText(content[lang]["SavingButton"]);

    setTimeout(() => {
      setButtonText(initialText);
    }, 1000); // 👈️ change text back after 1 second
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleClick();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
    setButtonText(initialText);
  }, [isOpen, initialText]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
      name="add"
      title={content[lang]["NewPlaceNewCardForm"]}
      buttonName="Сохранить"
    >
      <label className="form__field">
        <input
          onChange={onChangeName}
          type="text"
          id="input-card"
          name="card"
          value={name}
          placeholder={content[lang]["NewPlaceCaption"]}
          className="form__input form__input_type_card-name"
          required
        />
        <span id="input-card-error" className="error"></span>
      </label>
      <label className="form__field">
        <input
          onChange={onChangeLink}
          type="url"
          id="input-link"
          name="link"
          value={link}
          placeholder={content[lang]["NewLink"]}
          className="form__input form__input_type_card-link"
          required
        />
        <span id="input-link-error" className="error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
