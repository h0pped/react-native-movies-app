import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Home from './screens/Home';
// import {getPopularMovies} from './services/services';
const App = () => {
  // const arr = ['hello', 'there', 'Illia'];

  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
