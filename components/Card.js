import React from 'react';

import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
const placeHolderImage = require('../assets/images/placeholder.png');

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
};
class Card extends React.PureComponent {
  render() {
    const {navigation, item, shortName, mainScreen} = this.props;
    return (
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
    );
  }
}

const styles = StyleSheet.create({
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
