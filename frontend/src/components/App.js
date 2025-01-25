import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LangProvider } from "../contexts/LangContext";
import api from "../utils/api";
import * as auth from "../utils/auth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardConfirmationPopup from "./DeleteCardConfirmationPopup";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [selectedCard, setSelectedCard] = useState({ isOpened: false });
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState("");

  const [isSucceeded, setIsSucceeded] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, token]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteConfirmPopupClick() {
    setIsDeleteConfirmPopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({ isOpened: false });
  }

  useEffect(() => {
    function closePopupByOverlayClick(event) {
      if (event.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }
    document.addEventListener("click", closePopupByOverlayClick);

    return () => {
      document.removeEventListener("click", closePopupByOverlayClick);
    };
  }, []);

  useEffect(() => {
    function closePopupByEsc(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", closePopupByEsc);
    return () => document.removeEventListener("keydown", closePopupByEsc);
  }, []);

  function handleCardClick({ link, name, isOpened }) {
    setSelectedCard({ link, name, isOpened: !isOpened });
  }

  function handleUpdateUser(userInfo) {
    api
      .editProfileInfo(userInfo)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editProfileAvatar(avatar)
      .then(({ data }) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .saveCard(newCard)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((regData) => {
        if (regData) {
          setInfoTooltipOpen(true);
          setIsSucceeded(true);
          setMessage(message);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setIsSucceeded(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз");
        if (err === 400) {
          return console.log("некорректно заполнено одно из полей");
        }
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((authData) => {
        if (authData.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem("token", authData.token);
          history.push("/");
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setIsSucceeded(false);
        setMessage(message);
        if (err === 400) {
          return console.log("не передано одно из полей");
        }
        if (err === 401) {
          return console.log("пользователь с email не найден");
        }
      });
  }

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setEmail(data.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          if (err === 401) {
            return console.log("Токен не передан или передан не в том формате");
          }
        });
    }
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LangProvider>
        <div className="page">
          <div className="page__container">
            <Header email={email} onClick={onSignOut} loggedIn={loggedIn} />

            <Switch>
              <ProtectedRoute
                exact
                path="/"
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onDeleteConfirm={handleDeleteConfirmPopupClick}
                onInfoToolTip={handleInfoTooltipOpen}
              ></ProtectedRoute>
              <Route path="/sign-in">
                <Login onLogin={handleLogin} />
              </Route>

              <Route path="/sign-up">
                <Register onRegister={handleRegister} />
              </Route>

              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>

            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              isSuccess={isSucceeded}
              onClose={closeAllPopups}
            />

            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <DeleteCardConfirmationPopup
              isOpen={isDeleteConfirmPopupOpen}
              onClose={closeAllPopups}
              onDeleteConfirm={handleDeleteConfirmPopupClick}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </div>
        </div>
      </LangProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
