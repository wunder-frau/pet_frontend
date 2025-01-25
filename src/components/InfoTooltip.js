import { React, useContext } from "react";
import Popup from "./Popup";
import imageSuccess from "../images/ok.jpg";
import imageFail from "../images/cross.jpg";
import { content } from "../utils/content";
import { LangContext } from "../contexts/LangContext";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const [lang] = useContext(LangContext);

  return (
    <Popup isOpen={isOpen} onClose={onClose} name="message">
      <img
        className="popup__element-image"
        src={isSuccess ? imageSuccess : imageFail}
        alt="эмоди"
      />
      <p className="popup__element-text">
        {isSuccess
          ? content[lang]["SuccessSignUp"]
          : content[lang]["LoginError"]}
      </p>
    </Popup>
  );
}

export default InfoTooltip;
