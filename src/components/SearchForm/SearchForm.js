import { React, useState, useEffect } from 'react';
import './SearchForm.css';

const SearchForm = ({ handleSearch, searchProp }) => {
  const [search, setSearch] = useState(searchProp);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearch(searchProp);
  }, [searchProp]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!search.query) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      handleSearch(search);
      localStorage.setItem('search', JSON.stringify(search));
    }
  };

  const handleSearchInputChange = (evt) => {
    setSearch({ ...search, query: evt.target.value });
  };

  const handleChangeCheckbox = (evt) => {
    setSearch({ ...search, isShort: evt.target.checked });
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
            value={search.query}
            placeholder="Фильм"
          />
          <button type="submit" className="search-form__button link_button">
            Поиск
          </button>
        </form>
        {error && <span className="search-form__error">{error}</span>}
      </div>
      <div className="search-form__toggle-container">
        <input
          type="checkbox"
          className="search-from__toggle"
          onChange={handleChangeCheckbox}
          checked={search.isShort}
        />
        <p className="search-form__toggle-text">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
