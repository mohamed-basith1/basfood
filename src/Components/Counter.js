import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Color from '../Const/Color';

const Counter = ({
  height,
  width,
  add,
  minus,
  value,
  fontsize,
  circle,
  color,
}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: Color.PRIMARY,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => minus()} disabled={value === 1}>
        <Text
          style={{
            fontFamily: 'Rubik-Medium',
            fontSize: fontsize,
            color: color,
          }}>
          -
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: Color.CLEANWHITE,
          width: circle,
          height: circle,
          color: color,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        }}>
        <Text style={{fontFamily: 'Rubik-Medium', fontSize: 15, color: color}}>
          {value}
        </Text>
      </View>

      <TouchableOpacity onPress={() => add()}>
        <Text
          style={{
            fontFamily: 'Rubik-Medium',
            fontSize: fontsize,
            color: color,
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Counter;
