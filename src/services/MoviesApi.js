const BASE_URL = 'https://api.themoviedb.org/3';
const apiKey = 'f38341df5b99b4280cf3064f72c5a01a';

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchArticles(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not Found'));
}

export function fetchTrendingMovies() {
  return fetchArticles(`${BASE_URL}/trending/movie/day?api_key=${apiKey}`);
}

export function fetchMoviesByName(name) {
  return fetchArticles(
    `${BASE_URL}/search/movie?api_key=${apiKey}&language=en-US&query=${name}&page=1&include_adult=false`,
  );
}

export function fetchMovieDetails(id) {
  return fetchArticles(
    `${BASE_URL}/movie/${id}?api_key=${apiKey}&language=en-US`,
  );
}

export function fetchMovieCast(id) {
  return fetchArticles(
    `${BASE_URL}/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
  );
}

export function fetchMovieReviews(id) {
  return fetchArticles(
    `${BASE_URL}/movie/${id}/reviews?api_key=${apiKey}&language=en-US`,
  );
}
