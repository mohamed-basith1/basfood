import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from '../../Const/Color';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../../Api/admin';
import Loader from '../../Components/Loader';

const Categories = ({route}) => {
  const {title} = route.params;
  const [image, setImage] = useState('');
  const [listitem, setListitem] = useState([]);
  const [loader, setLoader] = useState(true);
  const [getitem, setGetitem] = useState([]);
  const navigation = useNavigation();
  console.log(title);
  useEffect(() => {
    getproductbyparams();
  }, []);

  console.log(getitem);
  const getproductbyparams = async () => {
    const data = {categories: title};
    console.log(data);
    const response = await axios
      .post('/product/productcategories', data)
      .then(res => {
        setGetitem(res.data);
        setLoader(!loader);
      })
      .catch(err => console.log(err));
  };

  console.log(listitem);
  const pizza = require('../../Assets/pizza.jpg');
  const burger = require('../../Assets/burger.jpg');
  const milkshake = require('../../Assets/milkshake.jpg');
  const noodles = require('../../Assets/noodle.jpg');
  const sandwich = require('../../Assets/sandwich.jpg');
  const icecream = require('../../Assets/icecream.jpg');
  const DURATION = 100;
  return (
    <View style={styles.main}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      {loader ? (
        <Loader />
      ) : (
        <>
          <Animatable.View
            delay={DURATION * 4}
            animation="fadeIn"
            style={styles.imagecontainer}>
            <Image
              resizeMode="cover"
              source={
                title === 'burger'
                  ? burger
                  : title === 'pizza'
                  ? pizza
                  : title === 'sandwich'
                  ? sandwich
                  : title === 'ice cream'
                  ? icecream
                  : title === 'noodles'
                  ? noodles
                  : title === 'milkshake'
                  ? milkshake
                  : null
              }
              style={{height: '100%', width: '100%'}}
            />
            <View
              style={{
                position: 'absolute',
                top: 60,
                left: 20,
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
          </Animatable.View>
          <Animatable.View
            style={styles.contantcontainer}
            delay={50}
            animation="slideInDown">
            {/* <View
          style={{
            width: '56%',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              left: 15,
              top: -50,
              fontWeight: 'bold',
              letterSpacing: 2,
              color: Color.CLEANWHITE,
            }}>
            {title}
          </Text>
        </View> */}

            <ScrollView
              style={styles.list}
              showsVerticalScrollIndicator={false}>
              {getitem.map((value, index) => (
                <Pressable
                  key={value.id}
                  onPress={() => navigation.navigate('detail', {id: value.id})}>
                  <Animatable.View
                    animation="bounceIn"
                    delay={DURATION + index * 100}
                    style={styles.itemcontainer}>
                    <View style={styles.listimgcont}>
                      <Image
                        source={{uri: value.image}}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                      />
                    </View>
                    <View style={styles.listtitle}>
                      <Text
                        key={value.id}
                        style={{
                          fontSize: 15,
                          fontFamily: 'Rubik-Medium',
                          color: Color.BLACK,
                        }}>
                        {value.productname}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Rubik-medium',
                          color: Color.BLACK,
                          fontSize: 20,
                        }}>
                        {`₹${value.price}`}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <View style={styles.listcart}>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={25}
                          color={Color.BLACK}
                        />
                      </View>
                    </TouchableOpacity>
                  </Animatable.View>
                </Pressable>
              ))}
            </ScrollView>
          </Animatable.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  imagecontainer: {
    height: 300,
  },
  contantcontainer: {
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 250,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: Color.WHITE,
    elevation: 20,
  },
  list: {
    flex: 1,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    marginBottom: 100,
  },
  itemcontainer: {
    backgroundColor: Color.CLEANWHITE,
    marginBottom: 20,
    borderRadius: 10,
    height: 140,

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  listimgcont: {
    width: 100,
    marginLeft: 10,
    height: 100,
    borderRadius: 50,
  },
  listtitle: {
    flex: 1,
    top: -25,
    paddingHorizontal: 10,
  },
  listcart: {
    borderRadius: 50,
    width: 30,
    top: -30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Categories;
