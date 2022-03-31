import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../../Screens/Favourite';

const FavouriteSatck = () => {
	const stack = createNativeStackNavigator();

	return (
		<stack.Navigator screenOptions={{ headerShown: false }}>
			<stack.Screen name="detail" component={Detail} />
		</stack.Navigator>
	);
};

export default FavouriteSatck;
