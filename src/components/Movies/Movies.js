import { React, useEffect, useState } from 'react';

import mainApi from '../../utils/MainApi';
import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import SearchForm from './SearchForm/SearchForm';

const Movies = ({
  searchMovies,
  savedMovies,
  setSavedMovies,
  isLoading,
  searchedMovies,
  search,
  setSearch,
  error,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [extraMovies, setExtraMovies] = useState(null);
  const [limitMovies, setLimitMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [isShowMoreButtonShown, setIsShowMoreButtonShown] = useState(false);

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const filteredMovies = savedMovies.filter(
          (item) => item._id !== movieId
        );
        setSavedMovies(filteredMovies);
        localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
      })
      .catch((err) => console.log(err));
  };

  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        const newSavedMovies = [...savedMovies, res];
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // effects
  useEffect(() => {
    const resizeHandler = () => {
      setTimeout(() => setScreenWidth(window.innerWidth), 500);
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    switch (true) {
      case screenWidth > 1024:
        setExtraMovies(4);
        setLimitMovies(12);
        break;
      case screenWidth > 768:
        setExtraMovies(3);
        setLimitMovies(12);
        break;
      case screenWidth > 475:
        setExtraMovies(2);
        setLimitMovies(8);
        break;
      default:
        setExtraMovies(2);
        setLimitMovies(5);
        break;
    }
  }, [screenWidth, searchedMovies]);

  useEffect(() => {
    const newShownMovies = searchedMovies.slice(0, limitMovies);
    setShownMovies(newShownMovies);
    if (newShownMovies.length < searchedMovies.length) {
      setIsShowMoreButtonShown(true);
    } else setIsShowMoreButtonShown(false);
  }, [limitMovies, searchedMovies]);

  const handleShowMore = () => {
    setLimitMovies((prevValue) => (prevValue += extraMovies));
  };

  return (
    <section className="movies">
      <SearchForm
        handleSearch={searchMovies}
        search={search}
        setSearch={setSearch}
      />
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <p className="movies__error">{error}</p>
      ) : (
        <>
          <MoviesCardList
            movies={shownMovies}
            handleShowMoreButton={handleShowMore}
            isShowMoreButtonShown={isShowMoreButtonShown}
            onDeleteMovie={handleDeleteMovie}
            onSaveMovie={handleSaveMovie}
            savedMovies={savedMovies}
          />
        </>
      )}
    </section>
  );
};

export default Movies;
