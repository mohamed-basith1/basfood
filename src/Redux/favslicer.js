import {createSlice} from '@reduxjs/toolkit';

const favreducer = createSlice({
  name: 'fav',
  initialState: {
    fav: [{id: 1, title: 'fav', desc: 'hdhfhdshs'}],
  },
  reducers: {
    addfav: (state, action) => {
      state.fav.push(action.payload);
    },
  },
});

export const {addfav} = favreducer.actions;

export default favreducer.reducer;
