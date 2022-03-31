import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from '../../Screens/Signin';
import Signup from '../../Screens/Signup';
import Addressreg from '../../Screens/Addressreg';
import BottomStack from '../BottomStack/Bottomstack';
import Loader from '../../Screens/Loader';

const Authstack = () => {
  console.log('i am auth stack');
  const Auth = createNativeStackNavigator();
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name="loader" component={Loader} />
      <Auth.Screen
        name="signin"
        component={Signin}
        options={{gestureEnabled: false}}
      />
      <Auth.Screen name="signup" component={Signup} />
      <Auth.Screen name="addressreg" component={Addressreg} />
      <Auth.Screen name="bottomstack" component={BottomStack} />
    </Auth.Navigator>
  );
};

export default Authstack;
