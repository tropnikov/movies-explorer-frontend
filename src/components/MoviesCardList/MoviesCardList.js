import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        <MovieCard />
        <MovieCard />
        {/* <MovieCard />
        <MovieCard />
        <MovieCard /> */}
        {/* <MovieCard />
        <MovieCard />
        <MovieCard /> */}
        {/* <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard /> */}
      </ul>
    </section>
  );
};

export default MoviesCardList;
