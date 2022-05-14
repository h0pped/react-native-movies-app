import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native';
import List from '../components/List.js';
import {getAccountInfo, getUserLists} from '../services/services';
const Profile = ({route, navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const getAuthInfo = async () => {
    // return await AsyncStorage.removeItem('email');
    return await AsyncStorage.getItem('email');
  };
  const getLists = async email => {
    return await getUserLists(email);
  };
  const handleNewList = async () => {
    console.log(newList);
  };
  useEffect(() => {
    getAuthInfo().then(email => {
      if (email) {
        getAccountInfo(email)
          .then(res => {
            setAccountInfo(res.user);
          })
          .catch(err => {
            console.log(err);
          });
        setIsLoggedIn(true);
        getLists(email).then(res => {
          setLists(res);
        });
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
          getLists(email).then(res => {
            console.log('UPDATED');
            console.log(res);
            setLists(res);
            setIsLoggedIn(true);
          });
        } else {
          setIsLoggedIn(false);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);
  const onRefresh = () => {
    getAuthInfo().then(email => {
      if (email) {
        console.log(email);
        getLists(email).then(res => {
          console.log('UPDATED');
          console.log(res);
          setLists(res);
          setIsLoggedIn(true);
        });
      } else {
        setIsLoggedIn(false);
      }
    });
  };
  return (
    <View style={styles.authView}>
      {isLoggedIn && accountInfo && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* <Text style={styles.welcomeText}>Welcome, {accountInfo.name}!</Text> */}
          <Text style={{...styles.welcomeText, ...styles.mylistsText}}>
            My Lists
          </Text>
          <View style={styles.leaveRatingView}>
            <TextInput
              placeholder="List name"
              onChangeText={setNewList}
              value={newList}
              style={styles.textInput}
            />
            <TouchableOpacity
              // disabled={!reviewText || !reviewStars}
              // onPress={handleReviewSubmit}
              onPress={handleNewList}
              style={styles.reviewsButton}>
              <Text style={styles.buttonText}>Create new list!</Text>
            </TouchableOpacity>
          </View>
          {lists &&
            lists.map((list, index) => (
              <View key={list._id} style={styles.carousel}>
                <List
                  navigation={navigation}
                  title={list.title}
                  content={list.movies}
                />
              </View>
            ))}
        </ScrollView>
      )}
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
  reviewsButton: {
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    margin: 15,
    borderColor: 'transparent',
    borderRadius: 10,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
  },
  mylistsText: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  authView: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    padding: 10,
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
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselLast: {
    marginBottom: 70,
  },
});
export default Profile;
