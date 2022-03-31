import {configureStore} from '@reduxjs/toolkit';
import favreducer from './favslicer';
import cartreducer from './cartslicer';

export const store = configureStore({
  reducer: {
    cart: cartreducer,
    fav: favreducer,
  },
});
