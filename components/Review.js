import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import StarRating from 'react-native-star-rating';

class Review extends React.PureComponent {
  render() {
    const {navigation, review} = this.props;
    const height = Dimensions.get('screen').height;
    const width = Dimensions.get('screen').width;
    const styles = StyleSheet.create({
      reviewList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      containerStyle: {
        width: width * 0.5,
        marginRight: 15,
      },
      userName: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 5,
      },
      ratingView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ratingDate: {
        color: '#6a6a75',
        fontSize: 14,
      },
      reviewContent: {
        marginTop: 10,
      },
    });
    return (
      <View style={styles.reviewList}>
        <Text style={styles.userName}>{review.username}</Text>
        <View style={styles.ratingView}>
          <StarRating
            containerStyle={styles.containerStyle}
            buttonStyle={styles.starStyle}
            starSize={30}
            maxStars={5}
            rating={review.vote}
          />
          <Text style={styles.ratingDate}>
            {new Date(review.review_date).toLocaleDateString('en-US')}
          </Text>
        </View>
        <Text style={styles.reviewContent}>{review.content}</Text>
      </View>
    );
  }
}

export default Review;
