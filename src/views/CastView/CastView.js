import { useState, useEffect } from 'react';
import { fetchMovieCast, IMAGE_URL } from '../../services/MoviesApi';

import s from './CastView.module.css';
import PropTypes from 'prop-types';

export default function CastView({ movieID }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchMovieCast(movieID).then(request => setCast(request.cast));
  }, [movieID]);

  return (
    <>
      {cast && (
        <>
          <ul className={s.list}>
            {cast.map(item => (
              <>
                {item.profile_path && (
                  <li key={item.id} className={s.item}>
                    <img
                      className={s.image}
                      src={IMAGE_URL + item.profile_path}
                      alt={item.name}
                      widht="120"
                      height="170"
                    />
                    <p> {item.name}</p>
                  </li>
                )}
              </>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

CastView.propTypes = {
  movieID: PropTypes.string.isRequired,
};
