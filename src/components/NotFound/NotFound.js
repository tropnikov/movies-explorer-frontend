import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="not-found">
      <div>
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <Link to="/" className="not-found__link link">
        Назад
      </Link>
    </section>
  );
};

export default NotFound;
