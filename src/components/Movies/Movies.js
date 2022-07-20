import { React, useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchMovies = (req) => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setQuery(req);
  };

  useEffect(() => {
    const filteredMovies = movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(query.toLowerCase());
    });
    setSearchedMovies(filteredMovies);
  }, [movies, query]);

  return (
    <main className="movies">
      <SearchForm handleSearch={searchMovies} />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList movies={searchedMovies} />
        </>
      )}
    </main>
  );
};

export default Movies;
