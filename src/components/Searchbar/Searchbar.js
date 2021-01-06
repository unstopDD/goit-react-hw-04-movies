import React, { useState } from 'react';
import s from './Searchbar.module.css';

import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [movieName, setMovieName] = useState('');

  const handleChange = e => {
    setMovieName(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (movieName.trim() === '') {
      toast.error('Please enter search query');
      return;
    }

    onSubmit(movieName);

    setMovieName('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <input
          className={s.SearchFormInput}
          type="text"
          value={movieName}
          onChange={handleChange}
          placeholder="Search your movies"
        />
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}></span>
        </button>
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
