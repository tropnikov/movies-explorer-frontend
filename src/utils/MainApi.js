const BASE_URL = 'https://api.tma-beatfilms.nomoreparties.sbs';

class MainApi {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  #handleResponse = (response) => {
    // console.log(response);
    // response.json();
    return response.ok
      ? response.json()
      : Promise.reject(
          `Ошибка: ${response.status}
          ${response.statusText}`
        );
  };

  register({ name, email, password }) {
    return fetch(this.#baseUrl + '/signup', {
      method: 'POST',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this.#handleResponse);
    // })
    // .then((res) => {
    // console.log(res.json());
    // res.json();
    // })
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));

    // .catch((err) => console.log(err));
  }

  login({ email, password }) {
    return fetch(this.#baseUrl + '/signin', {
      method: 'POST',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify({ email, password }),
    }).then(this.#handleResponse);
  }

  logout() {
    return fetch(this.#baseUrl + 'signout', {
      method: 'POST',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  getProfile() {
    return fetch(this.#baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  updateProfile({ name, email }) {
    return fetch(this.#baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify({ name, email }),
    }).then(this.#handleResponse);
  }

  getSavedMovies() {
    return fetch(this.#baseUrl + '/movies', {
      method: 'GET',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }

  saveMovie(movie, userId) {
    return fetch(this.#baseUrl + '/movies', {
      method: 'POST',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify({
        country: movie.country || ' ',
        director: movie.director || ' ',
        duration: movie.duration || 0,
        year: movie.year || ' ',
        description: movie.description || ' ',
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail:
          'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU || ' ',
        nameEN: movie.nameEN || ' ',
        owner: userId,
      }),
    }).then(this.#handleResponse);
  }

  deleteMovie(movieId) {
    return fetch(this.#baseUrl + `/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default mainApi;
