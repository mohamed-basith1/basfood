import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import Color from '../Const/Color';

const Searchbar = ({onChangeText, value}) => {
  return (
    <View style={styles.main}>
      <Ionicons name="search-outline" size={20} color={Color.BLACK} />
      <TextInput
        placeholder="search"
        color={Color.BLACK}
        onChangeText={onChangeText}
        style={{width: '100%', color: Color.BLACK}}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: Color.CLEANWHITE,
    color: 'green',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
});
export default Searchbar;
