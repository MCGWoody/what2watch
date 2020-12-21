import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  selectMovieIndex,
  selectMoviesByGenreLoadingStatus,
  selectMovieStreamingServicesLoadingStatus,
  selectMovieStreamingServicesById,
  selectMovieIdByIndex,
} from '../../state/movies/selectors';
import { selectUserStreamingServices } from '../../state/streaming/selectors';
import SwipeMovieCard from '../SwipeMovieCard';
import { PENDING, SUCCESS } from '../../state/constants';
import {
  movieListIndexAction,
  fetchMovieStreamingServicesAction,
} from '../../state/movies/actions';
import * as baseStyles from '../../styles/styles';
import { checkIfMovieIsAvailableToUser } from '../../utils/moviesUtils';
import { selectUserId, selectUserIsLoggedIn } from '../../state/auth/selectors';

const MovieList = ({ route }) => {
  const dispatch = useDispatch();
  const { genre } = route.params;
  const movieIndex = useSelector((state) => selectMovieIndex(state, genre));
  const movieId = useSelector((state) =>
    selectMovieIdByIndex(state, genre, movieIndex)
  );
  const movie = useSelector((state) =>
    selectMovieStreamingServicesById(state, movieId)
  );
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const moviesByGenreLoadingStatus = useSelector(
    selectMoviesByGenreLoadingStatus
  );
  const movieStreamingServicesLoadingStatus = useSelector(
    selectMovieStreamingServicesLoadingStatus
  );
  const isUserLoggedIn = useSelector(selectUserIsLoggedIn);
  const uid = useSelector(selectUserId);
  const [sharedServices, setSharedServices] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    // if not in store, fetch movie
    else if (!movie) {
      dispatch(fetchMovieStreamingServicesAction(movieId));
      // sometimes endpoint errors, skip to next movie
    } else if (movie === 'not available') {
      dispatch(movieListIndexAction(genre));
      // check if we have shared streaming services
    } else {
      const sharedServicesForMovie = checkIfMovieIsAvailableToUser(
        userStreamingServices,
        movie
      );

      // if yes, set shared services
      if (sharedServicesForMovie.length) {
        setSharedServices(sharedServicesForMovie);
        // skip to next movie
      } else {
        dispatch(movieListIndexAction(genre));
      }
    }
  }, [movie, movieId, dispatch, fetchMovieStreamingServicesAction]);

  return (
    <View style={styles.container}>
      <View style={styles.swipeContainer}>
        <View style={styles.movieContainer}>
          <View style={styles.movieBodyContainer}>
            {moviesByGenreLoadingStatus === PENDING ||
            movieStreamingServicesLoadingStatus === PENDING ||
            !sharedServices ||
            !movie ? (
              <ActivityIndicator style={styles.loading} size='large' />
            ) : (
              <>
                <SwipeMovieCard sharedServices={sharedServices} movie={movie} />
              </>
            )}
          </View>
        </View>
      </View>
      {moviesByGenreLoadingStatus === SUCCESS &&
        movieStreamingServicesLoadingStatus === SUCCESS &&
        sharedServices &&
        movie && (
          <TouchableOpacity
            style={styles.nextMovieButton}
            onPress={() =>
              dispatch(
                movieListIndexAction(genre, isUserLoggedIn, uid, movieId)
              )
            }
          >
            <Text style={styles.nextMovieButtonText}>Next Movie</Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  swipeContainer: {
    height: '80%',
  },
  loading: {
    flex: 1,
  },
  movieContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    overflow: 'auto',
    paddingTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  movieBodyContainer: {
    flex: 1,
  },
  nextMovieButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    height: '5%',
  },
  nextMovieButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
});

export default MovieList;
