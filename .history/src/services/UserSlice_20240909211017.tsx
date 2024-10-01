import { getUserApi, TUserResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface IUserState {
  user: TUser | null;
  loading: boolean;
  error?: '' | null;
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.user = action.payload;
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
        state.user = action.payload.user;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const getusers = createAsyncThunk<TUserResponse>('users', async () =>
  getUserApi()
);

// Action creators are generated for each case reducer function
export const { addBun } = userSlice.actions;

export default userSlice.reducer;
