import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMovie, getSimilarMovies} from '../services/services.js';
import PlayButton from '../components/PlayButton.js';
import Video from '../components/Video.js';
import List from '../components/List.js';

const placeHolderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const extractYear = date => date.split('-')[0];

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieDetail._id;
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const videoShown = () => {
    setModalVisible(true);
  };
  const videoHidden = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setLoaded(false);

    getMovie(movieId).then(movie => {
      const m = {
        ...movie.movie,
        avg: movie.avg,
      };
      setMovieDetail(m);
      setLoaded(true);
    });
    getSimilarMovies(movieId).then(moviesArr => {
      setSimilarMovies(moviesArr);
    });
  }, [movieId]);
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        `https://image.tmdb.org/t/p/w500` +
                        movieDetail.poster_path,
                    }
                  : placeHolderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton
                  handlePress={() => {
                    setModalVisible(true);
                  }}
                />
              </View>
              <Text style={styles.movieTitle}>
                {movieDetail.title} ({extractYear(movieDetail.release_date)})
              </Text>
              <StarRating
                buttonStyle={styles.starStyle}
                starSize={25}
                maxStars={5}
                rating={movieDetail.avg}
              />
              {movieDetail.genres && (
                <View style={styles.genres}>
                  {movieDetail.genres.slice(0, 3).map(genre => {
                    return <Text style={styles.genre}>{genre.name} </Text>;
                  })}
                </View>
              )}
              <Text style={styles.country}>{movieDetail.countries[0]}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Type:</Text> Movie
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Creator:</Text> Vince Gilligan
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Producers:</Text> Melissa
                Bernstein, Vince Gilligan, Mark Johnson
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Operators:</Text> Michael Slovis,
                Reinaldo Villalobos, Arthur Albert
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.boldText}>Stars:</Text> Bryan Cranston,
                Aaron Paul
              </Text>
            </View>
            <View style={styles.movieDescription}>
              <Text>{movieDetail.description}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.awardsTitle}>Awards</Text>
              <View style={styles.awardsList}>
                <Text style={styles.award}>Top rated movie #13</Text>
                <Text style={styles.award}>Won 4 oscars</Text>
                <Text style={styles.award}>
                  157 wins & 220 nominations total
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.reviewsButton}
                onPress={() => {
                  navigation.navigate('Reviews', {
                    movieReviewsId: movieId,
                  });
                }}>
                <Text style={styles.buttonText}>Open Reviews</Text>
              </TouchableOpacity>
            </View>
            <View style={{...styles.carousel, ...styles.carouselLast}}>
              <List
                navigation={navigation}
                title="Similar Movies"
                content={similarMovies}
              />
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            visible={modalVisible}
            supportedOrientations={['portrait', 'landscape']}>
            <View style={styles.videoModal}>
              <Video onClose={videoHidden} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: '100%',
    textAlign: 'left',
    padding: 10,
    marginTop: 10,
  },
  playButton: {
    position: 'absolute',
    top: -30,
    right: 20,
  },
  movieDescription: {
    padding: 10,
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  image: {
    height: height * 0.5,
    width: '100%',
    borderRadius: 0,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  movieYear: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  genres: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  genre: {
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    fontWeight: '600',
  },
  country: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  awardsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  awardsList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  award: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  reviewsButton: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '93%',
    height: 50,
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  starStyle: {
    marginRight: 10,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselLast: {
    marginBottom: 20,
  },
});

export default Detail;
