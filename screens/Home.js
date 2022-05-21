import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  // getPopularTV,
  getFamilyMovies,
  getDocumentaryMovies,
  getComedyMovies,
  getWarMovies,
  getUserLists,
  addMovieToList,
} from '../services/services';

import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List.js';
import Error from '../components/Error.js';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  //   const [movie, setMovie] = useState('');
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [moviesSlider, setMoviesSlider] = useState([]);
  const [moviesImages, setMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [warMovies, setwarMovies] = useState([]);
  // const [popularTV, setPopularTV] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [refreshing, setIsRefreshing] = useState(false);

  const addMovieToListHandler = async (listId, movieId) => {
    const list = await addMovieToList(listId, movieId);
    if (list) {
      // eslint-disable-next-line no-alert
      alert('Movie added to list');
    }
  };
  const onRefresh = () => {
    setIsLoaded(false);
    getAuthInfo()
      .then(email => {
        if (email) {
          setIsLoggedIn(true);
        }
        getData(email).then(
          ([
            upcomingMoviesArr,
            popularMoviesArr,
            documentaryMoviesArr,
            familyMoviesArr,
            comedyMoviesArr,
            warMoviesArr,
            userListsArr,
          ]) => {
            // console.log(upcomingMoviesArr);
            const moviesImagesArray = upcomingMoviesArr.map(
              movieItem =>
                `https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`,
            );
            setMoviesSlider(upcomingMoviesArr);
            setMoviesImages(moviesImagesArray);
            setPopularMovies(popularMoviesArr);
            setDocumentaryMovies(documentaryMoviesArr);
            setFamilyMovies(familyMoviesArr);
            setComedyMovies(comedyMoviesArr);
            setwarMovies(warMoviesArr);
            setUserLists(userListsArr);
          },
        );
      })
      .catch(err => {
        console.log(err);
        setError(true);
      })
      .finally(() => setIsLoaded(true));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAuthInfo().then(data => {
        if (data) {
          setIsLoggedIn(true);

          getUserLists(data).then(lists => {
            setUserLists(lists);
          });
        } else {
          setIsLoggedIn(false);
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

  const getData = userEmail => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      // getPopularTV(),
      getDocumentaryMovies(),
      getFamilyMovies(),
      getComedyMovies(),
      getWarMovies(),
      getUserLists(userEmail),
    ]);
  };
  const getAuthInfo = async () => {
    return await AsyncStorage.getItem('email');
  };
  useEffect(() => {
    setIsLoaded(false);
    getAuthInfo()
      .then(email => {
        if (email) {
          setIsLoggedIn(true);
        }
        getData(email).then(
          ([
            upcomingMoviesArr,
            popularMoviesArr,
            documentaryMoviesArr,
            familyMoviesArr,
            comedyMoviesArr,
            warMoviesArr,
            userListsArr,
          ]) => {
            // console.log(upcomingMoviesArr);
            const moviesImagesArray = upcomingMoviesArr.map(
              movieItem =>
                `https://image.tmdb.org/t/p/w500/${movieItem.poster_path}`,
            );
            setMoviesSlider(upcomingMoviesArr);
            setMoviesImages(moviesImagesArray);
            setPopularMovies(popularMoviesArr);
            setDocumentaryMovies(documentaryMoviesArr);
            setFamilyMovies(familyMoviesArr);
            setComedyMovies(comedyMoviesArr);
            setwarMovies(warMoviesArr);
            setUserLists(userListsArr);
          },
        );
      })
      .catch(err => {
        console.log(err);
        setError(true);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  return (
    <React.Fragment>
      {isLoaded && !error && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                onCurrentImagePressed={index => {
                  navigation.navigate('Detail', {
                    movieDetail: moviesSlider[index],
                    lists: userLists,
                    isLoggedIn: isLoggedIn,
                    addMovieToListHandler: addMovieToListHandler,
                  });
                }}
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
                isLoggedIn={isLoggedIn}
                userLists={userLists}
                addMovieToList={addMovieToListHandler}
              />
            </View>
          )}

          {familyMovies.length > 0 && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
                isLoggedIn={isLoggedIn}
                userLists={userLists}
                addMovieToList={addMovieToListHandler}
              />
            </View>
          )}
          {documentaryMovies.length > 0 && (
            <View style={{...styles.carousel}}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
                isLoggedIn={isLoggedIn}
                userLists={userLists}
                addMovieToList={addMovieToListHandler}
              />
            </View>
          )}
          {comedyMovies.length > 0 && (
            <View style={{...styles.carousel}}>
              <List
                navigation={navigation}
                title="Comedy Movies"
                content={comedyMovies}
                isLoggedIn={isLoggedIn}
                userLists={userLists}
                addMovieToList={addMovieToListHandler}
              />
            </View>
          )}
          {warMovies.length > 0 && (
            <View style={{...styles.carousel, ...styles.carouselLast}}>
              <List
                navigation={navigation}
                title="War Movies"
                content={warMovies}
                isLoggedIn={isLoggedIn}
                userLists={userLists}
                addMovieToList={addMovieToListHandler}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!isLoaded && (
        <View style={styles.sliderContainer}>
          <ActivityIndicator size="large" color="gray" />
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
