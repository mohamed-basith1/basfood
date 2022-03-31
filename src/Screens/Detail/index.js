import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Touchable,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {io} from 'socket.io-client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Counter from '../../Components/Counter';
import Color from '../../Const/Color';
import {useNavigation} from '@react-navigation/core';
import axios from '../../Api/admin';
import Axios from '../../Api/axios';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {socket5000} from '../../Api/socket';
import {addcart} from '../../Redux/cartslicer';
import {addfav} from '../../Redux/favslicer';
const Detail = ({route}) => {
  const [counter, setCounter] = useState(1);
  const [heart, setHeart] = useState(false);
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);
  const [userdetails, setUserDetails] = useState('');
  console.log(heart);
  const {id} = route.params;
  console.log('i am id of product', id);
  // socket connection //5000

  useEffect(() => {
    console.log('ippa use effect nadakuthu');

    getuserDetails();
  }, []);

  const uuidid = uuid.v4();
  const dispatch = useDispatch();
  console.log('i am 44 line clg', product);
  //////////////////////////
  console.log('iam 47', userdetails);
  ///////////////////////

  //userdetails
  const getuserDetails = async () => {
    const email = await AsyncStorage.getItem('email');
    console.log(email);
    const data = {email: email};
    const response = await Axios.post('login/getdetails', data)
      .then(res => {
        setUserDetails(res.data);
        getproductdetails();
      })
      .catch(err => console.log(err));
  };

  ///product details
  const getproductdetails = async () => {
    const data = {id: id};
    const response = await axios
      .post('/product/singleproducts', data)
      .then(res => {
        console.log(res.data);
        setProduct(res.data);
        setLoader(!loader);
      })
      .catch(err => console.log(err));
  };
  const navigation = useNavigation();

  const heartclick = async () => {
    console.log('heart clicked');
    console.log(heart);
    check();
  };

  const check = () => {
    console.log(`${heart}jfjdf`);
    if (heart) {
      console.log('backend remove pandroom');
      const deletesingle = async () => {
        const email = await AsyncStorage.getItem('email');
        console.log('delete single item clicked');
        console.log(id);
        const data = {email: email, productid: product.id};
        console.log(data);
        const response = await Axios.put('login/deletesinglefavitem', data);
        console.log(response.data);
        dispatch(addfav(uuidid));
        setHeart(!heart);
      };
      deletesingle();
    } else if (!heart) {
      console.log('backend la add pandroid');
      const addtofav = async () => {
        let dateObj = new Date();
        let myDate =
          dateObj.getUTCDate() +
          '/' +
          (dateObj.getMonth() + 1) +
          '/' +
          dateObj.getUTCFullYear();
        const data = {
          productid: product.id,
          productname: product.productname,
          image: product.image,
          orderdate: myDate,
          price: product.price,
          uniid: product._id,
        };
        const userid = userdetails.id;
        console.log('i am 110', userid);
        const response = await Axios.put(`login/addingfav/${userid}`, data);
        console.log('iam 112', response.data);
        dispatch(addfav(uuidid));
        setHeart(!heart);
        console.log('ippa setstate true herat');
      };
      addtofav();
    }
  };

  //add cart product to login cart array
  //5000 api
  const addtocart = async () => {
    const totalprice = counter * product.price;

    let dateObj = new Date();
    let myDate =
      dateObj.getUTCDate() +
      '/' +
      (dateObj.getMonth() + 1) +
      '/' +
      dateObj.getUTCFullYear();
    console.log(product._id);
    const data = {
      productid: product.id,
      productname: product.productname,
      image: product.image,
      orderdate: myDate,
      quantity: counter,
      price: product.price,
      uniid: product._id,
    };
    const userid = userdetails.id;
    console.log(userid);
    const response = await Axios.put(`login/addingorder/${userid}`, data);
    console.log(response.data);
    const uuidid1 = uuid.v4();
    console.log('i am 156', uuidid1);
    //intha socket unnum finish aagalar
    dispatch(addcart(uuidid1));
  };

  return (
    <View style={styles.main}>
      {loader ? (
        <ActivityIndicator color={Color.PRIMARY} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.View
              delay={100}
              animation="fadeIn"
              style={styles.imagecontainer}>
              <ImageBackground
                source={require('../../Assets/background.jpg')}
                style={{height: '100%'}}>
                <View
                  style={{
                    position: 'absolute',
                    top: 60,
                    left: 20,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
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
                <View
                  style={{
                    position: 'absolute',
                    top: 60,
                    right: 20,
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: Color.CLEANWHITE,
                  }}>
                  <TouchableOpacity onPress={() => heartclick()}>
                    <Ionicons
                      name={heart ? 'heart' : 'heart-outline'}
                      style={{textAlign: 'center'}}
                      color={Color.RED}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Animatable.View>
            <Animatable.View
              delay={50}
              animation="slideInDown"
              style={styles.contantmain}>
              <Animatable.View
                delay={300}
                animation="bounceIn"
                style={styles.innerimage}>
                <Image
                  source={{uri: product.image}}
                  style={{
                    height: '98%',
                    width: '98%',
                    borderRadius: 100,
                  }}
                />
              </Animatable.View>
              {/* contraon container */}
              <View
                style={{top: -60, paddingBottom: 200}}
                showsVerticalScrollIndicator={false}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 25,
                    fontFamily: 'Rubik-Medium',
                    color: Color.BLACK,
                  }}>
                  {product.productname}
                </Text>

                {/* icons container */}
                <View style={styles.icons}>
                  <Animatable.View
                    animation="bounceIn"
                    delay={500}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 30,
                    }}>
                    <Ionicons
                      name="stopwatch-outline"
                      color={'skyblue'}
                      size={25}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Rubik-Light',
                        paddingLeft: 5,
                        color: Color.BLACK,
                      }}>
                      30 min
                    </Text>
                  </Animatable.View>
                  <Animatable.View
                    animation="bounceIn"
                    delay={600}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 30,
                    }}>
                    <Ionicons
                      name="star-outline"
                      color={Color.PRIMARY}
                      size={23}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Rubik-Light',
                        paddingLeft: 5,
                        color: Color.BLACK,
                      }}>
                      4.5
                    </Text>
                  </Animatable.View>
                  <Animatable.View
                    animation="bounceIn"
                    delay={700}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 30,
                    }}>
                    <Ionicons name="flame-outline" color={'red'} size={25} />
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Rubik-Light',
                        paddingLeft: 5,
                        color: Color.BLACK,
                      }}>
                      676 kcal
                    </Text>
                  </Animatable.View>
                </View>

                {/* price contaioner */}
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.pricecont}>
                    <Text
                      style={{
                        color: Color.BLACK,
                        fontSize: 30,
                        marginRight: 20,
                        fontFamily: 'Rubik-Medium',
                      }}>
                      {' '}
                      <Text style={{fontSize: 18}}>₹ </Text> {product.price}
                    </Text>
                    <Counter
                      width={120}
                      height={40}
                      fontsize={25}
                      circle={33}
                      color={Color.BLACK}
                      add={() => setCounter(counter + 1)}
                      minus={() => setCounter(counter - 1)}
                      value={counter}
                    />
                  </View>
                </View>
                <ScrollView
                  style={styles.detail}
                  showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Animatable.Text
                      delay={100}
                      animation="fadeInDown"
                      style={{
                        fontSize: 20,
                        fontFamily: 'Rubik-Medium',
                        color: Color.BLACK,
                      }}>
                      Detail
                    </Animatable.Text>
                    <TouchableOpacity
                      onPress={() => addtocart()}
                      style={{
                        backgroundColor: Color.PRIMARY,
                        width: 150,
                        height: 40,

                        zIndex: 1,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Rubik-Regular',
                          fontSize: 20,
                          color: Color.CLEANWHITE,
                        }}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Animatable.View
                    delay={100}
                    animation="fadeInDown"
                    style={{marginTop: 20}}>
                    <Text
                      style={{
                        color: Color.BLACK,
                        fontFamily: 'Rubik-Light',
                        lineHeight: 20,
                        paddingBottom: 50,
                      }}>
                      {product.description}
                    </Text>
                  </Animatable.View>
                </ScrollView>
                <View></View>
              </View>
            </Animatable.View>
          </ScrollView>
        </>
      )}

      {/* image contaoner */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Color.WHITE,
  },
  imagecontainer: {
    height: '34%',
  },
  contantmain: {
    backgroundColor: Color.WHITE,
    flex: 1,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    top: -40,
  },
  innerimage: {
    height: 200,
    width: 200,
    elevation: 10,
    borderRadius: 100,
    alignSelf: 'center',
    top: -100,
    backgroundColor: Color.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  pricecont: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 50,
    backgroundColor: Color.LIGHTGRAY,
    width: 200,
    paddingLeft: 30,
    alignItems: 'center',
  },
  detail: {
    padding: 20,
    marginTop: 40,
  },
});
export default Detail;
