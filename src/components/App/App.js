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

const App = () => {
  let navigate = useNavigate();
  // let location = useLocation();
  const [isMenuOpened, setMenuOpened] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [search, setSearch] = useState({ query: '', isShort: false });
  const [searchedMovies, setSearchedMovies] = useState([]);
  // const [filteredSavedMovies, setFilteredSavedMovies] = useState([])
  // const [isValidatingToken, setIsValidatingToken] = useState(false);

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
    if (movies.length && search.query) {
      const filteredMovies = filterMovies(movies, search);
      //   movies.filter((item) => {
      //   return (
      //     (item?.nameRU
      //       ?.toLowerCase()
      //       .includes(search?.query?.toLowerCase().trim()) ||
      //       item?.nameEN
      //         ?.toLowerCase()
      //         .includes(search?.query?.toLowerCase().trim())) &&
      //     (search.isShort ? item.duration <= 40 : true)
      //   );
      // });
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

  // movies
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

  // const searchInSavedMovies = useCallback((req) => {
  //   if (savedMovies.length && req.query) {
  //     const filteredMovies = filterMovies(savedMovies, req);
  //     //   movies.filter((item) => {
  //     //   return (
  //     //     (item?.nameRU
  //     //       ?.toLowerCase()
  //     //       .includes(search?.query?.toLowerCase().trim()) ||
  //     //       item?.nameEN
  //     //         ?.toLowerCase()
  //     //         .includes(search?.query?.toLowerCase().trim())) &&
  //     //     (search.isShort ? item.duration <= 40 : true)
  //     //   );
  //     // });
  //     setFilteredSavedMovies(filteredMovies);
  //     // localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
  //     if (filteredMovies.length === 0) {
  //       setError('Ничего не найдено');
  //     } else setError('');
  //   }
  // }, [])

  // user
  const handleRegister = (values) => {
    mainApi
      .register(values)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies');
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  const handleLogin = (values) => {
    mainApi
      .login(values)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  const handleEditProfile = (values) => {
    mainApi
      .updateProfile(values)
      .then((res) => {
        setCurrentUser(res);
        setSuccess('Данные изменены :)');
        setTimeout(() => setSuccess(''), 2000);
      })
      .catch((err) => {
        setError(err);
        setSuccess('');
        console.log(err);
      });
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then(() => {
        // setCurrentUser(res);
        setIsLoggedIn(false);
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  if (globalLoading)
    return (
      <div className="preloader__wrap">
        <Preloader />
      </div>
    );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleShowMenu={toggleMenu} />
        <main className="page-content">
          <Menu handleOpenMenu={toggleMenu} isMenuOpened={isMenuOpened} />
          <Routes>
            <Route path="/" element={<Main />} />

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
                    handleEditProfile={handleEditProfile}
                    handleLogout={handleLogout}
                    setError={setError}
                    error={error}
                    success={success}
                    // setSuccess={}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <Register
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
                  handleLogin={handleLogin}
                  error={error}
                  setError={setError}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};
export default App;
