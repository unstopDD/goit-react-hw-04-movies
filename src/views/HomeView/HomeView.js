import { useState, useEffect } from 'react';
import Card from '../../components/Card';

import { fetchTrendingMovies, IMAGE_URL } from '../../services/MoviesApi';
import LoadreView from '../LoadrerView';
import ErrorView from '../ErrorView';

import s from './HomeView.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomeView() {
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
      <>
        <h2 className={s.title}>Now in trend</h2>

        {movies && <Card movies={movies} IMAGE_URL={IMAGE_URL} />}
      </>
    );
  }
}
