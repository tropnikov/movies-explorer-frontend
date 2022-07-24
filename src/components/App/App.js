import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Menu from '../Menu/Menu';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import './App.css';

const App = () => {
  let navigate = useNavigate();
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const toggleMenu = () => {
    setMenuOpened(!isMenuOpened);
  };

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch((err) => console.log(err));
    // }
  }, []);

  const handleRegister = (values) => {
    mainApi
      .register(values)
      .then((res) => {
        //   console.log(res);
        // setCurrentUser(res);
        console.log(res);
        setCurrentUser(res);
        console.log(currentUser);
        navigate('/movies');
      })
      .catch((err) => {
        //   throw new Error(err.json());
        //   // console.log(err.json());
        //   // // console.log(err.json());
        setError(err);
        console.log(err);
      });
    // .catch((err) => console.log(err));
    // .then((res) => {
    // setCurrentUser(res);

    // });
    // .catch((err) => setError(err));
  };

  const handleLogin = (values) => {
    mainApi
      .login(values)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        console.log(currentUser);
        navigate('/movies');
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
    // .then((res) => {
    // setCurrentUser(res);

    // });
    // .catch((err) => setError(err));
  };

  const handleEdit = (values) => {
    mainApi
      .updateProfile(values)
      .then((res) => {
        setCurrentUser(res);
        // navigate('/movies');
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then((res) => {
        setCurrentUser(res);
        // navigate('/');
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header handleShowMenu={toggleMenu} />
        <main className="page-content">
          <Menu handleOpenMenu={toggleMenu} isMenuOpened={isMenuOpened} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies/*"
              element={
                <Movies
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              }
            />
            <Route
              path="/saved-movies/*"
              element={
                <SavedMovies
                  movies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleEditProfile={handleEdit}
                  handleLogout={handleLogout}
                  setError={setError}
                  error={error}
                />
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
      </CurrentUserContext.Provider>
    </div>
  );
};
export default App;
