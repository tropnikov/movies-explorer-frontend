import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <input required className="search-form__input" placeholder="Фильм" />
          <button type="submit" className="search-form__button link_button">
            Поиск
          </button>
        </form>
      </div>
      <div className="search-form__toggle-container">
        <input type="checkbox" className="search-from__toggle" />
        <p className="search-form__toggle-text">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
