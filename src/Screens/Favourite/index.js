import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import Favlist from '../../Components/Favlist';
import Color from '../../Const/Color';
import axios from '../../Api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {addfav} from '../../Redux/favslicer';
import {useDispatch, useSelector} from 'react-redux';

const Favourite = () => {
  const [getfav, setfav] = useState([]);
  const [change, setChange] = useState(true);
  const [useremail, setemail] = useState('');
  const [loader, setLoader] = useState(false);
  const getfavs = useSelector(state => state.fav.fav);
  useEffect(() => {
    getfavproducts();
  }, [change, getfavs]);

  const dispatch = useDispatch();
  const uuidid = uuid.v4();
  const getfavproducts = async () => {
    const email = await AsyncStorage.getItem('email');
    setemail(email);
    const data = {email: email};
    const response = await axios.post('/login/getfav', data);
    console.log(response.data);
    setfav(response.data);
    setLoader(true);
  };
  const removefav = async id => {
    setLoader(true);
    const data = {email: useremail, productid: id};
    const response = await axios.put('/login/deletesinglefavitem', data);
    console.log(response.data);
    console.log('remove clicked ', id);
    dispatch(addfav(uuidid));
    setChange(!change);
    setLoader(false);
  };
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <View style={styles.header}>
        <Text style={styles.title}>Favorite List</Text>
      </View>
      {loader ? (
        <View style={styles.favlist}>
          {getfav.length === 0 ? (
            <View
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Rubik-Light',
                  color: Color.BLACK,
                  fontSize: 16,
                }}>
                Your Favorate List is Empty
              </Text>
            </View>
          ) : (
            getfav.map(value => (
              <Favlist
                key={value.productid}
                productname={value.productname}
                price={value.price}
                image={value.image}
                id={value.productid}
                action={id => {
                  removefav(id);
                }}
              />
            ))
          )}
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            animating={true}
            color={Color.PRIMARY}
            style={{height: 300, width: 300}}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingTop: 50,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Rubik-Medium',
    fontSize: 20,
    color: Color.BLACK,
  },
  favlist: {
    padding: 20,
  },
});

export default Favourite;
