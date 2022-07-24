import React from 'react';
import { useRoutes } from 'react-router-dom';
import './Footer.css';

const FooterView = () => {
  return (
    <footer className="footer">
      <div className="footer__about">
        <p className="footer__about-text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
      </div>
      <div className="footer__info">
        <p className="footer__copyright">&#169; 2022</p>
        <ul className="footer__links">
          <li>
            <a
              className="footer__link link"
              href="src/components/Layout/Footer/Footer"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link link"
              href="src/components/Layout/Footer/Footer"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="footer__link link"
              href="src/components/Layout/Footer/Footer"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

const Footer = () => {
  return useRoutes([
    { path: '/', element: <FooterView /> },
    { path: '/movies', element: <FooterView /> },
    { path: '/saved-movies', element: <FooterView /> },
  ]);
};

export default Footer;
