import React, {useEffect, useState} from 'react';

import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Card from '../../Components/Card';
import Searchbar from '../../Components/Searchbar';
import Axios from '../../Api/admin';
import Color from '../../Const/Color';

const search = () => {
  const [text, setText] = useState('');
  const [allproduct, setAllproduct] = useState('');
  const [loader, setLoader] = useState(false);
  const [fetchproduct, setFetchproduct] = useState('');

  useEffect(() => {
    getallproduct();
  }, []);

  useEffect(() => {
    searchfilterproduct();
  }, [text]);
  const getallproduct = async () => {
    const response = await Axios.get('/product/products');
    console.log(response.data);
    setFetchproduct(response.data);
    setLoader(true);
  };
  const searchfilterproduct = async () => {
    const filtered = await fetchproduct.filter(value => {
      if (value.productname.toLowerCase().includes(text.toLowerCase())) {
        return value;
      } else {
        return null;
      }
    });
    console.log(filtered);
    const anotherfilter = filtered.filter(value => !value.popid);
    console.log('ethu another filter', anotherfilter);
    setAllproduct(anotherfilter);
  };

  return (
    <View style={styles.main}>
      <View style={styles.searchbar}>
        <Searchbar onChangeText={val => setText(val)} value={text} />
        {loader ? (
          <View
            style={{
              height: '100%',
              paddingBottom: 150,
              marginTop: 20,
            }}>
            <FlatList
              style={{flex: 1}}
              data={allproduct}
              keyExtractor={(item, index) => index}
              horizontal={false}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{marginBottom: 10}}
              renderItem={({item}) => (
                <View
                  style={{
                    marginRight: 0,
                  }}>
                  <Card
                    heigth={200}
                    width={160}
                    id={item.id}
                    price={item.price}
                    showoption={false}
                    image={item.image}
                    title={item.productname}
                    // Heartadd={title => Heartadd(title)}
                    // Heartremove={title => Heartremove(title)}
                  />
                </View>
              )}
            />
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 20,
  },
  searchbar: {
    marginTop: 20,
  },
});
export default search;

// <Card
//               heigth={200}
//               width={150}
//               price={56}
//               title={'check'}
//               // Heartadd={title => Heartadd(title)}
//               // Heartremove={title => Heartremove(title)}
//             />
//             <Card
//               heigth={200}
//               width={150}
//               price={56}
//               title={'check'}
//               // Heartadd={title => Heartadd(title)}
//               // Heartremove={title => Heartremove(title)}
//             />
