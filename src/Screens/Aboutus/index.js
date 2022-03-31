import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Color from '../../Const/Color';
import * as Animatable from 'react-native-animatable';
const Aboutus = () => {
  const {height, width} = Dimensions.get('window');
  const Height = height / 4;
  console.log(Height, width);
  return (
    <View style={styles.main}>
      <Animatable.View
        animation="bounceInLeft"
        delay={100}
        style={{height: Height, width: Height}}>
        <Image
          source={require('../../Assets/bastylogo.png')}
          style={{height: '100%', width: '100%'}}
        />
      </Animatable.View>
      <Animatable.Text
        animation="bounceInRight"
        delay={300}
        style={{
          fontSize: 50,
          fontFamily: 'Yellowtail-Regular',
          color: Color.CLEANWHITE,
          marginTop: -40,
        }}>
        Basfood...
      </Animatable.Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Aboutus;
