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
  const movie = {
    _id: '625bf2ffc7da237ebbf570e2',
    title: 'Spider-Man: No Way Home',
    description:
      'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
    poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    release_date: '2021-12-15',
    vote_average: 0,
    genres: [
      {
        _id: '625be0c31de7de99886d3633',
        name: 'Action',
        __v: 0,
      },
      {
        _id: '625be0c31de7de99886d3634',
        name: 'Adventure',
        __v: 0,
      },
      {
        _id: '625be0c31de7de99886d3641',
        name: 'Science Fiction',
        __v: 0,
      },
    ],
    __v: 0,
    countries: ['USA'],
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (input) {
        const movies = await searchMovies(input);
        setItems(movies);
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
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
});

export default Search;
