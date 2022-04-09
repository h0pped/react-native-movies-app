import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable
        style={styles.icon}
        onPress={() => {
          handlePress();
        }}>
        <Icon name="caret-forward-outline" color={'white'} size={30} />
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FC',
  },
});

export default PlayButton;
