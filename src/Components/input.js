import React from 'react';
import {View, Text, TextInput, Touchable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../Const/Color';

const Input = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  margin,
  password,
}) => {
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
          secureTextEntry={password}
          onChangeText={onChangeText}
          style={{
            fontFamily: 'Rubik-Light',
            paddingHorizontal: 10,
            width: '100%',
            color: Color.BLACK,
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

export default Input;
