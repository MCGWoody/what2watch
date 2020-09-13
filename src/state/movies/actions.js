import { GENRES, MOVIES_BY_GENRE, MOVIE_STREAMING_SERVICES } from "./constants";
import { PENDING, SUCCESS, FAILURE } from "../constants";
import {
  fetchMovieGenres,
  fetchMoviesByGenre,
  fetchMovieStreamingServices,
} from "../../lib/sdk";

export const fetchMovieGenresAction = () => (dispatch) => {
  dispatch({
    type: GENRES,
    status: PENDING,
  });
  return fetchMovieGenres()
    .then((response) => response.text())
    .then((text) => {
      const genres = JSON.parse(text);

      dispatch({
        type: GENRES,
        status: SUCCESS,
        payload: genres,
      });
    })
    .catch((err) => {
      dispatch({
        type: GENRES,
        status: FAILURE,
      });
    });
};

export const fetchMoviesByGenreAction = (genre) => (dispatch) => {
  dispatch({
    type: MOVIES_BY_GENRE,
    status: PENDING,
  });
  return fetchMoviesByGenre(genre)
    .then((response) => response.text())
    .then((text) => JSON.parse(text))
    .then((movies) => {
      movies.forEach((movie) => {
        const movieId = movie.slice(
          movie.indexOf("tt"),
          movie.lastIndexOf("/")
        );
        dispatch(fetchMovieStreamingServicesAction(movieId, genre));
      });
      dispatch({
        type: MOVIES_BY_GENRE,
        status: SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: MOVIES_BY_GENRE,
        status: FAILURE,
      });
    });
};

export const fetchMovieStreamingServicesAction = (movieId, genre) => (
  dispatch
) => {
  dispatch({
    type: MOVIE_STREAMING_SERVICES,
    status: PENDING,
  });
  return fetchMovieStreamingServices(movieId)
    .then((response) => response.text())
    .then((text) => {
      const movieStreamServices = JSON.parse(text)?.collection?.locations;
      const movieTitle = JSON.parse(text)?.collection?.name;

      dispatch({
        type: MOVIE_STREAMING_SERVICES,
        status: SUCCESS,
        payload: { movieId, genre, movieStreamServices, movieTitle },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: MOVIE_STREAMING_SERVICES,
        status: FAILURE,
      });
    });
};