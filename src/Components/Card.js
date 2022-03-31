import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Color from '../Const/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
const Card = ({
  heigth,
  width,
  title,
  price,
  Heartadd,
  Heartremove,
  showoption,
  image,
  id,
}) => {
  const [heart, setHeart] = useState(false);

  const finalcheck = async () => {
    setHeart(!heart);
    setTimeout(() => {
      console.log(heart);
      change();
    }, 5000);
  };
  const navigation = useNavigation();
  const change = () => {
    if (heart === true) {
      console.log('ippa true but remove pannanum');
      Heartremove(title);
    }
    if (heart === false) {
      console.log('ippa false but add pannanum');
      Heartadd(title);
    }
  };

  // // heartcicked
  // const Heartclick = () => {
  //  chagestate();
  //  check();
  // };

  // const chagestate = () => {
  //   setHeart(!heart);
  // };

  // const check = () => {
  //   console.log(heart);
  //   if (heart === true) {
  //     console.log('ippa true and add');
  //   } else if (heart === false) {
  //     console.log('ippa false  remove');
  //   }
  // };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('detail', {id: id})}
      style={{
        height: heigth,
        width: width,
        backgroundColor: Color.CLEANWHITE,
        elevation: 5,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 20,
      }}>
      <View style={styles.imagecontainer}>
        <Image
          source={{uri: image}}
          style={{height: '100%', width: '100%', borderRadius: 20}}
        />
        {showoption ? (
          <View style={styles.cardicon}>
            <TouchableOpacity onPress={() => finalcheck()}>
              <Ionicons
                name={heart ? 'heart' : 'heart-outline'}
                size={20}
                color={Color.RED}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View style={styles.contant}>
        <Text
          style={{
            color: Color.BLACK,
            fontSize: 15,
            textAlign: 'center',
            color: Color.BLACK,
            fontFamily: 'Rubik-Medium',
          }}>
          {title}
        </Text>
        {showoption ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: Color.BLACK, fontFamily: 'Rubik-Light'}}>
              price {price}rs
            </Text>

            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: Color.PRIMARY,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Ionicons name={'add'} size={20} color={Color.CLEANWHITE} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: Color.BLACK,
                fontFamily: 'Rubik-Light',
              }}>
              price {price}rs
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 2,
    borderRadius: 20,
  },
  contant: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  hearts: {
    height: 30,
    width: 30,
    backgroundColor: Color.PRIMARY,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardicon: {
    width: '15%',
    height: '15%',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Color.CLEANWHITE,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
