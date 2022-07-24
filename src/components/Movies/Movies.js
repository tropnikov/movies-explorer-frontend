import { React, useEffect, useState } from 'react';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = ({ savedMovies, setSavedMovies }) => {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [search, setSearch] = useState({ query: '', isShort: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [extraMovies, setExtraMovies] = useState(null);
  const [limitMovies, setLimitMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [isShowMoreButtonShown, setIsShowMoreButtonShown] = useState(false);

  const searchMovies = (req) => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setSearch(req);
    localStorage.setItem('search', JSON.stringify(req));
  };

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

  const handleSaveMovie = (movie, userId) => {
    mainApi
      .saveMovie(movie, userId)
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
    if (movies.length) {
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
      localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
      if (filteredMovies.length === 0) {
        setError('Ничего не найдено');
      } else setError('');
    }
  }, [movies, search.query]);

  useEffect(() => {
    if (localStorage.getItem('searchedMovies')) {
      setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
    }
    if (localStorage.getItem('search')) {
      setSearch(JSON.parse(localStorage.getItem('search')));
    }
  }, []);

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
    if (shownMovies.length < searchedMovies.length) {
      setIsShowMoreButtonShown(true);
    } else setIsShowMoreButtonShown(false);
  }, [limitMovies, searchedMovies, isShowMoreButtonShown]);

  const handleShowMore = () => {
    setLimitMovies((prevValue) => (prevValue += extraMovies));
  };

  return (
    <section className="movies">
      <SearchForm handleSearch={searchMovies} searchProp={search} />
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
