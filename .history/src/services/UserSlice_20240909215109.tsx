import {
  getUserApi,
  TUserResponse,
  TRegisterData,
  TAuthResponse,
  TLoginData,
  registerUserApi,
  loginUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface IUserState {
  user: TUser | null;
  isAuth: boolean;
  loading: boolean;
  error?: string | null;
}

const initialState: IUserState = {
  user: null,
  isAuth: false,
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
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.;
      });
  }
});

export const getUser = createAsyncThunk<TUserResponse>('user', async () =>
  getUserApi()
);

export const registerUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'users/register',
  async (data) => registerUserApi(data)
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'users/login',
  async (data) => loginUserApi(data)
);

// Action creators are generated for each case reducer function
export const { addBun } = userSlice.actions;

export default userSlice.reducer;
