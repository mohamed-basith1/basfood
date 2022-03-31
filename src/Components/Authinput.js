import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../Const/Color';

const Authinput = ({label, icon, value, onchange, placeholder, margin}) => {
  return (
    <View style={{width: '80%', marginTop: margin}}>
      <Text
        style={{
          fontFamily: 'Rubik-Light',
          fontSize: 15,
          letterSpacing: 1,
          color: Color.DARKGRAY,
        }}>
        {label}
      </Text>
      <View
        style={{
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon name={icon} size={15} color={Color.BLACK} />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onchange}
          style={{
            fontFamily: 'Rubik-Light',
            paddingHorizontal: 10,
            width: '100%',
          }}
        />
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Color.PRIMARY,
        }}></View>
    </View>
  );
};

export default Authnput;
