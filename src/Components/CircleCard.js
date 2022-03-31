import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Color from '../Const/Color';

const CircleCard = ({image, title}) => {
  return (
    <View style={styles.main}>
      <View style={styles.circles}>
        <Image
          source={image}
          style={{
            height: '90%',
            width: '90%',

            borderRadius: 50,
          }}
        />
      </View>

      <Text style={{fontFamily: 'Rubik-Light', color: Color.BLACK, top: 10}}>
        {' '}
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 140,
    width: 100,
    paddingHorizontal: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  circles: {
    height: 70,
    width: 70,
    borderRadius: 100,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.CLEANWHITE,
  },
});

export default CircleCard;
