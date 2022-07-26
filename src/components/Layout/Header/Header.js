import React from 'react';
import './Header.css';
import { useRoutes } from 'react-router-dom';
import LandingHeader from './LandingHeader/LandingHeader';
import MainHeader from './MainHeader/MainHeader';

const Header = ({ isLoggedIn, handleShowMenu }) => {
  return useRoutes([
    { path: '/', element: isLoggedIn ? <MainHeader handleOpenMenu={handleShowMenu} /> : <LandingHeader /> },
    {
      path: '/movies',
      element: <MainHeader handleOpenMenu={handleShowMenu} />,
    },
    {
      path: '/saved-movies',
      element: <MainHeader handleOpenMenu={handleShowMenu} />,
    },
    {
      path: '/profile',
      element: <MainHeader handleOpenMenu={handleShowMenu} />,
    },
  ]);
};

export default Header;
