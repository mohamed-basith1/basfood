import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Checkout from '../../Screens/Checkout';
import Cart from '../../Screens/Cart';

const CartStack = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="cart" component={Cart} />
      <stack.Screen name="checkout" component={Checkout} />
    </stack.Navigator>
  );
};

export default CartStack;
