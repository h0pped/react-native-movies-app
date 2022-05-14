import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Card from '../components/Card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};
class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.flatList}>
          {content.length > 0 ? (
            <FlatList
              data={content}
              initialNumToRender={5}
              horizontal={true}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} mainScreen />
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
