import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

const Container = ({children}) => {
  return (
    <ScrollView>
      <View style={styles.wrapper}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});

export default Container;
