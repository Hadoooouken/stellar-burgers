import { getFeedsApi, type TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IFeedState {
  loading: boolean;
  feeds: TOrder[];
  error?: string | null;
}

const initialState: IFeedState = {
  loading: false,
  feeds: [],
  error: ''
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.feeds = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        orders: TOrder[];
        total: number;
        totalToday: number;
        state.orders = action.payload;
        state.feeds = action.payload;
        state.feeds = action.payload;
      });
  }
});

export const getFeeds = createAsyncThunk<TFeedsResponse>('feeds', async () =>
  getFeedsApi()
);

// Action creators are generated for each case reducer function
export const { addBun } = feedSlice.actions;

export default feedSlice.reducer;
