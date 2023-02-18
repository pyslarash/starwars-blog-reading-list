// This is the file for the Redux Toolkit Store
import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoriteSlice';

export default configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
},
);