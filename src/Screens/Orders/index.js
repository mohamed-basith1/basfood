import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from '../../Api/axios';
import Color from '../../Const/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {io} from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

///////////////////////////////////
const width1 = Dimensions.get('screen').width;
const width = Math.floor(width1);
const Orders = () => {
  const [change, setChange] = useState('red');
  const [orderlist, setOrderlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(false);
  useEffect(() => {
    console.log('na marupathiyum');
    getorderdetails();
  }, [change]);
  console.log('history details', history);

  //socket connection to 8000
  const socket = io('https://adminpanalfinalfood.herokuapp.com');

  socket.on('orderstatus', data => {
    console.log(data);
    console.log('socket triger aaguthu');
    setChange(data);
  });

  const getorderdetails = async () => {
    console.log('email get panna start');
    const getemailid = await AsyncStorage.getItem('email');
    const data = {email: getemailid};
    const response = await axios.post('order/getorders', data).then(res => {
      setOrderlist(res.data);
      getorderhistory();
    });
  };
  console.log(orderlist);

  const getorderhistory = async () => {
    const getemailid = await AsyncStorage.getItem('email');
    const data2 = {email: getemailid};
    const response = await axios.post('history/getallhistory', data2);
    console.log(response.data);
    setHistory(response.data);
  };
  // dont touch it
  const statuslist = [
    {
      title: 'Pending',
      subtitle: 'Your order is waiting to confirmed',
      id: 18969,
    },
    {
      title: 'Order Confirmed',
      subtitle: 'Your order has been taken',
      id: 2787897,
    },
    {
      title: 'Order Prepared',
      subtitle: 'Your order has been prepared',
      id: 3908907,
    },
    {
      title: 'Delivery in Progress',
      subtitle: 'Hang on! your food is on the way',
      id: 4225,
    },
    {
      title: 'Completed',
      subtitle: 'Thank you for the orders ',
      id: 547545,
    },
  ];

  return (
    <View style={styles.main}>
      <View style={styles.headers}>
        <TouchableOpacity
          onPress={() => setPage(false)}
          style={{
            width: 100,
            height: 40,
            backgroundColor: page === false ? Color.PRIMARY : Color.LIGHTGRAY,
            borderRadius: 20,
            marginRight: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Rubik-Medium',
              color: page === false ? Color.CLEANWHITE : Color.BLACK,
            }}>
            Track
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPage(true)}
          style={{
            width: 100,
            height: 40,
            backgroundColor: page === true ? Color.PRIMARY : Color.LIGHTGRAY,
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Rubik-Medium',
              color: page === false ? Color.BLACK : Color.CLEANWHITE,
            }}>
            History
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Total Products</Text>
      </View>

      {page === false ? (
        orderlist.length === 0 ? (
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: Color.BLACK,
                fontFamily: 'Rubik-Light',
              }}>
              No Order in Track!
            </Text>
          </View>
        ) : (
          //////////////////////
          <>
            <FlatList
              data={orderlist}
              keyExtractor={(item, index) => item._id + index}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - 40}
              decelerationRate={100}
              scrollEventThrottle={16}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.maincont}>
                    <View style={styles.header}>
                      <View
                        style={{
                          height: 65,
                          width: 65,
                          borderRadius: 50,
                        }}>
                        <Image
                          source={{uri: item.productimage}}
                          style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 50,
                          }}
                        />
                      </View>

                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: 'Rubik-Medium',
                            color: Color.BLACK,
                          }}>
                          {item.productname}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: 'Rubik-Light',
                            color: Color.BLACK,
                          }}>
                          ₹ {item.productprice}
                        </Text>
                      </View>
                    </View>
                    {/* trackercontent */}
                    <Text
                      style={{
                        color: Color.BLACK,
                        fontSize: 18,
                        marginLeft: 20,
                        marginVertical: 20,
                      }}>
                      Track Orders
                    </Text>
                    <View style={styles.trackermain}>
                      {/* ///////////////////////////// */}

                      {statuslist.map((value, index) => {
                        return (
                          <>
                            <View
                              key={index}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor:
                                    index <= item.statusno
                                      ? Color.PRIMARY
                                      : Color.LIGHTGRAY,

                                  borderRadius: 50,
                                  marginLeft: 20,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Ionicons
                                  name="checkmark"
                                  color={Color.CLEANWHITE}
                                  size={20}
                                />
                              </View>
                              <View style={{marginLeft: 30}}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.BLACK,
                                    fontFamily: 'Rubik-Medium',
                                  }}>
                                  {value.title}
                                </Text>
                                <Text>{value.subtitle}</Text>
                              </View>
                            </View>
                            {index === 4 ? (
                              <View>
                                <View
                                  style={{
                                    height: 10,
                                    width: 2,
                                    marginLeft: 33,
                                    borderRadius: 10,
                                  }}></View>
                              </View>
                            ) : (
                              <View>
                                <View
                                  style={{
                                    height: 50,
                                    width: 2,
                                    backgroundColor:
                                      index < item.statusno
                                        ? Color.PRIMARY
                                        : Color.LIGHTGRAY,
                                    marginLeft: 33,
                                    borderRadius: 10,
                                  }}></View>
                              </View>
                            )}
                          </>
                        );
                      })}

                      {/* //////////////////////////////////////////////////////////////////// */}
                      {/* tracker 3*/}
                    </View>
                  </View>
                );
              }}
            />
          </>
          //////////////////////////////
        )
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={history}
            keyExtractor={(item, index) => item.deliverydate + index}
            showsVerticalScrollIndicator={false}
            snapToInterval={360}
            decelerationRate={100}
            scrollEventThrottle={16}
            renderItem={({item, index}) => {
              return (
                <View
                  key={item.deliverydate + index}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    height: 100,
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                    }}>
                    <Image
                      source={{uri: item.productimage}}
                      style={{width: '100%', height: '100%', borderRadius: 50}}
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',

                      height: 80,
                      marginLeft: 10,
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Medium',
                        fontSize: 16,
                        color: Color.BLACK,
                      }}>
                      {item.productname}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Light',
                        fontSize: 16,
                        color: Color.BLACK,
                      }}>
                      ₹ {''} {item.productprice}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Rubik-Light',
                        fontSize: 16,
                        color: Color.BLACK,
                      }}>
                      delivered {'  '} {item.deliverydate}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  main: {
    paddingTop: 50,
    paddingHorizontal: 20,

    flex: 1,
  },
  headers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: Color.LIGHTGRAY,
    borderRadius: 20,
    paddingVertical: 10,
  },
  maincont: {
    backgroundColor: 'white',
    width: width - 41,
    borderRadius: 10,
    padding: 10,
    marginRight: 2,
    marginBottom: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',

    height: 80,

    alignItems: 'center',
  },
  trackermain: {
    marginTop: 20,
  },
});
