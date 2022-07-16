import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import './MainHeader.css';

const MainHeader = ({ handleOpenMenu }) => {
  return (
    <header className="header header_main">
      <Link to="/">
        <Logo />
      </Link>
      <div className="header__navigation">
        <nav className="navigation">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? 'navigation__link_active' : 'navigation__link link'
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={({ isActive }) =>
              isActive ? 'navigation__link_active' : 'navigation__link link'
            }
          >
            Сохранённые фильмы
          </NavLink>
        </nav>

        <Link to="/profile" className="header-account-link link">
          <p className="header-account-link__text">Аккаунт</p>
          <div className="header-account-link__icon"></div>
        </Link>
        <button
          onClick={handleOpenMenu}
          className="header__menu-button link"
        ></button>
      </div>
    </header>
  );
};

export default MainHeader;
