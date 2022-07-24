import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import './MoviesCard.css';
// import shot from '../../images/movie-pic-sample.jpg';

const MoviesCard = ({ movie, savedMovies, onDelete, onSave }) => {
  let location = useLocation();
  const [saved, setSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const { _id } = useContext(CurrentUserContext);

  useEffect(() => {
    const isSaved = savedMovies.find((item) => item.movieId === movie.id);
    setSaved(isSaved);
  }, [movie, savedMovies]);

  const handleMovieCardClick = () => {
    window.open(movie.trailerLink, '_blank');
  };

  const handleSaveDeleteAction = (evt) => {
    evt.stopPropagation();
    if (saved) {
      const { _id } = savedMovies.find((item) => item.movieId === movie.id);
      onDelete(_id);
    } else {
      onSave(movie, _id);
      setSaved(true);
    }
  };

  const handleDelete = (evt) => {
    evt.stopPropagation();
    const { _id } = movie;
    onDelete(_id);
  };

  useEffect(() => {
    const src =
      location.pathname === '/saved-movies'
        ? movie.image
        : movie?.image?.url.includes('https://api.nomoreparties.co')
        ? movie.image
        : 'https://api.nomoreparties.co' + movie.image.url;
    setImgSrc(src);
  }, [movie]);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const min = duration % 60;
    return hours ? `${hours}ч ${min}м` : `${min}м`;
  };

  return (
    <li className="movie-card" onClick={handleMovieCardClick}>
      <img className="movie-card__image" alt={movie.nameRU} src={imgSrc} />
      <div className="movie-card__content">
        <div className="movie-card__text-wrap">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          {location.pathname === '/movies' && (
            <button
              className={
                saved
                  ? 'icon movie-card__unsave link_button'
                  : 'icon movie-card__save link_button'
              }
              onClick={handleSaveDeleteAction}
            ></button>
          )}
          {location.pathname === '/saved-movies' && (
            <button
              className="icon movie-card__delete link_button"
              onClick={handleDelete}
            ></button>
          )}

          {/* <button
            className={
              saved
                ? 'icon movie-card__unsave link_button'
                : 'icon movie-card__save link_button'
            }
            onClick={handleSaveDeleteAction}
          ></button> */}
          {/* <button className="icon movie-card__unsave link_button"></button> */}
          {/* <button className="icon movie-card__delete link_button"></button> */}
        </div>
        <p className="movie-card__subtitle">{formatDuration(movie.duration)}</p>
      </div>
    </li>
  );
};

export default MoviesCard;
