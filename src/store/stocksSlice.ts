import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { fetchStockData } from '../utils/api';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
}

interface StocksState {
  items: Stock[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StocksState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async () => {
  const response = await fetchStockData();
  return response;
});

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStocks.fulfilled, (state, action: PayloadAction<Stock[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch stocks';
      });
  },
});

export const selectAllStocks = (state: RootState) => state.stocks.items;

export default stocksSlice.reducer;