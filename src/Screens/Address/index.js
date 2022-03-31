import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Color from '../../Const/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../../Components/input';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from '../../Api/axios';

const Address = ({navigation, route}) => {
  const {doorno, email, street, city, pincode, phone, username} = route.params;

  const Registerschema = yup.object().shape({
    pincode: yup
      .number()
      .required('pincode is required')
      .max(1000000, 'max 6 number')
      .min(100000, ({min}) => 'pincode must be 6 numbers'),
  });
  const pincodestring = JSON.stringify(pincode);

  const savesubmit = async value => {
    if (
      doorno !== value.doorno ||
      street !== value.street ||
      city !== value.city ||
      pincodestring !== value.pincode
    ) {
      console.log('ippa add pannaumm backend ');
      const update = async () => {
        const data = {
          email: email,
          phone: phone,
          username: username,
          doorno: value.doorno,
          street: value.street,
          city: value.city,
          pincode: value.pincode,
        };
        const response = await axios.put('login/editdetails', data);
        console.log(response.data);
        navigation.replace('auth', {screen: 'bottomstack'});
      };
      update();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Formik
      initialValues={{
        doorno: doorno,
        street: street,
        city: city,
        pincode: pincodestring,
      }}
      validateOnMount={true}
      validationSchema={Registerschema}
      onSubmit={values => savesubmit(values)}>
      {({handleChange, handleBlur, handleSubmit, touched, errors, values}) => (
        <View style={styles.main}>
          <StatusBar barStyle="dark-content" />

          <View style={styles.header}>
            <View
              style={{
                height: 30,
                width: 30,
                textAlign: 'center',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.CLEANWHITE,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  style={{textAlign: 'center'}}
                  color={Color.BLACK}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: 'Rubik-Medium',
                fontSize: 20,
                color: Color.BLACK,
                paddingLeft: 20,
              }}>
              Address
            </Text>
          </View>
          {/* contant componant */}

          <View style={styles.contant}>
            {/* door no */}
            <Input
              label={'Door no'}
              icon={'door-closed'}
              onChangeText={handleChange('doorno')}
              onBlur={handleBlur('doorno')}
              value={values.doorno}
              placeholder="Enter your Door Number"
              margin={50}
            />

            {/* street */}
            <Input
              label={'Street'}
              icon={'road'}
              onChangeText={handleChange('street')}
              onBlur={handleBlur('street')}
              value={values.street}
              placeholder="Enter your Street"
              margin={50}
            />
            {/* city*/}
            <Input
              label={'City'}
              icon={'city'}
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
              placeholder="Enter your City"
              margin={50}
            />
            {/* pincode */}
            <Input
              label={'Pincode'}
              icon={'map-pin'}
              onChangeText={handleChange('pincode')}
              onBlur={handleBlur('pincode')}
              value={values.pincode}
              placeholder="Enter your Pincode"
              margin={50}
            />
            <Text style={{fontFamily: 'Rubik-Light', color: Color.RED}}>
              {errors.pincode && touched.pincode && errors.pincode}
            </Text>
            {/* pincode */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                width: '40%',
                height: '10%',
                borderRadius: 20,
                backgroundColor: Color.PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text
                style={{
                  color: Color.CLEANWHITE,
                  fontSize: 15,
                  fontFamily: 'Rubik-Light',
                }}>
                Save
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
    padding: 20,
    paddingBottom: 200,
    flex: 1,
  },
  header: {
    top: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contant: {
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Address;
