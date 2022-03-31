import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Color from '../Const/Color';

const Loader = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <ActivityIndicator color={Color.PRIMARY} />
    </View>
  );
};

export default Loader;
