import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'f6f93a27b6b3561303ec823c15bc1748';

// Get popular movies
export const getPopularMovies = async () => {
  const mostPopularMovies = await axios.get(
    `${API_URL}/movie/popular?api_key=${API_KEY}`,
  );
  return mostPopularMovies.data.results;
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const mostPopularMovies = await axios.get(
    `${API_URL}/movie/upcoming?api_key=${API_KEY}`,
  );
  return mostPopularMovies.data.results;
};
// Get popular tv shows
export const getPopularTV = async () => {
  const mostPopularMovies = await axios.get(
    `${API_URL}/tv/popular?api_key=${API_KEY}`,
  );
  return mostPopularMovies.data.results;
};
// Get family movies
export const getFamilyMovies = async () => {
  const mostPopularMovies = await axios.get(
    `${API_URL}/discover/movie?with_genres=10751&api_key=${API_KEY}`,
  );
  return mostPopularMovies.data.results;
};
// Get documentary movies
export const getDocumentaryMovies = async () => {
  const mostPopularMovies = await axios.get(
    `${API_URL}/discover/movie?with_genres=99&api_key=${API_KEY}`,
  );
  return mostPopularMovies.data.results;
};

export const getMovie = async id => {
  // const movie = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  const movie = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  return movie.data;
};

export const getSimilarMovies = async id => {
  const movies = await axios.get(
    `${API_URL}/movie/${id}/similar?api_key=${API_KEY}`,
  );
  return movies.data.results;
};
