import React from 'react';
import './Menu.css';
import { Link, NavLink } from 'react-router-dom';

const Menu = ({ isMenuOpened, handleOpenMenu }) => {
  return (
    isMenuOpened && (
      <section className="menu">
        <div className="menu__sidebar">
          <div className="menu__sidebar-wrapper">
            <button
              onClick={handleOpenMenu}
              className="menu__exit-button link"
            ></button>
            <nav className="menu__navigation">
              <NavLink
                onClick={handleOpenMenu}
                to="/"
                className={({ isActive }) =>
                  isActive ? 'menu__link menu__link_active' : 'menu__link link'
                }
              >
                Главная
              </NavLink>
              <NavLink
                onClick={handleOpenMenu}
                to="/movies"
                className={({ isActive }) =>
                  isActive ? 'menu__link menu__link_active' : 'menu__link link'
                }
              >
                Фильмы
              </NavLink>
              <NavLink
                onClick={handleOpenMenu}
                to="/saved-movies"
                className={({ isActive }) =>
                  isActive ? 'menu__link menu__link_active' : 'menu__link link'
                }
              >
                Сохранённые фильмы
              </NavLink>
            </nav>
          </div>
          <Link
            to="/profile"
            className="account-link link"
            onClick={handleOpenMenu}
          >
            <p className="account-link__text">Аккаунт</p>
            <div className="account-link__icon"></div>
          </Link>
        </div>
      </section>
    )
  );
};

export default Menu;
