import { React, useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ handleSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!query) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      handleSearch(query);
    }
  };

  const handleSearchInputChange = (evt) => {
    setQuery(evt.target.value);
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <input
            required
            className="search-form__input"
            id="search-form-input"
            type="text"
            name="search-form-input"
            minLength="1"
            onChange={handleSearchInputChange}
            placeholder="Фильм"
          />
          <button type="submit" className="search-form__button link_button">
            Поиск
          </button>
        </form>
        {error && <span className="search-form__error">{error}</span>}
      </div>
      <div className="search-form__toggle-container">
        <input type="checkbox" className="search-from__toggle" />
        <p className="search-form__toggle-text">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
