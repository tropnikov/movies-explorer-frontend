import React from 'react';
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = () => {
  return (
    <section className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
    </section>
  );
};

export default SavedMovies;
