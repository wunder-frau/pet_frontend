import { React, useRef, useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { content } from "../utils/content";
import { LangContext } from "../contexts/LangContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [lang] = useContext(LangContext);
  const avatarRef = useRef(null);

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
    setButtonText(initialText);
  }, [isOpen, initialText]);

  function handleSubmit(event) {
    handleClick();
    event.preventDefault();
    const avatar = avatarRef.current.value;
    onUpdateAvatar({
      avatar,
    });
    event.target.reset();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      buttonText={buttonText}
      name="edit-avatar"
      title={content[lang]["EditAvatar"]}
      buttonName="Сохранить"
    >
      <label className="form__field">
        <input
          type="url"
          id="input-avatar-link"
          ref={avatarRef}
          name="link"
          placeholder={content[lang]["NewLink"]}
          className="form__input form__input_type_avatar-link"
          required
        />
        <span id="input-avatar-link-error" className="error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
