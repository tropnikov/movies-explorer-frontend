import React, { useState, useEffect } from 'react';
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import mainApi from '../../utils/MainApi';
import './SavedMovies.css';

const SavedMovies = ({ movies, setSavedMovies }) => {
  const [search, setSearch] = useState({ query: '', isShort: false });
  const [searchedMovies, setSearchedMovies] = useState(movies);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('savedMovies')) {
      setSearchedMovies(JSON.parse(localStorage.getItem('savedMovies')));
    }
  }, []);

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const filteredMovies = movies.filter((item) => item._id !== movieId);
        setSavedMovies(filteredMovies);
        localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
      })
      .catch((err) => console.log(err));
  };
  // const searchProp = { query: '', isShort: false };

  const filterMovies = (search) => {
    if (search.query.length !== 0) {
      const filteredMovies = movies.filter((item) => {
        return (
          (item?.nameRU
            ?.toLowerCase()
            .includes(search?.query?.toLowerCase().trim()) ||
            item?.nameEN
              ?.toLowerCase()
              .includes(search?.query?.toLowerCase().trim())) &&
          (search.isShort ? item.duration <= 40 : true)
        );
      });
      setSearchedMovies(filteredMovies);
      setSearch(search);

      // localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
      if (filteredMovies.length === 0) {
        setError('Ничего не найдено');
      } else setError('');
      console.log(filteredMovies);
    }
  };

  return (
    <section className="saved-movies">
      <SearchForm searchProp={search} handleSearch={filterMovies} />
      {error && <p className="saved-movies__error">{error}</p>}
      <MoviesCardList
        movies={searchedMovies}
        savedMovies={searchedMovies}
        onDeleteMovie={handleDeleteMovie}
      />
    </section>
  );
};

export default SavedMovies;
