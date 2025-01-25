import { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import React from "react";
import ScreenWithForm from "./ScreenWithForm";
import { content } from "../utils/content";
import { LangContext } from "../contexts/LangContext";

function Login({ onLogin }) {
  const [lang] = useContext(LangContext);

  const [inputs, setInputs] = useState({ email: "", password: "" });

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = inputs;

    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  return (
    <div>
      <ScreenWithForm
        handleSubmit={handleSubmit}
        buttonText={content[lang]["SignInButton"]}
        title={content[lang]["SignIn"]}
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
    </div>
  );
}

export default withRouter(Login);
