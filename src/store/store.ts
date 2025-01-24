import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stocksSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;