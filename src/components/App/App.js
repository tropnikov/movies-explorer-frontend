import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import Footer from '../Layout/Footer/Footer';
import Header from '../Layout/Header/Header';
import Login from '../Profile/Login/Login';
import Main from '../Main/Main';
import Menu from '../Menu/Menu';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Profile/Register/Register';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import './App.css';
import moviesApi from '../../utils/MoviesApi';
import filterMovies from '../../utils/filterMovies';
import Preloader from '../Movies/Preloader/Preloader';
import { getErrorMessage } from '../../utils/getErrorMessage';

const App = () => {
  let navigate = useNavigate();
  const [isMenuOpened, setMenuOpened] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [search, setSearch] = useState({query: '', isShort: false});
  const [searchedMovies, setSearchedMovies] = useState([]);

  const toggleMenu = () => {
    setMenuOpened(!isMenuOpened);
  };

  // effects
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    mainApi
      .getProfile()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          setGlobalLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setGlobalLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('savedMovies')) {
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
    } else {
      mainApi
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem('savedMovies', JSON.stringify(res));
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (movies.length) {
      const filteredMovies = filterMovies(movies, search);
      setSearchedMovies(filteredMovies);
      localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
      if (filteredMovies.length === 0) {
        setError('Ничего не найдено');
      } else setError('');
    }
  }, [movies, search.query, search.isShort]);

  useEffect(() => {
    if (localStorage.getItem('searchedMovies')) {
      setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
    }
    if (localStorage.getItem('search')) {
      setSearch(JSON.parse(localStorage.getItem('search')));
    }
  }, []);

  // movies
  const searchMovies = (req) => {
    if (!movies.length) {
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

    }
    setSearch(req);
    localStorage.setItem('search', JSON.stringify(req));
  };

  // user
  const handleRegister = (values) => {
    setIsLoading(true)
    mainApi
      .register(values)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        console.log(err);
      }).finally(() => setIsLoading(false));
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    mainApi
      .login(values)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        console.log(err);
      }).finally(() => setIsLoading(false));
  };

  const handleEditProfile = (values) => {
    setIsLoading(true)
    mainApi
      .updateProfile(values)
      .then((res) => {
        setCurrentUser(res);
        setSuccess('Данные изменены :)');
        setTimeout(() => setSuccess(''), 2000);
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        setSuccess('');
        console.log(err);
      }).finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        setError(getErrorMessage(err));
        console.log(err);
      });
  };

  if (globalLoading)
    return (
      <div className="preloader__wrap">
        <Preloader/>
      </div>
    );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleShowMenu={toggleMenu}/>
        <main className="page-content">
          <Menu handleOpenMenu={toggleMenu} isMenuOpened={isMenuOpened}/>
          <Routes>
            <Route path="/" element={<Main/>}/>

            <Route
              path="/movies/*"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    isLoading={isLoading}
                    searchedMovies={searchedMovies}
                    search={search}
                    setSearch={setSearch}
                    searchMovies={searchMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    error={error}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies/*"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    movies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    isLoading={isLoading}
                    handleEditProfile={handleEditProfile}
                    handleLogout={handleLogout}
                    setError={setError}
                    error={error}
                    success={success}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <Register
                  isLoading={isLoading}
                  handleRegister={handleRegister}
                  error={error}
                  setError={setError}
                />
              }
            />

            <Route
              path="/signin"
              element={
                <Login
                  isLoading={isLoading}
                  handleLogin={handleLogin}
                  error={error}
                  setError={setError}
                />
              }
            />
            <Route path="/*" element={<NotFound/>}/>
          </Routes>
        </main>

        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
};
export default App;
