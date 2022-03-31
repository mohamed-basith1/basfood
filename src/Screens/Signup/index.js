import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Input from '../../Components/input';
import Color from '../../Const/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import uuid from 'react-native-uuid';
import axios from '../../Api/axios';
import ImagePicker from 'react-native-image-crop-picker';
import Imageprofile from '../../Assets/image.png';
import storage from '@react-native-firebase/storage';

const Signup = ({route}) => {
  const [emailerror, setEmailerror] = useState('');
  const [loader, setLoader] = useState(false);
  const [gallary, setGallary] = useState('');
  const [urls, setUrls] = useState('');
  const navigation = useNavigation();

  const {phone, doorno, street, city, pincode} = route.params;
  const uniqueid = uuid.v4();
  // valiadttionschema
  const Signinschema = yup.object().shape({
    email: yup.string('').email('invalid Email').required('Email is required'),
    password: yup
      .string()
      .min(8, ({min}) => 'Password must be atleast 8 characters')
      .required('password is required'),
    name: yup.string().required('Name is required'),
  });

  //   asynce storage to change the true in app compoinnet
  const signup = async values => {
    setLoader(true);
    const emaildata = {email: values.email};

    try {
      const response = await axios.post('/login/signupcheck', emaildata);
      console.log(response.data);
      if (response.data === 'success') {
        //imga image upload pannaum
        const path = 'profileimage' + gallary.path;
        const ref = storage().ref(path);
        const task = ref.putFile(gallary.path);
        await task.then(async () => {
          const url = await ref.getDownloadURL();
          const data = {
            phone: phone,
            doorno: doorno,
            image: url,
            street: street,
            city: city,
            pincode: pincode,
            username: values.name,
            email: values.email.toLowerCase(),
            password: values.password,
            id: uniqueid,
          };
          console.log(data);

          const response = await axios.post('/login/signup', data);
          console.log(response.data);
          const data2 = {email: values.email.toLowerCase()};
          console.log('inga nikkithu');
          const response2 = await axios.post('/history/createhistory', data2);
          console.log(response2.data);
          await AsyncStorage.setItem('token', response.data);
          await AsyncStorage.setItem('email', values.email.toLowerCase());
          navigation.replace('bottomstack');

          //end of the if statement
        });
      }
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Request failed with status code 404') {
        setEmailerror('Email is already used');
        setLoader(false);
      }
      setTimeout(() => {
        setEmailerror('');
      }, 3000);
    }
  };

  const galaryopen = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setGallary(image);
    });
  };

  const [eye, setEye] = useState(true);
  return (
    <Formik
      initialValues={{email: '', password: '', name: ''}}
      validateOnMount={true}
      validationSchema={Signinschema}
      onSubmit={values => signup(values)}>
      {({handleChange, handleBlur, handleSubmit, touched, errors, values}) => (
        <View style={styles.main}>
          <StatusBar
            translucent
            backgroundColor="rgba(0,0,0,0)"
            barStyle="dark-content"
          />

          <View style={styles.imagecont}>
            <TouchableOpacity onPress={() => galaryopen()}>
              <View
                style={{
                  backgroundColor: Color.LIGHTGRAY,
                  height: 130,
                  width: 130,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {gallary.length === 0 ? (
                  <Image
                    source={Imageprofile}
                    style={{height: '50%', width: '50%', borderRadius: 100}}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={{uri: gallary.path}}
                    style={{height: '100%', width: '100%', borderRadius: 100}}
                    resizeMode="cover"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* login register  username*/}
          <View style={{marginTop: 30}}>
            <Input
              label={'User name'}
              icon={'user-alt'}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Enter your name"
              margin={30}
            />
            <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
            <View>
              <Text style={{color: Color.RED, marginTop: 10}}>
                {errors.name && touched.name && errors.name}
              </Text>
            </View>
            {/* login register  email*/}
            <Input
              label={'Email'}
              icon={'mail-bulk'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter your email"
              margin={30}
            />
            <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
            <View>
              <Text style={{color: Color.RED, marginTop: 10}}>
                {errors.email && touched.email && errors.email}
                {emailerror.length !== 0 && emailerror}
              </Text>
            </View>
            {/* login register  password*/}
            <View style={{width: '80%', marginTop: 50}}>
              <Text
                style={{
                  fontFamily: 'Rubik-Light',
                  fontSize: 15,
                  letterSpacing: 1,
                  color: Color.DARKGRAY,
                }}>
                Password
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => setEye(!eye)}>
                  <Icon
                    name={eye ? 'eye-slash' : 'eye'}
                    size={15}
                    color={Color.BLACK}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder={'Enter your password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={eye}
                  style={{
                    fontFamily: 'Rubik-Light',
                    paddingHorizontal: 10,
                    width: '100%',
                  }}
                />
              </View>
              <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
              <Text style={{color: Color.RED, marginTop: 10}}>
                {errors.password && touched.password && errors.password}
              </Text>
            </View>

            <View>
              <Text style={{color: Color.RED, marginTop: 10}}></Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.signincont}
            disabled={loader === true}>
            {loader ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text
                style={{
                  fontSize: 25,
                  color: Color.CLEANWHITE,
                  fontFamily: 'Rubik-Light',
                }}>
                Sign up
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.CLEANWHITE,
    alignItems: 'center',
  },
  imagecont: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
  },
  signincont: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: Color.PRIMARY,
    width: '80%',
    height: 40,
    borderRadius: 30,
  },
});
export default Signup;
