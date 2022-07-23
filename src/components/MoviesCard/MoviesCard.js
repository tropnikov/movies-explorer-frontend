import React from 'react';
import './MoviesCard.css';
// import shot from '../../images/movie-pic-sample.jpg';

const MoviesCard = ({ movie }) => {
  const handleMovieCardClick = () => {
    window.open(movie.trailerLink, '_blank');
  };
  return (
    <li className="movie-card" onClick={handleMovieCardClick}>
      <img
        className="movie-card__image"
        alt="Изображение фрагмента из фильма"
        src={'https://api.nomoreparties.co' + movie.image.url}
      />
      <div className="movie-card__content">
        <div className="movie-card__text-wrap">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          <button className="icon movie-card__save link_button"></button>
          {/* <button className="icon movie-card__unsave link_button"></button> */}
          {/* <button className="icon movie-card__delete link_button"></button> */}
        </div>
        <p className="movie-card__subtitle">{movie.duration}</p>
      </div>
    </li>
  );
};

export default MoviesCard;
