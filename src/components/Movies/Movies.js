import { React, useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

const Movies = () => {
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
  };

  // effects
  useEffect(() => {
    if (movies.length) {
      const filteredMovies = movies.filter((item) => {
        return (
          item?.nameRU?.toLowerCase().includes(search?.query?.toLowerCase()) ||
          item?.nameEN?.toLowerCase().includes(search?.query?.toLowerCase())
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
        console.log('In switch extraMovies:', extraMovies);
        console.log(' In switch limitMovies:', limitMovies);
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
    console.log('screenWidth:', screenWidth);
    console.log('limitMovies:', limitMovies);
  }, [screenWidth]);

  useEffect(() => {
    setShownMovies(searchedMovies.slice(0, limitMovies));
    if (shownMovies.length < searchedMovies.length) {
      setIsShowMoreButtonShown(true);
    } else setIsShowMoreButtonShown(false);
    console.log('shownMovies:', shownMovies);
  }, [limitMovies, searchedMovies]);

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
          />
        </>
      )}
    </section>
  );
};

export default Movies;
