export const selectMovieGenres = (state) => state.movies.genres;
export const selectMoviesByGenre = (state, genre) => {
  if (genre !== 'most-popular') {
    return state.movies.moviesByGenre[genre] || [];
  } else {
    return state.movies.mostPopularMovies;
  }
}
export const selectMoviesByGenreExists = (state, genre) =>
  !!state.movies.moviesByGenre[genre];
export const selectMovieStreamingServices = (state) =>
  state.movies.movieStreamingServices;

export const selectMovieStreamingServicesById = (state, movieId) =>
  state.movies.movieStreamingServices[movieId];

export const selectMovieIndex = (state, genre) =>
  state.movies.movieIndexes[genre] || 0;
export const selectMoviesByGenreLoadingStatus = (state) =>
  state.movies.moviesByGenreLoadingStatus;
export const selectMovieStreamingServicesLoadingStatus = (state) =>
  state.movies.movieStreamingServicesLoadingStatus;

export const selectMovieIdByIndex = (state, genre, index) => {
  if (genre !== 'most-popular') {
    return state.movies.moviesByGenre[genre]
    ? state.movies.moviesByGenre[genre][index]
    : null;
  } else {
    return state.movies.mostPopularMovies?.[index]
  }

};

export const selectMostPopularMovies = (state, index = 0) => state.movies.mostPopularMovies?.[index];
