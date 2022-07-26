const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
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

  getMovies() {
    return fetch(this.#baseUrl, {
      method: 'GET',
      headers: this.#headers,
    }).then(this.#handleResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
