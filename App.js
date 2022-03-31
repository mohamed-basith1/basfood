import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {Provider as PaperProvider} from 'react-native-paper';

import Mainstack from './src/Navigation/Mainstack.js';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <PaperProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Mainstack />
        </Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
