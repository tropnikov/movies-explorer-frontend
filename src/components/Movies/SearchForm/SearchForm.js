import { React, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = ({ handleSearch, search, setSearch }) => {
  // let location = useLocation();
  // const [search, setSearch] = useState(searchProp);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   setSearch(searchProp);
  // }, [searchProp]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!search.query) {
      setError('Нужно ввести ключевое слово');
    } else {
      setError('');
      handleSearch(search);
    }
  };

  const handleSearchInputChange = (evt) => {
    // if (location.pathname === '/saved-movies') {
    //   handleSearch({ query: evt.target.value });
    // }
    setSearch({ ...search, query: evt.target.value });
  };

  const handleChangeCheckbox = (evt) => {
    // if (location.pathname === '/saved-movies') {
    //   handleSearch({ isShort: evt.target.value });
    // }
    setSearch({ ...search, isShort: evt.target.checked });
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
            value={search.query}
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
          checked={search.isShort}
        />
        <p className="search-form__toggle-text">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
