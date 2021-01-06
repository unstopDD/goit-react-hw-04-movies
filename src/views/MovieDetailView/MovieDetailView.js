import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  Switch,
} from 'react-router-dom';

import { fetchMovieDetails, IMAGE_URL } from '../../services/MoviesApi';
import ErrorView from '../ErrorView';
import LoadreView from '../LoadreView';

import s from './MovieDetailView.module.css';

const CastView = lazy(() =>
  import('../CastView' /* webpackChunkName: "Cast-view" */),
);

const ReviewView = lazy(() =>
  import('../ReviewView' /* webpackChunkName: "Review-view" */),
);

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailView() {
  const { movieID } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState(Status.PENDING);
  const [error, setError] = useState({});

  useEffect(() => {
    setStatus(Status.PENDING);
    setTimeout(function () {
      fetchMovieDetails(movieID)
        .then(setMovie)
        .then(setStatus(Status.RESOLVED))
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }, 1000);
  }, [movieID]);

  if (status === Status.PENDING) {
    return <LoadreView />;
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {movie && (
          <div className={s.wrapper}>
            <img
              src={IMAGE_URL + movie.poster_path}
              height="400"
              width="300"
              alt={movie.title}
            />
            <div className={s.rightPart}>
              <h2 className={s.title}>{movie.title}</h2>
              <p>User Score: {movie.vote_average}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>

              <ul className={s.list}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <hr />
        <nav>
          <NavLink
            to={`${url}/cast`}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Cast
          </NavLink>
          <NavLink
            to={`${url}/reviews`}
            className={s.link}
            activeClassName={s.activeLink}
          >
            Reviews
          </NavLink>
        </nav>
        <Suspense fallback={<LoadreView />}>
          <Switch>
            <Route path={`${path}:movieId/cast`}>
              <CastView movieID={movieID} />
            </Route>

            <Route path={`${path}:movieId/reviews`}>
              <ReviewView movieID={movieID} />
            </Route>
          </Switch>
        </Suspense>
      </>
    );
  }
}
