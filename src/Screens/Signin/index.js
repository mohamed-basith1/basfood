import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Touchable,
  ActivityIndicator,
} from 'react-native';
import Input from '../../Components/input';
import Color from '../../Const/Color';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Api/axios';

const Signin = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [emailerror, setEmailerror] = useState('');
  const [passworderror, setPassworderror] = useState('');

  const Signinschema = yup.object().shape({
    email: yup.string('').email('invalid Email').required('Email is required'),
    password: yup
      .string()
      .min(8, ({min}) => 'Password must be atleast 8 characters')
      .required('password is required'),
  });

  const [eye, setEye] = useState(true);

  const submithandler = async value => {
    setLoader(true);
    const data = {email: value.email.toLowerCase(), password: value.password};
    console.log(data);

    try {
      await AsyncStorage.setItem('email', value.email.toLowerCase());
      const response = await axios.post('/login/signin', data);
      console.log(response.data);

      try {
        await AsyncStorage.setItem('token', response.data);

        navigation.replace('loader');
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 400') {
        console.log('Email is not found');
        setEmailerror('Email is not found');
        setLoader(false);
        setTimeout(() => {
          setEmailerror('');
        }, 4000);
      }
      if (error.message === 'Request failed with status code 404') {
        console.log('check your password');
        setPassworderror('check your password');
        setLoader(false);
        setTimeout(() => {
          setPassworderror('');
        }, 4000);
      }
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      validationSchema={Signinschema}
      onSubmit={value => submithandler(value)}>
      {({handleChange, handleBlur, handleSubmit, touched, errors, values}) => (
        <View style={styles.main}>
          <StatusBar
            translucent
            backgroundColor="rgba(0,0,0,0)"
            barStyle="dark-content"
          />

          <View style={styles.imagecont}>
            <Image
              source={require('../../Assets/signin.png')}
              style={{height: '60%', width: '60%', alignSelf: 'center'}}
              resizeMode="contain"
            />
          </View>
          <View>
            {/* email */}
            <Input
              label={'Email'}
              icon={'mail-bulk'}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Enter your Email"
              margin={50}
            />
            <View
              style={{
                height: 1,
                backgroundColor: Color.PRIMARY,
              }}></View>
            <View>
              <Text style={{color: Color.RED, marginTop: 10}}>
                {errors.email && touched.email && errors.email}
                {emailerror.length !== 0 && emailerror}
              </Text>
            </View>

            {/* password */}
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
                    size={20}
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
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: Color.PRIMARY,
                }}></View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Color.PRIMARY,
              }}></View>

            <View>
              <Text style={{color: Color.RED, marginTop: 10}}>
                {errors.password && touched.password && errors.password}
                {passworderror.length !== 0 && passworderror}
              </Text>
            </View>
          </View>
          {/* 
            kdfs;djkgkdfkgkl;kd;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.signincont}
            disabled={loader == true}>
            {!loader ? (
              <Text
                style={{
                  fontSize: 25,
                  color: Color.CLEANWHITE,
                  fontFamily: 'Rubik-Light',
                }}>
                Sign in
              </Text>
            ) : (
              <ActivityIndicator color={'white'} />
            )}
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <Text style={{fontFamily: 'Rubik-Light'}}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace('addressreg')}>
              <Text
                style={{
                  fontFamily: 'Rubik-Medium',
                  color: Color.BLACK,
                  fontSize: 15,
                }}>
                Sign-up
              </Text>
            </TouchableOpacity>
          </View>
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
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  signincont: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: Color.PRIMARY,
    width: '60%',
    height: 40,
    borderRadius: 30,
  },
});
export default Signin;
