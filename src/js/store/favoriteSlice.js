import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: [], // Setting up an array of objects. We will be passing title + link in here
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState, // Utilizing htat initialState we created earlier
  reducers: {
    passTheFavorite: (state, action) => {
        const { title, link } = action.payload; 
        state.favorites.push({ title, link }); // Pushing title + link into the favorites array
      },
    deleteTheFavorite : (state, action) => {
        const { title, link } = action.payload;
        state.favorites = state.favorites.filter(
          (favorite) => favorite.title !== title || favorite.link !== link
        );
      }, // Deleting title + link from the favorites array
  },
});

export const { passTheFavorite, deleteTheFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
