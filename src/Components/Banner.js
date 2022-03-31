import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Banner = ({image, title}) => {
  return (
    <View style={styles.main}>
      <Image
        source={image}
        style={{
          height: '100%',
          width: '100%',
          resizeMode: 'cover',
          borderRadius: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 130,
    width: 250,
    borderRadius: 10,

    marginHorizontal: 10,
  },
});

export default Banner;
