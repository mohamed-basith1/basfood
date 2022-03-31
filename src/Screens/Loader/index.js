import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import Color from '../../Const/Color';
import axios from '../../Api/axios';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

const Loader = () => {
  const navigation = useNavigation();
  console.log('i am loader screen to check the token');
  useEffect(() => {
    checktoken();
  }, []);
  console.log('ethu work agguthu');
  const {height, width} = Dimensions.get('window');
  const Height = height / 4;
  console.log(Height, width);
  const checktoken = async () => {
    setTimeout(() => {
      time();
    }, 1000);
    const time = async () => {
      const token = await AsyncStorage.getItem('token');

      navigation.replace('signin');
      if (token) {
        // console.log('ippa email and token check pass');
        // const data = {email: email};
        // const response = await axios.post('/login/getdetails', data);
        // console.log(response.data);
        //intha yadathula email vachu user details yaduthu paramsla send panni vadanum
        navigation.replace('bottomstack');
      } else {
        navigation.replace('signin');
      }
    };
  };

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      {/* <ActivityIndicator
        animating={true}
        color={Color.PRIMARY}
        style={{height: 300, width: 300}}
      /> */}
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
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.PRIMARY,
  },
});
export default Loader;
