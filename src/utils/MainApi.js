import { serverUrl } from './utils.js';

// eslint-disable-next-line
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://api.tma.nomoredomains.work';

const handleResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`, response);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
};

// export const checkTokenValidity = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(handleResponse);
// };

class Api {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  #handleResponse = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  };

  getInitialCards() {
    return fetch(this.#baseUrl + '/cards', {
      method: 'GET',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  getUserData() {
    return fetch(this.#baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  saveUserData(inputData) {
    return fetch(this.#baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify(inputData),
    }).then(this.#handleResponse);
  }

  addNewCard(cardData) {
    return fetch(this.#baseUrl + '/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify(cardData),
    }).then(this.#handleResponse);
  }

  deleteCard(cardId) {
    return fetch(this.#baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(this.#baseUrl + `/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  likeCard(cardId) {
    return fetch(this.#baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  dislikeCard(cardId) {
    return fetch(this.#baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  updateAvatar(inputLink) {
    return fetch(this.#baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify(inputLink),
    }).then(this.#handleResponse);
  }
}

const api = new Api({
  baseUrl: serverUrl,
  headers: {
    // authorization: token,
    'Content-Type': 'application/json',
  },
});

export default api;
