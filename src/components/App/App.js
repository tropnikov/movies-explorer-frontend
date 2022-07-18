import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import './App.css';

const App = () => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened(!isMenuOpened);
  };
  return (
    <div className="App">
      <Header handleShowMenu={toggleMenu} />
      <main className="page-content">
        <Menu handleOpenMenu={toggleMenu} isMenuOpened={isMenuOpened} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/signup" element={<Register />} />

          <Route path="/signin" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
