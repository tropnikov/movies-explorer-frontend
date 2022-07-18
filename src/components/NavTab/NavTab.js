import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="navtab">
      <a href="#about-project" className="navtab__link link_button">
        О проекте
      </a>
      <a href="#techs" className="navtab__link link_button">
        Технологии
      </a>
      <a href="#about-me" className="navtab__link link_button">
        Студент
      </a>
    </nav>
  );
};

export default NavTab;
