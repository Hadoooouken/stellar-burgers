// userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserApi, TUserResponse, TRegisterData, registerUserApi, loginUserApi, updateUserApi, logoutUserApi } from '@api';
import { deleteCookie } from '../utils/cookie'; // Импортируем функцию для удаления куки
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
  error: '',
};

// Async Thunks
export const getUser = createAsyncThunk<TUserResponse>(
  'user/getUser',
  async () => getUserApi()
);

export const registerUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/register',
  async (data) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления пользователя');
    }
  });

// Новый Thunk для выхода из системы
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserApi(); // Предположим, что у вас есть функция для выхода из системы
      deleteCookie('accessToken'); // Удаляем токены
      localStorage.removeItem('refreshToken');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка выхода из системы');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение пользователя
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuth = true;
      })

      // Авторизация пользователя
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ошибка обновления
      })

      // Выход из системы
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ошибка выхода
      });
  }
});

// Экспорт редьюсера
export default userSlice.reducer;
