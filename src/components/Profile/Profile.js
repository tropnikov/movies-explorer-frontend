import { React, useEffect, useContext } from 'react';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import './Profile.css';

const Profile = ({
  handleEditProfile,
  handleLogout,
  error,
  setError,
  success,
}) => {
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();

  const { name, email } = useContext(CurrentUserContext);

  const showNonEmptyErrors = () => {
    for (const key in errors) {
      if (errors[key]) return errors[key];
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleEditProfile(values);
  };

  useEffect(() => {
    setValues({ name, email });
  }, [name, email]);

  useEffect(() => {
    setError('');
  }, [values]);

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, {name}!</h1>
        <section className="profile__section">
          <label htmlFor="profile__name" className="profile__label">
            Имя
          </label>
          <input
            id="profile__name"
            name="name"
            type="text"
            className="profile__input"
            placeholder="Имя"
            minLength="2"
            onChange={handleChange}
            value={values.name || ''}
            required
          />
        </section>
        <section className="profile__section">
          <label htmlFor="profile__email" className="profile__label">
            E-mail
          </label>
          <input
            id="profile__email"
            name="email"
            type="email"
            className="profile__input"
            onChange={handleChange}
            value={values.email || ''}
            placeholder="email"
            required
          />
          {Object.values(errors).length > 0 && (
            <span className="profile-form__error-text">
              {showNonEmptyErrors()}
            </span>
          )}
          {error && (
            <span className="profile-form__error-text profile-form__error-text_server">
              {error}
            </span>
          )}
          {success && (
            <span className="profile-form__success-text profile-form__success-text_server">
              {success}
            </span>
          )}
        </section>
        <button
          type="submit"
          className={
            !isValid || (values.name === name && values.email === email)
              ? 'profile__button profile__button-edit profile__button-edit_disabled'
              : 'profile__button profile__button-edit link'
          }
          disabled={
            !isValid || (values.name === name && values.email === email)
          }
        >
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button profile__button-exit link"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;
