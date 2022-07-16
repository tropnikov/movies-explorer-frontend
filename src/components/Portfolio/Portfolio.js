import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-wrap">
          <a
            className="portfolio__link link"
            href="https://github.com/tropnikov/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__link-wrap">
          <a
            className="portfolio__link link"
            href="https://github.com/tropnikov/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-icon">↗</p>
          </a>
        </li>
        <li className="portfolio__link-wrap">
          <a
            className="portfolio__link link"
            href="https://github.com/tropnikov/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-icon">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
