import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/Home';

import search from '../../Screens/Search';
import Categories from '../../Screens/Categories';
import Detail from '../../Screens/Detail';

const HomeStack = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="home" component={Home} />

      <stack.Screen name="search" component={search} />
      <stack.Screen name="categoriess" component={Categories} />
      <stack.Screen name="detail" component={Detail} />
    </stack.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <drawer.Navigator>
      <drawer.Screen name="home5" component={HomeStack} />
    </drawer.Navigator>
  );
};

export default HomeStack;
