import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTV,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';

import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List.js';
import Error from '../components/Error.js';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  //   const [movie, setMovie] = useState('');
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getDocumentaryMovies(),
      getFamilyMovies(),
    ]);
  };

  useEffect(() => {
    setIsLoaded(false);
    getData()
      .then(
        ([
          upcomingMoviesArr,
          popularMoviesArr,
          popularTVArr,
          documentaryMoviesArr,
          familyMoviesArr,
        ]) => {
          const moviesImagesArray = upcomingMoviesArr.map(
            movieItem =>
              `https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`,
          );
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesArr);
          setPopularTV(popularTVArr);
          setDocumentaryMovies(documentaryMoviesArr);
          setFamilyMovies(familyMoviesArr);
        },
      )
      .catch(err => setError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <React.Fragment>
      {isLoaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimensions.height * 0.7}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
              />
            </View>
          )}
          {popularMovies.length > 0 && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {popularTV.length > 0 && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular TV shows"
                content={popularTV}
              />
            </View>
          )}
          {familyMovies.length > 0 && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {documentaryMovies.length > 0 && (
            <View style={{...styles.carousel, ...styles.carouselLast}}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!isLoaded && (
        <View style={styles.sliderContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>Loading...</Text>
        </View>
      )}
      {error && (
        <View style={styles.sliderContainer}>
          <Text>Hello</Text>
          <Error />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselLast: {
    marginBottom: 70,
  },
});

export default Home;
