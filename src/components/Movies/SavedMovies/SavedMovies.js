import React, { useState } from 'react';
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import mainApi from '../../../utils/MainApi';
import './SavedMovies.css';
import filterMovies from '../../../utils/filterMovies';

const SavedMovies = ({ movies, setSavedMovies }) => {
  const [search, setSearch] = useState({ query: '', isShort: false });
  // const [searchedMovies, setSearchedMovies] = useState(movies);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   if (localStorage.getItem('savedMovies')) {
  //     setSearchedMovies(JSON.parse(localStorage.getItem('savedMovies')));
  //   }
  // }, [movies]);

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = movies.filter((item) => item._id !== movieId);
        const newFilteredMovies = filteredMovies.filter(
          (item) => item._id !== movieId
        );
        setSavedMovies(newSavedMovies);
        setFilteredMovies(newFilteredMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => console.log(err));
  };
  // const searchProp = { query: '', isShort: false };

  const searchInSavedMovies = (search) => {
    if (movies.length && search.query.length !== 0) {
      const filteredMovies = filterMovies(movies, search);
      //   movies.filter((item) => {
      //   return (
      //     (item?.nameRU
      //       ?.toLowerCase()
      //       .includes(search?.query?.toLowerCase().trim()) ||
      //       item?.nameEN
      //         ?.toLowerCase()
      //         .includes(search?.query?.toLowerCase().trim())) &&
      //     (search.isShort ? item.duration <= 40 : true)
      //   );
      // });
      setFilteredMovies(filteredMovies);
      // localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
      if (filteredMovies.length === 0) {
        setError('Ничего не найдено');
      } else setError('');
    }
    // const filteredMovies = movies.filter((item) => {
    //   return (
    //     (item?.nameRU
    //       ?.toLowerCase()
    //       .includes(search?.query?.toLowerCase().trim()) ||
    //       item?.nameEN
    //         ?.toLowerCase()
    //         .includes(search?.query?.toLowerCase().trim())) &&
    //     (search.isShort ? item.duration <= 40 : true)
    //   );
    // });
    // setSearchedMovies(filteredMovies);
    setSearch(search);

    // localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
    // if (filteredMovies.length === 0) {
    //   setError('Ничего не найдено');
    // } else setError('');
    // console.log(filteredMovies);
  };

  return (
    <section className="saved-movies">
      <SearchForm
        search={search}
        handleSearch={searchInSavedMovies}
        setSearch={setSearch}
      />
      {error && <p className="saved-movies__error">{error}</p>}
      <MoviesCardList
        movies={filteredMovies}
        savedMovies={filteredMovies}
        onDeleteMovie={handleDeleteMovie}
      />
    </section>
  );
};
export default SavedMovies;
