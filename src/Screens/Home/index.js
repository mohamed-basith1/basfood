import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	StatusBar,
	FlatList,
	ScrollView,
	TouchableOpacity,
	Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../Const/Color';
import Seperater from '../../Components/Seperater';
import axios from '../../Api/axios';
import Card from '../../Components/Card';
import CircleCard from '../../Components/CircleCard';
import Banner from '../../Components/Banner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader';
import Axios from '../../Api/admin';

//damme data
const milkshakeicon = require('../../Assets/milkshakeicon.jpg');
const burgericon = require('../../Assets/burgericon.jpg');
const pizzaicon = require('../../Assets/pizzaicon.jpg');
const icecreamicon = require('../../Assets/icecreamicon.jpg');
const sandwichicon = require('../../Assets/sandwichicon.jpg');
const noodlesicon = require('../../Assets/noodlesicons.jpg');

const Home = () => {
	const [ userdetail, setUserDetails ] = useState([]);
	const [ getpopular, setPopular ] = useState([]);
	const [ getoffers, setOffers ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	useEffect(() => {
		getuserDetails();
	}, []);

	const getuserDetails = async () => {
		console.log('check');
		const email = await AsyncStorage.getItem('email');
		const data = { email: email };
		console.log(data);
		console.log('ippa user detaiol get start aagirukku');
		await axios.post('login/getdetails', data).then((res) => {
			console.log('ippa user detaails get panniruchu');
			setUserDetails(res.data);
			getpopularproduct();
		});

		setLoading(true);
	};

	const getpopularproduct = async () => {
		const data = { categories: 'popular' };
		console.log(data);
		const response = await Axios.post('/product/productcategories', data);
		setPopular(response.data);
	};
	const getoffersbanner = async () => {
		const data = { categories: 'offers' };
		console.log(data);
		const response = await Axios.post('/product/productcategories', data);
		setOffers(response.data);
	};

	const navigation = useNavigation();
	const Heartadd = (title) => {
		console.log('ippa addpannanum');
		console.log(title);
	};
	const Heartremove = (title) => {
		console.log('ippa remove pannaum');
		console.log(title);
	};

	const Sample = [
		{ title: 'milkshake', price: 50 },
		{ title: 'burgur', price: 60 },
		{ title: 'pizza', price: 70 },
		{ title: 'sandchic', price: 80 }
	];
	const sample2 = [
		{ title: 'milkshake', image: milkshakeicon },
		{ title: 'burger', image: burgericon },
		{ title: 'pizza', image: pizzaicon },
		{ title: 'noodles', image: noodlesicon },
		{ title: 'ice cream', image: icecreamicon },
		{ title: 'sandwich', image: sandwichicon }
	];
	const banners = [
		{ image: require('../../Assets/burgerbanner1.jpg') },
		{ image: require('../../Assets/pizzabanner.jpg') },
		{ image: require('../../Assets/burgerbanner.jpg') }
	];
	console.log(getpopular);
	return (
		<View style={styles.main}>
			<StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
			{loading ? (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View
						style={{
							backgroundColor: Color.PRIMARY,
							paddingTop: 80,
							paddingBottom: 30,
							paddingHorizontal: 10,
							borderBottomLeftRadius: 20,
							borderBottomRightRadius: 20
						}}
					>
						<View style={styles.title}>
							<View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center'
									}}
								>
									<Text
										style={{
											color: Color.CLEANWHITE,
											fontSize: 20,
											letterSpacing: 1,
											fontFamily: 'Rubik-Light'
										}}
									>
										hello ,{' '}
									</Text>

									<Text
										style={{
											color: Color.CLEANWHITE,
											fontSize: 30,
											letterSpacing: 1,
											fontFamily: 'Rubik-Medium'
										}}
									>
										{userdetail.username}
									</Text>
								</View>

								<Text
									style={{
										color: Color.CLEANWHITE,
										letterSpacing: 2,
										marginTop: 5,
										fontFamily: 'Rubik-Light'
									}}
								>
									welcome to my shop
								</Text>
							</View>
							<View style={styles.image}>
								<Image
									source={{ uri: userdetail.image }}
									style={{ width: '90%', height: '90%', borderRadius: 50 }}
								/>
							</View>
						</View>
						<Seperater />
						<Seperater />
						<Seperater />
						{/* search componant */}
						<Pressable onPress={() => navigation.navigate('search')}>
							<View style={styles.searchbar}>
								<Ionicons name="search-outline" size={20} color={Color.BLACK} />
								<Text style={{ color: Color.BLACK }}> search</Text>
							</View>
						</Pressable>
						{/* search componant */}
						<Seperater />
					</View>

					{/* sdnhjdshfhlsdfsdfld */}
					<Seperater />
					<Seperater />

					{/* categories component */}
					<View>
						<Text
							style={{
								fontFamily: 'Rubik-Medium',
								fontSize: 20,
								color: Color.BLACK,
								paddingLeft: 10
							}}
						>
							Categories
						</Text>
						<Seperater />
						<FlatList
							horizontal
							showsHorizontalScrollIndicator={false}
							data={sample2}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => navigation.navigate('categoriess', { title: item.title })}
								>
									<CircleCard title={item.title} image={item.image} />
								</TouchableOpacity>
							)}
						/>
					</View>
					<Seperater />
					<Seperater />
					<Seperater />
					<Seperater />
					{/* offerce compomnet */}
					<View>
						<Text
							style={{
								fontSize: 20,
								color: Color.BLACK,
								fontFamily: 'Rubik-Medium',
								paddingLeft: 10
							}}
						>
							Offerce
						</Text>
						<Seperater />
						<View>
							<FlatList
								data={banners}
								horizontal
								showsHorizontalScrollIndicator={false}
								renderItem={({ item }) => {
									return <Banner image={item.image} />;
								}}
							/>
						</View>
					</View>
					<Seperater />
					<Seperater />
					<Seperater />
					<Seperater />
					{/* 
        populer componant */}
					<View style={styles.offerce}>
						<Text
							style={{
								fontSize: 20,
								color: Color.BLACK,
								fontFamily: 'Rubik-Medium',
								paddingLeft: 10
							}}
						>
							Popular
						</Text>

						<FlatList
							data={getpopular}
							horizontal
							showsHorizontalScrollIndicator={false}
							renderItem={({ item }) => {
								return (
									<Card
										heigth={200}
										width={150}
										id={item.popid}
										image={item.image}
										price={item.price}
										title={item.productname}
									/>
								);
							}}
						/>
					</View>
				</ScrollView>
			) : (
				<Loader />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: Color.WHITE
		// padding: 10,
	},
	title: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	image: {
		backgroundColor: Color.CLEANWHITE,
		borderRadius: 50,
		height: 70,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 50
	},
	searchbar: {
		height: 40,
		paddingHorizontal: 10,
		backgroundColor: Color.CLEANWHITE,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		elevation: 5
	}
});

export default Home;
