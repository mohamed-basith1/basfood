import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {io} from 'socket.io-client';
const Checktiger = () => {
  const [change, setChange] = useState('basith');

  useEffect(() => {
    trigerfunction();
  });
  const trigerfunction = () => {
    const socket = io(
      'http://9a00-2409-4072-631b-4531-d1e5-1032-43b9-f585.ngrok.io',
    );

    socket.on('addtocart', data => {
      console.log(data);
      setChange(data);
    });
  };

  return (
    <View>
      <Text>{change}</Text>
    </View>
  );
};

export default Checktiger;
