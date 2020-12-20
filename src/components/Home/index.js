import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import * as baseStyles from '../../styles/styles';
import { fetchMovieGenresAction } from "../../state/movies/actions";
import {
  STREAMING_SERVICES_SCREEN,
  SEARCH_MOVIE_SCREEN,
} from "../../constants/ROUTES";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieGenresAction());
  }, []);

  return (
    <View style={styles.container}>
      {/* TODO: Move into header component and make icon */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate(SEARCH_MOVIE_SCREEN)}
        >
          <Text  style={styles.searchButtonText}>Already have a movie in mind?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.actionsButtonContainer}>
          <TouchableOpacity
            style={styles.actionsButton}
            onPress={() => navigation.navigate(STREAMING_SERVICES_SCREEN)}
          >
            <Text style={styles.actionsText}>Match with a Movie!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#888888",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchContainer: {
    width: "100%",
    height: "5%",
  },
  actionsContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionsButtonContainer: {
    width: "100%",
    height: "50%",
  },
  actionsButton: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
  },
  actionsText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
    fontSize: "2rem"
  },
  searchButton: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
  },
  searchButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  }
});

export default Home;
