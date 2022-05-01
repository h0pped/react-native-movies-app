import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import {searchMovies} from '../services/services';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';

const Search = ({navigation}) => {
  const flatListRef = React.useRef();
  const [items, setItems] = useState(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (input) {
        try {
          const movies = await searchMovies(input);
          setItems(movies);
          console.log(movies);
          if (movies.length > 0) {
            flatListRef.current.scrollToOffset({animated: true, offset: 0});
          }
        } catch (err) {
          setError(err.message);
        }
      } else {
        setItems(null);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [input]);
  return (
    <React.Fragment>
      <SafeAreaView>
        <View>
          <TextInput
            onChangeText={setInput}
            value={input}
            style={style.input}
            placeholder={'Search'}
          />
        </View>
        <View style={style.itemsContainer}>
          {items && items.length > 0 && (
            <FlatList
              ref={flatListRef}
              numColumns={2}
              data={items}
              columnWrapperStyle={style.flatlist}
              contentContainerStyle={style.flatlistMargin}
              renderItem={({item}) => (
                <Card
                  navigation={navigation}
                  item={item}
                  style={style.card}
                  shortName={true}
                />
              )}
              keyExtractor={item => item._id}
            />
          )}
          {items && items.length === 0 && (
            <View style={style.noItemsView}>
              <Text style={style.textGray}>
                No results matching your criteria
              </Text>
            </View>
          )}
          {error && (
            <View style={style.noItemsView}>
              <Text style={style.textGray}>{error}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  input: {
    margin: 15,
    height: 50,
    borderColor: 'transparent',
    borderRadius: 10,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
  },
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
  noItemsView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  textGray: {
    color: '#37373b',
  },
});

export default Search;
