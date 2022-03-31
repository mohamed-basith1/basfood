import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setting from '../../Screens/Setting';
import Edit from '../../Screens/Edit';
import Address from '../../Screens/Address';
import Orders from '../../Screens/Orders';
import Aboutus from '../../Screens/Aboutus';
import Support from '../../Screens/Support';

const SettingStack = () => {
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="account" component={Setting} />
      <stack.Screen name="edit" component={Edit} />
      <stack.Screen name="address" component={Address} />
      <stack.Screen name="orders" component={Orders} />
      <stack.Screen name="aboutus" component={Aboutus} />
      <stack.Screen name="support" component={Support} />
    </stack.Navigator>
  );
};

export default SettingStack;
