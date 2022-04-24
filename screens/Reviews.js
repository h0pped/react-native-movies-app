import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Review from '../components/Review';
import {getMovieReviews} from '../services/services';
const Reviews = ({route, navigation}) => {
  const movieId = route.params.movieReviewsId;
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(false);
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
        {!isLoading && reviews && reviews.length > 0 && (
          <FlatList
            numColumns={1}
            data={reviews}
            initialNumToRender={5}
            contentContainerStyle={style.flatlistMargin}
            renderItem={({item}) => <Review review={item} />}
            keyExtractor={item => item._id}
          />
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
    marginTop: 15,
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
});

export default Reviews;
