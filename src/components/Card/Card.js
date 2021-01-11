import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import s from './Card.module.css';
import NotFoundImg from '../../../src/not-found.png';

export default function Card({ movies, IMAGE_URL }) {
  const { url } = useRouteMatch();

  return (
    <>
      <ul className={s.card}>
        {movies.map(movie => (
          <li key={movie.id} className={s.item}>
            <Link
              to={
                url === '/' ? `${url}movies/${movie.id}` : `${url}/${movie.id}`
              }
              className={s.link}
            >
              <img
                src={
                  movie.poster_path === null
                    ? NotFoundImg
                    : IMAGE_URL + movie.poster_path
                }
                alt={movie.title}
                width="300"
                height="450"
              />
              <p className={s.movieTitle}>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

Card.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.any).isRequired,
};
