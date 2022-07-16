import React from 'react';
import './Login.css';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className="login">
      <Link to="/" className="login__logo">
        <Logo />
      </Link>
      <form className="login-form">
        <h1 className="login-form__title">Рады видеть!</h1>
        <label className="login-form__label" htmlFor="login-email">
          E-mail
        </label>
        <input
          className="login-form__input"
          id="login-email"
          name="login-email"
          type="email"
          required
        />
        <label className="login-form__label" htmlFor="login-password">
          Пароль
        </label>
        <input
          className="login-form__input"
          minLength="8"
          id="login-password"
          name="login-password"
          type="password"
          required
        />
        <span className="login-form__error-text">Что-то пошло не так...</span>
        <button className="login-form__button link" type="submit">
          Войти
        </button>
        <span className="login-form__text">
          Ещё не зарегистрированы?
          <Link to="/signup" className="login-form__link link">
            Регистрация
          </Link>
        </span>
      </form>
    </section>
  );
};

export default Login;
