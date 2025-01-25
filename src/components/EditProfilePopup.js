import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { content } from "../utils/content";
import { LangContext } from "../contexts/LangContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  closePopupByOverlayClick,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const [lang] = useContext(LangContext);

  // Dynamic button
  const initialText = content[lang]["SaveButton"];
  const [buttonText, setButtonText] = useState(initialText);

  function handleClick() {
    setButtonText(content[lang]["SavingButton"]);

    setTimeout(() => {
      setButtonText(initialText);
    }, 1000); // 👈️ change text back after 1 second
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setButtonText(initialText);
  }, [currentUser, isOpen, initialText]);

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleClick();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      closePopupByOverlayClick={closePopupByOverlayClick}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
      name="edit"
      title={content[lang]["EditProfileEditForm"]}
      buttonName="save"
    >
      <label className="form__field">
        <input
          onChange={onChangeName}
          type="text"
          id="input-name"
          name="name"
          placeholder={content[lang]["NameEditForm"]}
          value={name || ""}
          className="form__input"
          required
        />
        <span id="input-name-error" className="error"></span>
      </label>
      <label className="form__field">
        <input
          onChange={onChangeDescription}
          type="text"
          id="input-about"
          name="about"
          placeholder={content[lang]["AboutEditForm"]}
          value={description || ""}
          className="form__input"
          required
        />
        <span id="input-about-error" className="error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
