import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../../services/MoviesApi';
import s from './ReviewView.module.css';

export default function Reviews({ movieID }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieID).then(request => setReviews(request.results));
  }, [movieID]);

  return (
    <div className={s.wrapper}>
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((review, index) => (
            <li key={index} className={s.item}>
              <p> {review.author}</p>
              <p> {review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.text}>No reviews to show</p>
      )}
    </div>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string,
};
