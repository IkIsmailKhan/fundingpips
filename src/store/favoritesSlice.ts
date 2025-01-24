import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FavoritesState {
  items: string[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites.items;

export default favoritesSlice.reducer;