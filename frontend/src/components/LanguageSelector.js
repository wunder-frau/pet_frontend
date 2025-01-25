import React, { useContext } from "react";
import { LangContext } from "../contexts/LangContext";

const LanguageSelector = (props) => {
  const [lang, setLang] = useContext(LangContext);

  const handleChange = (event) => {
    setLang(event.target.value);
    localStorage.setItem("lang", event.target.value);
    document.documentElement.setAttribute("lang", event.target.value);
  };

  return (
    <select
      name="language"
      className="header__link_lang"
      value={lang}
      onChange={handleChange}
    >
      <option value="en">En</option>
      <option value="ru">Ru</option>
    </select>
  );
};
export default LanguageSelector;
