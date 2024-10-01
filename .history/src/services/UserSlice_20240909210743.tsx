import { getUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  TUser } from '@utils-types';

export interface IUserState {
  user: TUser;
}

const initialState: IUserState = {
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getusers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getusers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getusers.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const getusers = createAsyncThunk<TusersResponse>('users', async () =>
  getUserApi()
);

// Action creators are generated for each case reducer function
export const { addBun } = userSlice.actions;

export default userSlice.reducer;
