import { useState, useEffect } from 'react';
import { fetchMoviesByName, IMAGE_URL } from '../../services/MoviesApi';
import Card from '../../components/Card';
import PropTypes from 'prop-types';

export default function GalleryView({ searchQuery }) {
  const [movies, setMovies] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchMoviesByName(searchQuery).then(movie => setMovies(movie.results));
  }, [searchQuery]);

  return <>{movies && <Card movies={movies} IMAGE_URL={IMAGE_URL} />}</>;
}

GalleryView.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
