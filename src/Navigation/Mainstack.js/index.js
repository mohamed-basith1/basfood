import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomStack from '../BottomStack/Bottomstack';
import Authstack from '../Authstack';
import Loader from '../../Components/Loader';

const Mainstack = () => {
	const Main = createNativeStackNavigator();
	console.log('i am main stack');
	return (
		<Main.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Main.Screen name="auth" component={Authstack} />
			<Main.Screen name="bottomstack" component={BottomStack} />
		</Main.Navigator>
	);
};

export default Mainstack;
