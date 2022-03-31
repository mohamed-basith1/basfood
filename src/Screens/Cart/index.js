import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Color from '../../Const/Color';
import Cartlist from '../../Components/Cartlist';
import axios from '../../Api/axios';
import Axios from '../../Api/admin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {io} from 'socket.io-client';
import uuid from 'react-native-uuid';
import Backgroundimage from '../../Assets/background.jpg';
import {socket8000} from '../../Api/socket';
import {useDispatch, useSelector} from 'react-redux';
import {addcart} from '../../Redux/cartslicer';

const Cart = () => {
  const [cartproductfinal, setCartproductfinal] = useState([]);
  const [userdetails, setUserDetails] = useState([]);
  const [rerender, setRerender] = useState([]);
  const [change, setChange] = useState(false);
  const [model, setModel] = useState(false);
  const getall = useSelector(state => state.cart.cart);

  console.log('cart appen aagiruku ippa trigger pannaum', getall);
  const uuidids = uuid.v4();
  const dispatch = useDispatch();
  const chectime = new Date();
  console.log(
    ' i am 38 rerender aaguthunaathu checking',
    cartproductfinal.quantity,
  );
  useEffect(() => {
    userDetails();
    // setRerender(getall);
  }, [getall, change]);

  /////////get user informatipnhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
  const userDetails = async () => {
    const email = await AsyncStorage.getItem('email');
    console.log(email);
    const data = {email: email};
    console.log('ippa first befor axiso');
    const response = await axios
      .post('login/getdetails', data)
      .then(res => {
        console.log('after axios');
        console.log(res.data);
        console.log('inga userdetails');
        setUserDetails(res.data);
        getcartproduct();
      })
      .catch(err => console.log(err));
  };

  // const socket = io('http://localhost:8000')
  // socket.on('connection')
  // socket.on('message', (data) => {
  //   setTriger(data)
  // })



  //prlace order functionkljdsiojfilhjdaoihfodofiohj sdjkjkssssssssssssssssssssssssss
  const placeorder = () => {
    cartproductfinal.map(async value => {
      let dateObj = new Date();

      let myDate =
        dateObj.getUTCDate() +
        '/' +
        (dateObj.getMonth() + 1) +
        '/' +
        dateObj.getUTCFullYear();
      console.log(myDate);
      const uniqid = uuid.v4();
      const combaineid = userdetails.email + value.productid + uniqid;
      const data = {
        id: value.productid,
        productname: value.productname,
        combaine: combaineid,
        image: value.image,
        username: userdetails.username,
        orderdate: myDate,
        status: 'pending',
        email: userdetails.email,
        phone: userdetails.phone,
        quantity: value.quantity,
        price: value.price,
        doorno: userdetails.doorno,
        street: userdetails.street,
        city: userdetails.city,
        pincode: userdetails.pincode,
      };
      console.log(data);

      //admin add pannum orders 8000
      const response = await Axios.post('/order/create', data);
      console.log(value.productname);

      //this for add the order product
      const data2 = {
        email: userdetails.email,
        combaine: combaineid,
        productname: value.productname,
        productprice: value.price,
        productimage: value.image,
        status: 'pending',
        statusno: 0,
      };
      console.log(data2);
      //this for add teh order in app 5000
      const response2 = await axios.post('order/createorders', data2);
      console.log(response2.data);

      //this fro remove all item in cart
      const data3 = {email: userdetails.email};
      const response3 = await axios.put('/login/emptycart', data3);
      console.log(response3.data);

      //ethu admin socket 8000
      console.log('ipa socket triger app la  admin triger aagrurathuku');
      const socket = io('https://adminpanalfinalfood.herokuapp.com');

      // socket.on('connection');
      console.log('ippa tirger send panni rukkan');
      socket.emit('message', uniqid);
      console.log('ippa socket  8000  la triger completed');
      console.log(response.data);
      setChange(!change);
      conformordermodel();
    });
  };

  const conformordermodel = () => {
    setModel(true);
  };
  const getcartproductsample = () => {
    setCartproduct(data);
  };
  const getcartproduct = async () => {
    const email = await AsyncStorage.getItem('email');
    const data = {email: email};
    const response = await axios.post('/login/getcart', data).then(res => {
      console.log(res.data);
      setCartproductfinal(res.data);
    });
  };
  const total = cartproductfinal.reduce(
    (prev, current) => prev + current.price,
    0,
  );

  //plus button clicked
  const increasecount = async data => {
    const datas = {uniid: data.uniid};
    console.log(datas);
    const response = await Axios.post('/product/uniidsearch', datas);

    console.log(response.data);

    //ethu plus button clicke cart appen pandrathutku
    const alldata = {
      id: userdetails.id,
      quantity: data.quantity,
      price: response.data,
      uniid: data.uniid,
    };
    console.log(alldata);
    const res = await axios.put('/login/increasecart', alldata);
    console.log(res.data);
    setChange(!change);
    console.log('increase count by one');
  };

  //minus button cliucked
  const decreasecount = async data => {
    console.log('decreser c,icked');
    const datas = {uniid: data.uniid};
    console.log(datas);
    const response = await Axios.post('/product/uniidsearch', datas);
    console.log(response.data);

    //ethu plus button clicke cart appen pandrathutku
    const alldata = {
      id: userdetails.id,
      quantity: data.quantity,
      price: response.data,
      uniid: data.uniid,
    };
    console.log(alldata);
    const res = await axios.put('/login/decreasecart', alldata).then(res => {
      console.log(res.data);
      setChange(!change);
      console.log('increase count by one');
    });
  };
  const navigation = useNavigation();
  // const retrigger = () => {
  //   setTimeout(() => {
  //     setChange(!change);
  //   }, 5000);
  // };
  // retrigger();
  const deletesingle = async id => {
    const email = await AsyncStorage.getItem('email');
    console.log('delete single item clicked');
    console.log(id);
    const data = {email: email, productid: id};
    console.log(data);
    const response = await axios
      .put('/login/deletesinglecartitem', data)
      .then(res => {
        console.log(res.data);
        setChange(!change);
        dispatch(addcart(uuidids));
      });
  };

  const checkstatusclick = () => {
    setModel(false);
    navigation.navigate('Setting');
  };

  return (
    <View style={Styles.main}>
      <Modal
        visible={model}
        transparent
        animationType={'fade'}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          blurRadius={10}
          source={require('../../Assets/blurcartscreen.jpg')}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,.1)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animatable.View
            animation="bounceIn"
            delay={5}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: Color.CLEANWHITE,
              textAlign: 'center',
              height: 380,
              width: 320,
              elevation: 10,
              borderRadius: 10,
              position: 'relative',
            }}>
            <TouchableOpacity
              onPress={() => setModel(false)}
              style={{position: 'absolute', top: 10, right: 10}}>
              <Ionicons
                name="close-outline"
                style={{display: 'flex', alignSelf: 'center'}}
                color={Color.BLACK}
                size={40}
              />
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                alignSelf: 'center',
                backgroundColor: Color.PRIMARY,
                width: 100,
                borderRadius: 100,
                height: 100,
                marginBottom: 10,
                justifyContent: 'center',
              }}>
              <Ionicons
                name="checkmark"
                style={{display: 'flex', alignSelf: 'center'}}
                color={Color.CLEANWHITE}
                size={80}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Rubik-Light',
                fontSize: 16,
                color: Color.BLACK,
              }}>
              Your Order Taken{' '}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Rubik-Light',
                fontSize: 16,
                color: Color.BLACK,
              }}>
              Check You Order Status
            </Text>
            <TouchableOpacity
              onPress={() => checkstatusclick()}
              style={{
                backgroundColor: Color.PRIMARY,
                width: 150,
                borderRadius: 10,
                marginTop: 20,
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center',
                height: 50,
              }}>
              <Text
                style={{
                  color: Color.CLEANWHITE,
                  fontFamily: 'Rubik-Light',
                  textAlign: 'center',
                }}>
                Check Status
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </ImageBackground>
      </Modal>
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
          <Ionicons name="chevron-back" color={Color.BLACK} size={20} />
        </TouchableOpacity>
      </View>
      <View style={Styles.contant}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 25,
            fontFamily: 'Rubik-Medium',
            color: Color.BLACK,
            letterSpacing: 2,
          }}>
          Cart
        </Text>
        <Animatable.View animation="slideInLeft" delay={10}>
          <ScrollView
            style={Styles.scroll}
            showsVerticalScrollIndicator={false}>
            {cartproductfinal.length === 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '80%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: Color.BLACK,
                    fontFamily: 'Rubik-Light',
                  }}>
                  Your Cart is Empty
                </Text>
              </View>
            ) : (
              cartproductfinal.map((value, index) => (
                <Cartlist
                  key={value.productid + index}
                  ids={value.uniid}
                  title={value.productname}
                  price={value.price}
                  image={value.image}
                  quantity={value.quantity}
                  increase={e => increasecount(e)}
                  decrease={e => decreasecount(e)}
                  action={id => deletesingle(id)}
                  singleid={value.productid}
                />
              ))
            )}

            {cartproductfinal.length != 0 && (
              <>
                <Animatable.View
                  style={{
                    flexDirection: 'row',

                    justifyContent: 'space-between',
                    marginTop: 20,
                  }}
                  animation="fadeInDown"
                  delay={100}>
                  <Text style={{fontFamily: 'Rubik-Light', fontSize: 20}}>
                    Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Rubik-Medium',
                      fontSize: 20,
                      color: Color.BLACK,
                    }}>
                    ₹ {total}
                  </Text>
                </Animatable.View>

                <TouchableOpacity
                  animation="fadeInDown"
                  delay={200}
                  disabled={cartproductfinal.length === 0}
                  onPress={() => placeorder()}
                  style={{
                    backgroundColor: Color.PRIMARY,
                    marginVertical: 20,
                    height: 40,
                    borderRadius: 10,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Color.CLEANWHITE,
                      fontFamily: 'Rubik-Medium',
                    }}>
                    place orders
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </Animatable.View>
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  main: {
    padding: 20,
    backgroundColor: Color.WHITE,
  },
  contant: {
    top: 90,
  },
  scroll: {
    padding: 10,
    backgroundColor: Color.CLEANWHITE,
    borderRadius: 10,
    position: 'relative',
    height: '91%',
    marginTop: 10,
  },
  checkout: {
    backgroundColor: Color.PRIMARY,
    marginVertical: 20,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginTop: 20,
  },
});
export default Cart;

{
  /* <View
style={{
  height: 1,
  backgroundColor: Color.LIGHTGRAY,
  marginVertical: 10,
}}></View> */
}
