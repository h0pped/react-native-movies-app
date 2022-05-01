import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import {signIn} from '../services/services';
const SignIn = ({navigation}) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [isError, setIsError] = useState(false);

  const handleEmailInput = e => {
    setInput(prevState => ({
      ...prevState,
      email: e.toLowerCase(),
    }));
  };
  const handlePasswordInput = e => {
    setInput(prevState => ({
      ...prevState,
      password: e,
    }));
  };
  const handleSignIn = async () => {
    try {
      const res = await signIn(input);
      AsyncStorage.setItem('email', res.user.email);
      setIsError(false);
      console.log(navigation);
      navigation.navigate('Profile');
    } catch (err) {
      setIsError(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          onChangeText={handleEmailInput}
          value={input.emal}
          style={styles.input}
          placeholder={'Email'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          onChangeText={handlePasswordInput}
          value={input.password}
          style={styles.input}
          placeholder={'Password'}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.authButton}
          disabled={!input.email || !input.password}
          onPress={() => {
            handleSignIn();
          }}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
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
  input: {
    margin: 15,
    marginTop: 0,
    height: 50,
    width: '93%',
    borderColor: 'transparent',
    borderRadius: 10,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    textAlign: 'center',
  },
});

export default SignIn;
