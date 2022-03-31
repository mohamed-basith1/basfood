import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Input from '../../Components/input';
import Color from '../../Const/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from '../../Api/axios';

const Addressreg = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [phoneerror, setPhoneerror] = useState('');

  const Registerschema = yup.object().shape({
    phone: yup
      .number()
      .required('phone number is required')
      .max(10000000000, 'max 10 number only')
      .min(1000000000, 'phone number must be 10 numbers'),

    doorno: yup.string('').required('door number is required'),
    street: yup.string('').required('street  is required'),
    city: yup.string('').required('city is required'),
    pincode: yup
      .number()
      .required('pincode is required')
      .max(1000000, 'max 6 number')
      .min(100000, ({min}) => 'pincode must be 6 numbers'),
  });
  const nextpage = async values => {
    setLoader(true);
    const data = {
      phone: values.phone,
    };
    console.log(data);
    // check to backend number is already taken
    try {
      const response = await axios.post('/login/register', data);
      console.log(response.data);
      if (response.data === 'no problem') {
        navigation.replace('signup', {
          phone: values.phone,
          doorno: values.doorno,
          street: values.street,
          city: values.city,
          pincode: values.pincode,
        });
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 400')
        console.log('phone number is already used');
      setPhoneerror('phone number is already used');
      setLoader(false);
      setTimeout(() => {
        setPhoneerror('');
      }, 4000);
    }
  };

  const Dismisskeyboard = ({children}) => {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Formik
      initialValues={{
        phone: '',
        doorno: '',
        street: '',
        city: '',
        pincode: '',
      }}
      validateOnMount={true}
      validationSchema={Registerschema}
      onSubmit={values => nextpage(values)}>
      {({handleChange, handleBlur, handleSubmit, touched, errors, values}) => (
        <View style={styles.main}>
          <StatusBar
            translucent
            backgroundColor="rgba(0,0,0,0)"
            barStyle="dark-content"
          />

          <View style={styles.imagecont}>
            <Image
              source={require('../../Assets/addressreg.png')}
              style={{
                height: '60%',
                width: '60%',
              }}
              resizeMode="contain"
            />
            <View
              style={{
                position: 'absolute',
                top: 60,
                left: 0,
                height: 30,
                width: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: Color.LIGHTGRAY,
              }}>
              <TouchableOpacity onPress={() => navigation.replace('signin')}>
                <Icon name="chevron-left" size={20} color={Color.BLACK} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {/* phone number */}
            <Input
              label={'Phone'}
              icon={'mobile'}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder="Enter your Phone number"
              margin={20}
            />
            <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
            <Text
              style={{
                color: Color.RED,
                fontFamily: 'Rubik-Light',
                fontSize: 13,
              }}>
              {errors.phone && touched.phone && errors.phone}
              {phoneerror.length !== 0 && phoneerror}
            </Text>
            {/* door no */}
            <Input
              label={'Door no'}
              icon={'door-closed'}
              onChangeText={handleChange('doorno')}
              onBlur={handleBlur('doorno')}
              value={values.doorno}
              placeholder="Enter your Door Number"
              margin={20}
            />
            <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
            <Text
              style={{
                color: Color.RED,
                fontFamily: 'Rubik-Light',
                fontSize: 13,
              }}>
              {errors.doorno && touched.doorno && errors.doorno}
            </Text>

            {/* street */}
            <Input
              label={'Street'}
              icon={'road'}
              onChangeText={handleChange('street')}
              onBlur={handleBlur('street')}
              value={values.street}
              placeholder="Enter your Street"
              margin={20}
            />
            <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
            <Text
              style={{
                color: Color.RED,
                fontFamily: 'Rubik-Light',
                fontSize: 13,
              }}>
              {errors.street && touched.street && errors.street}
            </Text>
            {/* city*/}
            <Input
              label={'City'}
              icon={'city'}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
              placeholder="Enter your City"
              margin={20}
            />
            <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
            <Text
              style={{
                color: Color.RED,
                fontFamily: 'Rubik-Light',
                fontSize: 13,
              }}>
              {errors.city && touched.city && errors.city}
            </Text>
            {/* pincode */}
            <Input
              label={'Pincode'}
              icon={'map-pin'}
              onChangeText={handleChange('pincode')}
              onBlur={handleBlur('pincode')}
              value={values.pincode}
              placeholder="Enter your Pincode"
              margin={20}
            />
            <View style={{height: 1, backgroundColor: Color.PRIMARY}}></View>
            <Text
              style={{
                color: Color.RED,
                fontFamily: 'Rubik-Light',
                fontSize: 13,
              }}>
              {errors.pincode && touched.pincode && errors.pincode}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 100,
                backgroundColor: Color.PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loader === true}>
                {!loader ? (
                  <Icon
                    name="chevron-right"
                    size={40}
                    color={Color.CLEANWHITE}
                  />
                ) : (
                  <ActivityIndicator color={'white'} />
                )}
              </TouchableOpacity>
            </View>
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
export default Addressreg;
