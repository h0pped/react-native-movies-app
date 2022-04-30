import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  LogBox,
} from 'react-native';
import Review from '../components/Review';
import {getMovieReviews, postMovieReview} from '../services/services';

import StarRating from 'react-native-star-rating';

const Reviews = ({route, navigation}) => {
  const movieId = route.params.movieReviewsId;
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleReviewSubmit = async () => {
    console.log('review: ', {reviewText, reviewStars});
    const review = {
      content: reviewText.trim(),
      vote: reviewStars,
      user_email: await AsyncStorage.getItem('email'),
      movie_id: movieId,
    };
    const reviewRes = await postMovieReview(review);
    console.log(reviewRes);
    if (reviewRes) {
      setReviewText('');
      setReviewStars(null);
      // setReviews(reviewRes);
      setReviews([reviewRes, ...reviews]);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    setIsLoading(true);
    const getAuthInfo = async () => {
      return await AsyncStorage.getItem('email');
    };
    getAuthInfo().then(email => {
      if (email) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    getMovieReviews(movieId)
      .then(res => {
        setReviews(res.reviews);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [movieId]);
  return (
    <>
      <ScrollView>
        <View>
          {!isLoading && reviews && (
            <>
              <View style={style.leaveRatingView}>
                {isLoggedIn ? (
                  <>
                    <TextInput
                      placeholder="Leave your review"
                      onChangeText={setReviewText}
                      value={reviewText}
                      style={style.textInput}
                      numberOfLines={5}
                      multiline
                    />
                    <StarRating
                      containerStyle={style.starsContainerStyle}
                      buttonStyle={style.starStyle}
                      starStyle={style.starIconStyle}
                      starSize={25}
                      maxStars={5}
                      rating={reviewStars}
                      selectedStar={rating => setReviewStars(rating)}
                    />
                    <TouchableOpacity
                      disabled={!reviewText || !reviewStars}
                      onPress={handleReviewSubmit}
                      style={style.reviewsButton}>
                      <Text style={style.buttonText}>Leave your review!</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={style.loginText}>Sign in to leave a review</Text>
                )}
              </View>
              <Text style={style.reviewsText}>Other Reviews</Text>
              <FlatList
                numColumns={1}
                data={reviews}
                initialNumToRender={5}
                contentContainerStyle={style.flatlistMargin}
                renderItem={({item}) => <Review review={item} />}
                keyExtractor={item => item._id}
              />
            </>
          )}
          {!isLoading && (!reviews || reviews.length === 0) && (
            <View style={style.noReviewsView}>
              <Text style={style.noReviewsText}>
                Unfortunately, there are no reviews for that movie
              </Text>
            </View>
          )}
          {isError && (
            <View style={style.noReviewsView}>
              <Text style={style.noReviewsText}>Some error occured.</Text>
            </View>
          )}
          {isLoading && <ActivityIndicator size="large" />}
        </View>
      </ScrollView>
    </>
  );
};
const style = StyleSheet.create({
  itemsContainer: {
    marginBottom: 100,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: -20,
  },
  flatlist: {
    marginBottom: 50,
    // flex: 1,
    // justifyContent: 'center',
  },
  noReviewsView: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noReviewsText: {
    fontSize: 16,
  },
  textInput: {
    margin: 15,
    borderColor: 'transparent',
    borderRadius: 10,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
  },
  starStyle: {
    width: 50,
  },
  starsContainerStyle: {
    marginTop: 5,
    alignSelf: 'center',
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
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewsText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default Reviews;
