export const selectMovieGenres = (state) => state.movies.genres;
export const selectMoviesByGenre = (state) => state.movies.moviesByGenre;
export const selectMovieStreamingServices = (state) =>
  state.movies.movieStreamingServices;
export const selectMovieStreamingServicesByGenre = (
  state,
  genre,
  userStreamingServices
) => {
  const movies = state.movies?.movieStreamingServices;

  const filteredMovies = Object.values(movies).reduce((acc, movie) => {
    if (movie.genre === genre) {
      const locations = [];
      Object.keys(movie.streamingServices).forEach((streamingService) => {
        if (userStreamingServices[streamingService]) {
          locations.push(movie.streamingServices[streamingService]);
        }
      });
      if (locations.length > 0) {
        acc.push({ ...movie, locations });
      }
      return acc;
    }
    return acc;
  }, []);

  return filteredMovies;
};
