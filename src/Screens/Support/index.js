import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Svg, {Image} from 'react-native-svg';
const Support = () => {
  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <Text>Supporggkht</Text>
      <Svg width="80" height="80">
        <Image href={require('../../Assets/signup.svg')} />
      </Svg>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  imagecont: {
    height: '50%',
    width: '50%',
  },
});
export default Support;
