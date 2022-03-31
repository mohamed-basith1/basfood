import {createSlice} from '@reduxjs/toolkit';

const cartreducer = createSlice({
  name: 'cart',
  initialState: {
    cart: [{id: 1, title: 'cart', desc: 'hdhfhdshs'}],
  },
  reducers: {
    addcart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const {addcart} = cartreducer.actions;

export default cartreducer.reducer;
