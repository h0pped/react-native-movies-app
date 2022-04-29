import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Review from '../components/Review';
import {getMovieReviews} from '../services/services';

import StarRating from 'react-native-star-rating';

const Reviews = ({route, navigation}) => {
  const movieId = route.params.movieReviewsId;
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(null);

  const handleReviewSubmit = () => {
    console.log('review: ', {reviewText, reviewStars});
  };
  useEffect(() => {
    setIsLoading(true);
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
      <View>
        <View style={style.leaveRatingView}>
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
        </View>
        {!isLoading && reviews && reviews.length > 0 && (
          <>
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
    </>
  );
};
const style = StyleSheet.create({
  flatlistMargin: {
    paddingBottom: 50,
  },
  itemsContainer: {
    marginBottom: 100,
  },
  flatlist: {
    marginBottom: 50,
    flex: 1,
    justifyContent: 'center',
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
  },
});

export default Reviews;
