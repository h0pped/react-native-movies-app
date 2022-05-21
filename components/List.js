import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};
class List extends React.PureComponent {
  render() {
    const {
      navigation,
      title,
      content,
      ownList,
      removeList,
      ownListId,
      ownhandleRemoveMovieFromList,
      isLoggedIn,
      userLists,
      addMovieToList,
    } = this.props;
    return (
      <View style={styles.list}>
        <View style={styles.titleView}>
          <Text style={styles.text}>{title}</Text>
          {ownList && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                removeList(ownListId);
              }}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
        {console.log('IS LOGGED IN', isLoggedIn)}
        <View style={styles.flatList}>
          {content.length > 0 ? (
            <FlatList
              data={content}
              initialNumToRender={5}
              horizontal={true}
              renderItem={({item}) => (
                <Card
                  navigation={navigation}
                  item={item}
                  mainScreen
                  ownListCard={ownList}
                  deleteMovieFromList={ownhandleRemoveMovieFromList}
                  ownListId={ownListId}
                  isLoggedIn={isLoggedIn}
                  userLists={userLists}
                  addMovieToList={addMovieToList}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noMoviesText}>No movies in that list..</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deleteButton: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 5,
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  noMoviesText: {
    fontSize: 18,
    color: 'gray',
  },
  list: {
    marginTop: 40,
    marginBottom: 20,
    minWidth: '100%',
  },
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 20,
  },
});

List.propTypes = propTypes;
export default List;
