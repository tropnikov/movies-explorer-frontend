import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movies,
  isShowMoreButtonShown,
  handleShowMoreButton,
}) => {
  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        {movies.map((item) => (
          <MovieCard movie={item} key={item.id} />
        ))}
        {/* <MovieCard /> */}
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
      {isShowMoreButtonShown && (
        <button
          className="movies-list__more-button link_button"
          onClick={handleShowMoreButton}
        >
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
