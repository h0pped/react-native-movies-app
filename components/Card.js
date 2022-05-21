import React from 'react';

import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
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
      addMovieToList,
      ownListId,
      isLoggedIn,
      userLists,
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
        {!ownListCard && isLoggedIn && (
          <Menu style={styles.menu}>
            <MenuTrigger style={styles.menuTrigger}>
              <View style={styles.deleteButtonOpacity}>
                <Text style={styles.deleteText}>+</Text>
              </View>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
              {userLists &&
                userLists.length > 0 &&
                userLists.map(list => {
                  return (
                    <MenuOption
                      key={list._id}
                      onSelect={() => {
                        addMovieToList(list._id, item._id);
                      }}>
                      <Text style={styles.menuText}>{list.title}</Text>
                    </MenuOption>
                  );
                })}
              {userLists && userLists.length === 0 && (
                <MenuOption disabled>
                  <Text style={{...styles.menuText, ...styles.menuGrayText}}>
                    No Lists
                  </Text>
                </MenuOption>
              )}
            </MenuOptions>
          </Menu>
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
  menu: {
    zIndex: 999,
    marginLeft: 10,
  },
  menuTrigger: {
    zIndex: 1000,
  },
  menuOptions: {
    borderRadius: 80,

    fontSize: 20,
  },
  menuOption: {
    fontSize: 20,
  },
  menuText: {
    fontSize: 16,
    padding: 10,
  },
  menuGrayText: {
    color: 'gray',
  },
  deleteText: {
    fontWeight: 'bold',
  },
  cardView: {
    position: 'relative',
    marginRight: 10,
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
