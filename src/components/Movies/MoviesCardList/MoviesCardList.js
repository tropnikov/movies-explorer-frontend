import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  movies,
  isShowMoreButtonShown = false,
  handleShowMoreButton = () => null,
  onDeleteMovie,
  onSaveMovie = () => null,
  savedMovies,
}) => {
  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        {movies.map((item) => (
          <MovieCard
            movie={item}
            key={item.id || item.movieId}
            onDelete={onDeleteMovie}
            onSave={onSaveMovie}
            savedMovies={savedMovies}
          />
        ))}
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
