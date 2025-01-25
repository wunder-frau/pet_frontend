import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch, Link } from "react-router-dom";
import { useContext } from "react";
import React from "react";
import { content } from "../utils/content";
import { LangContext } from "../contexts/LangContext";
import LanguageSelector from "./LanguageSelector";

function Header({ onClick, loggedIn }) {
  const [lang] = useContext(LangContext);

  const { email } = useContext(CurrentUserContext);

  return (
    <header className="page__header header">
      <div className="header__link-container">
        <h1 className="header__logo">QuickPic</h1>
        <LanguageSelector />
      </div>
      <div className="header__menu-container">
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__menu-link">
              {content[lang]["SignUp"]}
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__menu-link">
              {content[lang]["SignIn"]}
            </Link>
          </Route>
        </Switch>
      </div>
      {loggedIn && (
        <div className="header__menu-container">
          <p className="header__menu-email">{email}</p>
          <Link to="/sign-in" onClick={onClick} className="header__menu-link">
            {content[lang]["LogOut"]}
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
