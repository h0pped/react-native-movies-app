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

import {signUp} from '../services/services';
const SignUp = ({navigation}) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    gender: '',
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
  const handleNameInput = e => {
    setInput(prevState => ({
      ...prevState,
      name: e,
    }));
  };
  const handleSurnameInput = e => {
    setInput(prevState => ({
      ...prevState,
      surname: e,
    }));
  };

  const handleSignUp = async () => {
    try {
      const res = await signUp(input);
      AsyncStorage.setItem('email', res.user.email);
      setIsError(false);
      console.log('SIGN UP', res);
      navigation.navigate('Profile');
    } catch (err) {
      setIsError(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          onChangeText={handleNameInput}
          value={input.name}
          style={styles.input}
          placeholder={'John'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Surname</Text>
        <TextInput
          onChangeText={handleSurnameInput}
          value={input.surname}
          style={styles.input}
          placeholder={'Doe'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          onChangeText={handleEmailInput}
          keyboardType={'email-address'}
          value={input.email}
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
          disabled={
            !input.email || !input.password || !input.name || !input.surname
          }
          onPress={() => {
            handleSignUp();
          }}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dialogTitle: {
    backgroundColor: '#F7F7F8',
  },
  popupText: {
    textAlign: 'center',
    marginTop: 15,
  },

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

export default SignUp;
