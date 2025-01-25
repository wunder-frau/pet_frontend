class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._options.url}/cards`, {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._options.url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  editProfileInfo(profileDict) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(profileDict),
      method: "PATCH",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return fetch(`${this._options.url}/users/me`, newOptions).then(
      this._checkResponse
    );
  }

  editProfileAvatar(avatarLink) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(avatarLink),
      method: "PATCH",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return fetch(`${this._options.url}/users/me/avatar`, newOptions).then(
      this._checkResponse
    );
  }

  saveCard(cardDict) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(cardDict),
      method: "POST",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return fetch(`${this._options.url}/cards`, newOptions).then(
      this._checkResponse
    );
  }

  removeCard(cardId) {
    const newOptions = {
      ...this._options,
      method: "DELETE",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return fetch(`${this._options.url}/cards/${cardId}`, newOptions).then(
      this._checkResponse
    );
  }

  changeLikeCardStatus(cardId, isLiked) {
    const putOptions = {
      ...this._options,
      method: "PUT",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const delOptions = {
      ...this._options,
      method: "DELETE",
      credentials: "include",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    return fetch(
      `${this._options.url}/cards/${cardId}/likes`,
      isLiked ? delOptions : putOptions
    ).then(this._checkResponse);
  }
}

const apiInstance = new Api({
  url: "http://iresta.rest",
});

//"http://localhost:4000",
export default apiInstance;
