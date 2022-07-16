import React from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <section className="register">
      <Link to="/" className="register__logo">
        <Logo />
      </Link>
      <form className="register-form">
        <h1 className="register-form__title">Добро пожаловать!</h1>
        <label className="register-form__label" htmlFor="register-name">
          Имя
        </label>
        <input
          className="register-form__input"
          minLength="2"
          id="register-name"
          name="register-name"
          type="text"
          required
        />
        <label className="register-form__label" htmlFor="register-email">
          E-mail
        </label>
        <input
          className="register-form__input"
          id="register-email"
          name="register-email"
          type="email"
          required
        />
        <label className="register-form__label" htmlFor="register-password">
          Пароль
        </label>
        <input
          className="register-form__input"
          minLength="8"
          id="register-password"
          name="register-password"
          type="password"
          required
        />
        <span className="register-form__error-text">
          Что-то пошло не так...
        </span>
        <button className="register-form__button link" type="submit">
          Зарегистрироваться
        </button>
        <span className="register-form__text">
          Уже зарегистрированы?
          <Link to="/signin" className="register-form__link link">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
};

export default Register;
