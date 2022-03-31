import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Color from '../../Const/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from '../../Api/axios';

const Edit = ({ navigation, route }) => {
	const { username, image, email, phone, doorno, city, street, pincode } = route.params;
	const [ gallary, setGallary ] = useState('');
	console.log(username, image, email, phone, doorno, city, street, pincode);
	const Registerschema = yup.object().shape({
		phone: yup
			.number()
			.required('phone number is required')
			.max(10000000000, 'max 10 number only')
			.min(1000000000, 'phone number must be 10 numbers')
	});
	const numberstring = JSON.stringify(phone);
	const gallaryopen = () => {
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true
		}).then((image) => {
			console.log(image);
			setGallary(image);
		});
	};
	console.log(gallary);
	const editUpload = (value) => {
		console.log(email);
		console.log(value);
		if (value.phone !== numberstring || value.name !== username || gallary.length !== 0) {
			//ethu if image change aana intha fuction nadakum
			if (gallary.length !== 0) {
				console.log('ippa image firebase save pannanum');
				const ref = storage().ref('profileimages');
				const task = ref.putFile(gallary.path);
				const uploadimage = async () => {
					await task.then(async () => {
						const url = await ref.getDownloadURL();
						const data = {
							image: url,
							email: email
						};
						console.log(data);
						const response = await axios.put('/login/editimage', data);
						navigation.replace('auth', { screen: 'bottomstack' });
						//end of the if statement
					});
				};
				uploadimage();
			}
			if (value.phone !== numberstring || value.name !== username) {
				//image change agalana phone number illa user name chage aavhuna nadakum
				const update = async () => {
					const data = {
						email: email,
						phone: value.phone,
						username: value.name,
						doorno: doorno,
						street: street,
						city: city,
						pincode: pincode
					};
					const response = await axios.put('/login/editdetails', data);

					console.log(response.data);
				};
				update();
				navigation.replace('auth', { screen: 'bottomstack' });
			}
		} else {
			console.log('entha change aagala');
			navigation.goBack();
		}
	};
	return (
		<Formik
			initialValues={{
				phone: numberstring,

				name: username
			}}
			validateOnMount={true}
			validationSchema={Registerschema}
			onSubmit={(values) => editUpload(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
				<View style={styles.main}>
					<View style={styles.header}>
						<View
							style={{
								height: 30,
								width: 30,
								textAlign: 'center',
								borderRadius: 50,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: Color.CLEANWHITE
							}}
						>
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Ionicons
									name="chevron-back"
									style={{ textAlign: 'center' }}
									color={Color.BLACK}
									size={20}
								/>
							</TouchableOpacity>
						</View>
						<View>
							<Text
								style={{
									color: Color.CLEANWHITE,
									fontFamily: 'Rubik-Medium',
									fontSize: 20
								}}
							>
								Edit Profile
							</Text>
						</View>
						<View>
							<TouchableOpacity onPress={handleSubmit}>
								<Text style={{ fontFamily: 'Rubik-Medium', color: Color.CLEANWHITE }}>Save</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.imageconatiner}>
						<View
							style={{
								height: 140,
								width: 140,
								borderRadius: 100,
								backgroundColor: Color.CLEANWHITE,
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative'
							}}
						>
							{gallary.length === 0 ? (
								<Image
									source={{ uri: image }}
									style={{ height: '95%', width: '95%', borderRadius: 100 }}
								/>
							) : (
								<Image
									source={{ uri: gallary.path }}
									style={{ height: '95%', width: '95%', borderRadius: 100 }}
								/>
							)}

							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									position: 'absolute',
									bottom: 0,
									right: 10,
									backgroundColor: Color.LIGHTGRAY,
									height: 30,
									width: 30,
									borderRadius: 100
								}}
							>
								{/* camere button to accest the gallary */}
								<TouchableOpacity onPress={() => gallaryopen()}>
									<Ionicons name="camera" size={20} color={Color.PRIMARY} />
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={styles.contant}>
						<Text
							style={{
								fontFamily: 'Rubik-Light',
								fontSize: 15,
								letterSpacing: 1,
								color: Color.DARKGRAY
							}}
						>
							Username
						</Text>
						<View
							style={{
								borderRadius: 5,
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<Ionicons name="person-outline" size={15} color={Color.BLACK} />
							<TextInput
								autoCorrect={false}
								placeholder="Enter Your Name"
								defaultValue={values.name}
								onChangeText={handleChange('name')}
								style={{
									fontFamily: 'Rubik-Light',
									paddingHorizontal: 10,
									width: '100%'
								}}
							/>
						</View>
						<View
							style={{
								height: 1,
								width: '100%',
								backgroundColor: Color.PRIMARY
							}}
						/>

						{/* phone numer */}

						<Text
							style={{
								fontFamily: 'Rubik-Light',
								fontSize: 15,
								letterSpacing: 1,
								marginTop: 30,
								color: Color.DARKGRAY
							}}
						>
							Phone
						</Text>
						<View
							style={{
								borderRadius: 5,
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<Ionicons name="call-outline" size={15} color={Color.BLACK} />
							<TextInput
								autoCorrect={false}
								placeholder="Enter Your Number"
								defaultValue={values.phone}
								onChangeText={handleChange('phone')}
								onBlur={handleBlur('phone')}
								style={{
									fontFamily: 'Rubik-Light',
									paddingHorizontal: 10,
									width: '100%'
								}}
							/>
						</View>
						<View style={{ height: 1, width: '100%', backgroundColor: Color.PRIMARY }} />
						<Text style={{ fontFamily: 'Rubik-Light', color: Color.RED }}>
							{errors.phone && touched.phone && errors.phone}
						</Text>
					</View>
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	main: {
		backgroundColor: Color.PRIMARY,
		flex: 1
	},
	contant: {
		backgroundColor: Color.WHITE,
		flex: 1,
		top: 140,
		padding: 20
	},
	imageconatiner: {
		justifyContent: 'center',
		alignItems: 'center',
		top: 100
	},
	header: {
		flexDirection: 'row',
		top: 60,
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		alignItems: 'flex-end'
	}
});

export default Edit;
