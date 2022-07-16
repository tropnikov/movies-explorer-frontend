import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      <button className="movies-list__more-button link">Ещё</button>
    </main>
  );
};

export default Movies;
