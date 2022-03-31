import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const Seperater = () => {
  return (
    <View>
      <View style={styles.space}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    marginVertical: 5,
  },
});
export default Seperater;
