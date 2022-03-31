import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Color from '../Const/Color';
import Counter from './Counter';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Cartlist = ({
  image,
  title,
  price,
  quantity,
  action,
  singleid,
  increase,
  decrease,
  ids,
}) => {
  const [counter, setCounter] = useState(quantity);

  const addclicked = e => {
    setCounter(counter + 1);
    const data = {uniid: e, quantity: quantity};
    increase(data);
  };
  const minusclick = e => {
    setCounter(counter - 1);
    const data = {uniid: e, quantity: quantity};
    decrease(data);
  };
  return (
    <View style={styles.main}>
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
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Rubik-Medium',
            fontSize: 15,
            color: Color.PRIMARY,
            marginTop: 10,
            marginBottom: 10,
          }}>
          {`₹${price}`}
        </Text>

        <Counter
          width={80}
          height={20}
          fontsize={15}
          circle={18}
          color={Color.BLACK}
          add={() => addclicked(ids)}
          minus={() => minusclick(ids)}
          value={counter}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.cancel}>
          <TouchableOpacity onPress={() => action(singleid)}>
            <Ionicons name="close" size={30} color={Color.BLACK} />
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
export default Cartlist;
