import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const Profile = ({route, navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getAuthInfo = async () => {
    // return await AsyncStorage.removeItem('email');
    return await AsyncStorage.getItem('email');
  };
  useEffect(() => {
    getAuthInfo().then(email => {
      if (email) {
        console.log(email);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAuthInfo().then(email => {
        if (email) {
          console.log(email);

          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.authView}>
      {isLoggedIn && <Text>Profile</Text>}
      {!isLoggedIn && (
        <View style={styles.authView}>
          <Text style={styles.authText}>Welcome!</Text>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => {
              navigation.navigate('Sign in');
            }}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Don't have account?</Text>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => {
              navigation.navigate('Sign up');
            }}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  authView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  authText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  orText: {
    marginVertical: 15,
  },
  authButton: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '93%',
    height: 50,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
export default Profile;
