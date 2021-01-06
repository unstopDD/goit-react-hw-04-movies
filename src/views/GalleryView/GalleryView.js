import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchMoviesByName, IMAGE_URL } from '../../services/MoviesApi';
import PropTypes from 'prop-types';

import s from './GalleryView.module.css';

export default function GalleryView({ searchQuery }) {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchMoviesByName(searchQuery).then(movie => setMovies(movie.results));
  }, [searchQuery]);
  console.log(movies);

  return (
    <>
      {movies && (
        <ul className={s.card}>
          {movies.map(movie => (
            <li key={movie.id} className={s.item}>
              <Link to={`${url}/${movie.id}`} className={s.link}>
                <img
                  src={IMAGE_URL + movie.poster_path}
                  alt={movie.title}
                  width="300"
                  height="450"
                />
                <p className={s.movieTitle}>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

GalleryView.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
