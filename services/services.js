import axios from 'axios';

const API_URL = 'http://localhost:3000';
const API_KEY = 'f6f93a27b6b3561303ec823c15bc1748';

// Get popular movies
export const getPopularMovies = async () => {
  const mostPopularMovies = await axios.get(`${API_URL}/movies`);
  return mostPopularMovies.data.movies;
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const mostPopularMovies = await axios.get(`${API_URL}/movies`);
  return mostPopularMovies.data.movies;
};
// Get popular tv shows
// export const getPopularTV = async () => {
//   const mostPopularMovies = await axios.get(
//     `${API_URL}/tv/popular?api_key=${API_KEY}`,
//   );
//   return mostPopularMovies.data.results;
// };
// Get family movies
export const getFamilyMovies = async () => {
  const mostPopularMovies = await axios.get(`${API_URL}/movies/family`);
  return mostPopularMovies.data;
};
// Get documentary movies
export const getDocumentaryMovies = async () => {
  const mostPopularMovies = await axios.get(`${API_URL}/movies/documentary`);
  return mostPopularMovies.data;
};
export const getComedyMovies = async () => {
  const mostPopularMovies = await axios.get(`${API_URL}/movies/comedy`);
  return mostPopularMovies.data;
};
export const getWarMovies = async () => {
  const mostPopularMovies = await axios.get(`${API_URL}/movies/war`);
  return mostPopularMovies.data;
};

export const getMovie = async id => {
  // const movie = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  const movie = await axios.get(`${API_URL}/movies/${id}`);
  return movie.data;
};

export const getSimilarMovies = async id => {
  const movies = await axios.get(`${API_URL}/movies/`);
  return movies.data.movies;
};
export const searchMovies = async searchInput => {
  console.log(`${API_URL}/movies/search/${searchInput}`);
  const movies = await axios.get(`${API_URL}/movies/search/${searchInput}`);
  return movies.data;
};

export const getMovieReviews = async id => {
  console.log(`${API_URL}/movies/${id}/reviews`);
  const reviews = await axios.get(`${API_URL}/movies/${id}/reviews`);
  return reviews.data;
};

export const postMovieReview = async review => {
  const postedReview = await axios.post(`${API_URL}/reviews`, review);
  return postedReview.data;
};

export const signIn = async credentials => {
  const user = await axios.post(`${API_URL}/users/auth`, credentials);
  return user.data;
};
export const signUp = async userData => {
  const user = await axios.post(`${API_URL}/users/`, userData);
  return user.data;
};
export const getAccountInfo = async email => {
  const user = await axios.get(`${API_URL}/users/getByEmail/${email}`);
  return user.data;
};

export const getUserLists = async email => {
  if (email) {
    const lists = await axios.get(`${API_URL}/lists/${email}`);
    return lists.data;
  } else {
    return [];
  }
};
export const createNewList = async (email, title) => {
  const list = await axios.post(`${API_URL}/lists/${email}`, {title});
  return list.data;
};

export const removeList = async listId => {
  const list = await axios.delete(`${API_URL}/lists/${listId}`);
  return list.data;
};

export const removeMovieFromList = async (listId, movieId) => {
  console.log(`${API_URL}/lists/${listId}/${movieId}`);
  const list = await axios.delete(`${API_URL}/lists/${listId}/${movieId}`);
  return list.data;
};
export const addMovieToList = async (listId, movieId) => {
  const list = await axios.post(`${API_URL}/lists/${listId}/add`, {movieId});
  return list.data;
};
