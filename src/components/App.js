import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoadreView from '../views/LoadreView';

import Container from './Container';
import Navigations from './Navigation';

const HomeView = lazy(() =>
  import('../views/HomeView' /* webpackChunkName: "Home-view" */),
);
const MoviesView = lazy(() =>
  import('../views/MoviesView' /* webpackChunkName: "Movies-view" */),
);
const NotFoundViews = lazy(() =>
  import('../views/NotFoundViews' /* webpackChunkName: "NotFound-views" */),
);
const MovieDetailView = lazy(() =>
  import(
    '../views/MovieDetailView' /* webpackChunkName: "Movie-detail-view" */
  ),
);

export default function App() {
  return (
    <Container>
      <Navigations />

      <Suspense fallback={<LoadreView />}>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>

          <Route exact path="/movies">
            <MoviesView />
          </Route>

          <Route path="/movies/:movieID">
            <MovieDetailView />
          </Route>

          <Route>
            <NotFoundViews />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3000} />
    </Container>
  );
}
