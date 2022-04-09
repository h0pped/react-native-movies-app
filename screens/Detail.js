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
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMovie} from '../services/services.js';
import PlayButton from '../components/PlayButton.js';
import Video from '../components/Video.js';

const placeHolderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const extractYear = date => date.split('-')[0];

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieDetail.id;
  const [movieDetail, setMovieDetail] = useState(null);
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
      setMovieDetail(movie);
      setLoaded(true);
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
              <StarRating maxStars={5} rating={movieDetail.vote_average / 2} />
              {movieDetail.genres && (
                <View style={styles.genres}>
                  {movieDetail.genres.slice(0, 3).map(genre => {
                    return <Text style={styles.genre}>{genre.name} </Text>;
                  })}
                </View>
              )}
              <Text style={styles.country}>
                {movieDetail.production_countries[0].name}
              </Text>
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
              <Text>{movieDetail.overview}</Text>
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
});

export default Detail;
