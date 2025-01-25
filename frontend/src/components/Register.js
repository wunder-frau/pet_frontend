import { useState, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import React from "react";
import ScreenWithForm from "./ScreenWithForm";
import { content } from "../utils/content";
import { LangContext } from "../contexts/LangContext";

function Register({ onRegister }) {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [lang] = useContext(LangContext);

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = inputs;
    onRegister(email, password);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const registerTitle = (
    <p className="form-auth__line">
      {content[lang]["AlreadySignedUpCaption"]}
      <Link className="form-auth__link" to="/sign-in">
        {content[lang]["SignInButton"]}
      </Link>
    </p>
  );

  return (
    <ScreenWithForm
      handleSubmit={handleSubmit}
      buttonText={content[lang]["SignUpButton"]}
      title={content[lang]["SignUp"]}
      lineLink={registerTitle}
    >
      <label className="form__field">
        <input
          className="form-auth__input"
          type="email"
          id="login-email"
          aria-label="электронная почта"
          placeholder="Email"
          name="email"
          required
          maxLength="30"
          value={inputs.email}
          onChange={handleChange}
        />
        <span id="input-avatar-link-error" className="error"></span>
      </label>
      <label className="form__field">
        <input
          className="form-auth__input"
          type="password"
          id="login-password"
          aria-label="пароль"
          placeholder={content[lang]["Password"]}
          name="password"
          required
          value={inputs.password}
          onChange={handleChange}
        />
        <span id="input-avatar-link-error" className="error"></span>
      </label>
    </ScreenWithForm>
  );
}

export default withRouter(Register);
