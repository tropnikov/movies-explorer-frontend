import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../../utils/useFormWithValidation';
import Logo from '../../Layout/Logo/Logo';
import './Register.css';

const Register = ({ handleRegister, error, setError }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const showNonEmptyErrors = () => {
    for (const key in errors) {
      if (errors[key]) return errors[key];
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(values);
  };

  useEffect(() => {
    setError('');
  }, [values]);

  return (
    <section className="register">
      <Link to="/" className="register__logo">
        <Logo />
      </Link>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-form__title">Добро пожаловать!</h1>
        <div className="register-form__wrap">
          <label className="register-form__label" htmlFor="register-name">
            Имя
          </label>
          <input
            className="register-form__input"
            minLength="2"
            maxLength="30"
            id="register-name"
            name="name"
            type="text"
            pattern="[a-zA-Zа-яА-Я -]{2,20}"
            onChange={handleChange}
            value={values.name || ''}
            required
          />
          <label className="register-form__label" htmlFor="register-email">
            E-mail
          </label>
          <input
            className="register-form__input"
            id="register-email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email || ''}
            required
          />
          <label className="register-form__label" htmlFor="register-password">
            Пароль
          </label>
          <input
            className="register-form__input"
            minLength="2"
            id="register-password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password || ''}
            required
          />
          {Object.values(errors).length > 0 && (
            <span className="register-form__error-text">
              {showNonEmptyErrors()}
            </span>
          )}
          {error && (
            <span className="register-form__error-text register-form__error-text_server">
              {error}
            </span>
          )}
        </div>
        <button
          className={
            isValid
              ? 'register-form__button link'
              : 'register-form__button register-form__button_disabled'
          }
          type="submit"
          disabled={!isValid}
        >
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
