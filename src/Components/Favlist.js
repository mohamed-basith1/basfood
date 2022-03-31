import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Color from '../Const/Color';

import Ionicons from 'react-native-vector-icons/Ionicons';
const Favlist = ({productname, price, image, id, action}) => {
  return (
    <View style={styles.main} key={id}>
      <View style={styles.imagecont}>
        <Image
          source={{uri: image}}
          style={{height: '95%', width: '95%', borderRadius: 50}}
        />
      </View>
      <View style={styles.text}>
        <Text
          numberOfLines={2}
          style={{
            fontFamily: 'Rubik-Medium',
            fontSize: 15,
            color: Color.BLACK,
          }}>
          {productname}
        </Text>
        <Text
          style={{
            fontFamily: 'Rubik-Medium',
            fontSize: 15,
            color: Color.PRIMARY,
            marginTop: 10,
            marginBottom: 10,
          }}>
          ₹ {price}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.cancel}>
          <TouchableOpacity>
            <Ionicons
              name="close"
              size={30}
              color={Color.BLACK}
              onPress={() => {
                action(id);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.CLEANWHITE,
    borderRadius: 10,
    marginBottom: 10,
    height: 120,
    flexDirection: 'row',
  },
  imagecont: {
    backgroundColor: Color.CLEANWHITE,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    alignSelf: 'center',
    elevation: 10,
    borderRadius: 100,
    width: 80,
  },
  text: {
    padding: 20,
    flex: 2,
  },
  cancel: {
    position: 'absolute',
    right: 10,
    top: 9,
  },
});
export default Favlist;
