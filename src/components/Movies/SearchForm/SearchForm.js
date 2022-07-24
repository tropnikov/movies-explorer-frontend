import { React, useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ handleSearch, search, setSearch }) => {
  const [error, setError] = useState('');
  const [innerSearch, setInnerSearch] = useState(search);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!innerSearch.query) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      setSearch(innerSearch);
      handleSearch(innerSearch);
    }
  };

  const handleSearchInputChange = (evt) => {
    setInnerSearch({ ...innerSearch, query: evt.target.value });
  };

  const handleChangeCheckbox = (evt) => {
    setInnerSearch({ ...innerSearch, isShort: evt.target.checked });
  };

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form" onSubmit={handleSubmit}>
          <input
            // required
            className="search-form__input"
            id="search-form-input"
            type="text"
            name="search-form-input"
            minLength="1"
            onChange={handleSearchInputChange}
            value={innerSearch.query}
            placeholder="Фильм или Movie"
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
          checked={innerSearch.isShort}
        />
        <p className="search-form__toggle-text">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
