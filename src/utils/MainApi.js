/* eslint-disable */
class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _fetchAndCatch(url, payload) {
    const checkStatus = async (response) => {
      if (response.status >= 200 && response.status < 300)
        return await response.json()

      throw await response.json()
    }

    return fetch(url, payload)
      .then(checkStatus)
  }


  signUpUser(formData) {
    return this._fetchAndCatch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
  }

  signInUser(formData) {
    return this._fetchAndCatch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
  }

  getUser(jwt) {
    this._jwt = jwt;
    return this._fetchAndCatch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
  }

  updateUser(newData, jwt) {
    return this._fetchAndCatch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(newData),
    })
  }

  getFavouriteMovies(jwt) {
    return this._fetchAndCatch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
  }

  likeMovie(movie, jwt) {
    return this._fetchAndCatch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        movieId: movie.id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co/uploads${movie.image.url}`,
      }),
    })
  }

  deleteMovieLike(id, jwt) {
    return this._fetchAndCatch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
});

export default mainApi;
