import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Home from './screens/Home';
import Detail from './screens/Detail';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {getPopularMovies} from './services/services';
const App = () => {
  // const arr = ['hello', 'there', 'Illia'];
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Detail" component={Detail} />
        {/* <View style={styles.container}> */}
        {/* <Home /> */}
        {/* </View> */}
      </Stack.Navigator>
    </NavigationContainer>
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
