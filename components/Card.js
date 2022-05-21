import React from 'react';

import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
const placeHolderImage = require('../assets/images/placeholder.png');

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
};
class Card extends React.PureComponent {
  render() {
    const {
      navigation,
      item,
      shortName,
      mainScreen,
      ownListCard,
      deleteMovieFromList,
      ownListId,
    } = this.props;
    return (
      <View style={styles.cardView}>
        {ownListCard && (
          <TouchableOpacity
            style={styles.deleteButtonOpacity}
            onPress={() => {
              deleteMovieFromList(ownListId, item._id);
            }}>
            <Text style={styles.deleteText}>-</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={
            mainScreen
              ? {...styles.container, ...styles.marginMain}
              : styles.container
          }
          onPress={() => {
            navigation.push('Detail', {movieDetail: item});
          }}>
          <Image
            style={styles.image}
            source={
              item.poster_path
                ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
                : placeHolderImage
            }
            resizeMode="cover"
          />
          <Text style={styles.text}>
            {item.title
              ? shortName
                ? item.title.slice(0, 15).trim() + '...'
                : item.title
              : item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deleteText: {
    fontWeight: 'bold',
  },
  cardView: {
    position: 'relative',
  },
  deleteButtonOpacity: {
    position: 'absolute',
    top: -0,
    right: -5,
    zIndex: 2,
    backgroundColor: '#006effd9',
    padding: 5,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 250,
  },
  marginMain: {
    marginLeft: 15,
  },
  text: {
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: '600',
    fontSize: 16,
    width: 170,
  },
  image: {
    height: 250,
    width: 170,
    borderRadius: 15,
  },
});

Card.propTypes = propTypes;
export default Card;
