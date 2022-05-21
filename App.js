import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Home from './screens/Home';
import Detail from './screens/Detail';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Search from './screens/Search';
import Profile from './screens/Profile';
import Reviews from './screens/Reviews';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import {MenuProvider} from 'react-native-popup-menu';
// import {getPopularMovies} from './services/services';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Detail" component={Detail} />
      <SearchStack.Screen name="Reviews" component={Reviews} />
    </HomeStack.Navigator>
  );
};
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Detail" component={Detail} />
      <SearchStack.Screen name="Reviews" component={Reviews} />
    </SearchStack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Sign in" component={SignIn} />
      <ProfileStack.Screen name="Sign up" component={SignUp} />
      <ProfileStack.Screen name="Detail" component={Detail} />
    </ProfileStack.Navigator>
  );
};
const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'ios-home' : 'ios-home-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'ios-search' : 'ios-search';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Search" component={SearchStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
export default App;
