import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import './LandingHeader.css';

const LandingHeader = () => {
  return (
    <header className="header header_landing">
      <>
        <Link to="/">
          <Logo />
        </Link>
        <div className="header__links">
          <Link to="signup" className="header__link link">
            Регистрация
          </Link>
          <Link to="signin" className="header__link header__link_login link">
            Войти
          </Link>
        </div>
      </>
    </header>
  );
};

export default LandingHeader;
