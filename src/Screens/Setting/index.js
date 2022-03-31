import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Color from '../../Const/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import axios from '../../Api/axios';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../Components/Loader';

const Setting = () => {
  const [userdetail, setUserDetails] = useState([]);
  useEffect(() => {
    getuserDetails();
  }, []);
  const navigation = useNavigation();
  const getuserDetails = async () => {
    const email = await AsyncStorage.getItem('email');
    const data = {email: email};
    console.log('ippa email get pannanum');
    const response = await axios.post('login/getdetails', data);
    console.log(response.data);
    setUserDetails(response.data);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('email');
      navigation.replace('auth', {screen: 'signin'});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.loading}>
      {userdetail.length !== 0 ? (
        <>
          <View style={styles.main}>
            <View style={styles.pagename}>
              <Text
                style={{
                  color: Color.CLEANWHITE,
                  fontFamily: 'Rubik-Medium',
                  fontSize: 30,
                }}>
                Setting
              </Text>
            </View>
            <Animatable.View
              style={styles.header}
              animation="fadeInDown"
              delay={100}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  backgroundColor: Color.CLEANWHITE,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: userdetail.image}}
                  style={{height: '95%', width: '95%', borderRadius: 100}}
                />
              </View>
              <View style={{paddingLeft: 10}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Rubik-Medium',
                    color: Color.CLEANWHITE,
                  }}>
                  {userdetail.username}
                </Text>
                <Text
                  style={{fontFamily: 'Rubik-Light', color: Color.LIGHTGRAY}}>
                  {userdetail.email}
                </Text>
              </View>
              {/* hdsjfhjdhfhsdlfsdjf */}
              <View
                style={{
                  left: 70,
                  borderRadius: 100,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,.3)',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('edit', {
                      username: userdetail.username,
                      image: userdetail.image,
                      phone: userdetail.phone,
                      email: userdetail.email,
                      pincode: userdetail.pincode,
                      street: userdetail.street,
                      city: userdetail.city,
                      doorno: userdetail.doorno,
                    })
                  }>
                  <Ionicons name="pencil" size={15} color={Color.CLEANWHITE} />
                </TouchableOpacity>
              </View>
            </Animatable.View>
            {/* contant container */}
            <Animatable.View
              style={styles.contant}
              delay={200}
              animation="fadeInUp">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('address', {
                    username: userdetail.username,

                    phone: userdetail.phone,
                    email: userdetail.email,
                    doorno: userdetail.doorno,
                    street: userdetail.street,
                    city: userdetail.city,
                    pincode: userdetail.pincode,
                  })
                }>
                <View style={styles.items} delay={700} animation="bounceIn">
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="location" size={25} color={Color.BLACK} />
                    <Text
                      style={{
                        fontFamily: 'Rubik-Light',
                        fontSize: 18,
                        paddingLeft: 10,
                        color: Color.BLACK,
                      }}>
                      Address
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Color.BLACK}
                  />
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: Color.LIGHTGRAY,
                    marginVertical: 10,
                  }}></View>
              </TouchableOpacity>
              {/* bsdfksdkfsdfdsfdsfsd */}
              <TouchableOpacity onPress={() => navigation.navigate('orders')}>
                <View style={styles.items}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="albums" size={25} color={Color.BLACK} />
                    <Text
                      style={{
                        fontFamily: 'Rubik-Light',
                        fontSize: 18,
                        paddingLeft: 10,
                        color: Color.BLACK,
                      }}>
                      Orders
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Color.BLACK}
                  />
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: Color.LIGHTGRAY,
                    marginVertical: 10,
                  }}></View>
              </TouchableOpacity>

              {/* sdgfgsdkfsdfhs */}
              <TouchableOpacity onPress={() => navigation.navigate('aboutus')}>
                <View style={styles.items}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="people-circle"
                      size={25}
                      color={Color.BLACK}
                    />
                    <Text
                      style={{
                        fontFamily: 'Rubik-Light',
                        fontSize: 18,
                        paddingLeft: 10,
                        color: Color.BLACK,
                      }}>
                      About Us
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Color.BLACK}
                  />
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: Color.LIGHTGRAY,
                    marginVertical: 10,
                  }}></View>
              </TouchableOpacity>

              {/* kjskldhfsdjfsdjfsdgs */}

              <TouchableOpacity onPress={() => navigation.navigate('support')}>
                <View style={styles.items}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="information-circle"
                      size={25}
                      color={Color.BLACK}
                    />
                    <Text
                      style={{
                        fontFamily: 'Rubik-Light',
                        fontSize: 18,
                        paddingLeft: 10,
                        color: Color.BLACK,
                      }}>
                      Support
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={Color.BLACK}
                  />
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: Color.LIGHTGRAY,
                    marginVertical: 10,
                  }}></View>
              </TouchableOpacity>
              {/* hsdhlhfdisjjklgjlakljrgkllfg */}
              <TouchableOpacity onPress={() => logout()}>
                <View
                  style={{
                    backgroundColor: Color.PRIMARY,
                    width: 140,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: -30,
                  }}>
                  <Text style={{color: Color.CLEANWHITE}}>Logout</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  main: {
    flex: 1,
    backgroundColor: Color.PRIMARY,
  },
  contant: {
    backgroundColor: Color.WHITE,
    flex: 1,
    top: 140,
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  header: {
    top: 100,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagename: {
    top: 60,
    left: 20,
  },
  items: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Setting;
