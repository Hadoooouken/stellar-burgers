import {
  getUserApi,
  TUserResponse,
  TRegisterData,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface IUserState {
  user: TUser | null;
  loading: boolean;
  error?: string | null;
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: ''
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
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const getUser = createAsyncThunk<TUserResponse>('user', async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'users',
  async (data) => registerUserApi(data)
);

export const registerUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'users',
  async (data) => registerUserApi(data)
);

// Action creators are generated for each case reducer function
export const { addBun } = userSlice.actions;

export default userSlice.reducer;
