import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../../utils/useFormWithValidation';
import Logo from '../../Layout/Logo/Logo';
import './Login.css';

const Login = ({ handleLogin, error, setError, isLoading }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const showNonEmptyErrors = () => {
    for (const key in errors) {
      if (errors[key]) return errors[key];
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values);
  };

  useEffect(() => {
    setError('');
  }, [values]);

  return (
    <section className="login">
      <Link to="/" className="login__logo">
        <Logo />
      </Link>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__title">Рады видеть!</h1>
        <div className="login-form__wrap">
          <label className="login-form__label" htmlFor="login-email">
            E-mail
          </label>
          <input
            className="login-form__input"
            id="login-email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email || ''}
            required
          />
          <label className="login-form__label" htmlFor="login-password">
            Пароль
          </label>
          <input
            className="login-form__input"
            minLength="8"
            id="login-password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password || ''}
            required
          />
          {Object.values(errors).length > 0 && (
            <span className="login-form__error-text">
              {showNonEmptyErrors()}
            </span>
          )}
          {error && (
            <span className="login-form__error-text login-form__error-text_server">
              {error}
            </span>
          )}
        </div>
        <button
          className={
            (isValid && !error)
              ? 'login-form__button link_button'
              : 'login-form__button login-form__button_disabled'
          }
          type="submit"
          disabled={!isValid || isLoading || error}
        >
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
