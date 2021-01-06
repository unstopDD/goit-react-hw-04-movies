import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTrendingMovies, IMAGE_URL } from '../../services/MoviesApi';
import LoadreView from '../LoadreView';
import ErrorView from '../ErrorView';

import s from './HomeView.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomeView() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.PENDING);
  const [error, setError] = useState([{}]);

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchTrendingMovies()
      .then(data => setMovies(data.results))
      .then(setStatus(Status.RESOLVED))
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.PENDING) {
    return <LoadreView />;
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <div className={s.wraper}>
        <h2 className={s.title}>Now in trend</h2>
        {movies && (
          <ul className={s.card}>
            {movies.map(movie => (
              <li key={movie.id} className={s.item}>
                <Link to={`${url}movies/${movie.id}`} className={s.link}>
                  <img
                    src={IMAGE_URL + movie.poster_path}
                    alt={movie.title}
                    width="300"
                    height="400"
                  />
                  <p className={s.movieTitle}>{movie.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
