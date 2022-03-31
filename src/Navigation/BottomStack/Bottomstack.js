import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../StackNavigater/HomeStack';
import CartStack from '../StackNavigater/CartStack';
import FavoriteStack from '../StackNavigater/FavoriteStack';
import SettingStack from '../StackNavigater/SettingStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../Const/Color';
import Cart from '../../Screens/Cart';
import axios from '../../Api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const BottomStack = ({ route }) => {
	const tab = createBottomTabNavigator();
	const [ cartcount, setcartcount ] = useState(0);
	const [ favcount, setfavcount ] = useState(0);

	useEffect(() => {
		getcount();
	}, []);
	const cart = useSelector((state) => state.cart.cart);
	const fav = useSelector((state) => state.fav.fav);

	const getcount = async () => {
		const email = await AsyncStorage.getItem('email');
		const data = { email: email };
		const response1 = await axios.post('/login/getcart', data);
		setcartcount(response1.data.length);
		const response = await axios.post('/login/getfav', data);
		setfavcount(response.data.length);
	};
	if (cart.length != 1) {
		getcount();
	}
	if (fav.length != 1) {
		getcount();
	}

	return (
		<tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 55,
					elevation: 0,
					borderTopWidth: 0,
					backgroundColor: Color.WHITE
				},
				tabBarActiveTintColor: Color.PRIMARY,
				tabBarInactiveTintColor: Color.DARKGRAY
			}}
		>
			<tab.Screen
				name="Home"
				component={HomeStack}
				options={{
					tabBarIcon: ({ color }) => {
						return <Ionicons name={'home'} size={25} color={color} />;
					}
				}}
			/>

			<tab.Screen
				name="Cart"
				component={CartStack}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name={'cart'} size={25} color={color} />,
					tabBarBadgeStyle: {
						backgroundColor: Color.PRIMARY,
						color: Color.CLEANWHITE
					},
					tabBarBadge: cartcount === 0 ? null : cartcount
				}}
			/>
			<tab.Screen
				name="Favorite"
				component={FavoriteStack}
				options={{
					tabBarIcon: ({ color }) => {
						return <Ionicons name={'heart-half'} size={25} color={color} />;
					},
					tabBarBadgeStyle: {
						backgroundColor: Color.PRIMARY,
						color: Color.CLEANWHITE
					},
					tabBarBadge: favcount === 0 ? null : favcount
				}}
			/>
			<tab.Screen
				name="Setting"
				component={SettingStack}
				options={{
					tabBarIcon: ({ color }) => {
						return <Ionicons name={'cog'} size={25} color={color} />;
					}
				}}
			/>
		</tab.Navigator>
	);
};

const styles = StyleSheet.create({});

export default BottomStack;
