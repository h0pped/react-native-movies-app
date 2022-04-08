import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
const propTypes = {
  errorText1: PropTypes.string,
  errorText2: PropTypes.string,
};

class Error extends React.PureComponent {
  render() {
    const {
      errorText1 = 'Oops! Something went wrong.',
      errorText2 = 'Make sure you are online and restart the application',
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

Error.propTypes = propTypes;

export default Error;
