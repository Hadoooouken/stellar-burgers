import {
  getUserApi,
  TUserResponse,
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';

// Интерфейс состояния пользователя
export interface IUserState {
  user: TUser | null;
  isAuth: boolean;
  loading: boolean;
  error?: string | null;
  isEditing: boolean; // Добавлено состояние для редактирования
}

// Начальное состояние
const initialState: IUserState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null, // Изменено на null для лучшей обработки ошибок
  isEditing: false // Начальное значение состояния редактирования
};

// Асинхронные операции (Thunks)
export const getUser = createAsyncThunk<TUserResponse>(
  'user/getUser',
  async () => {
    const response = await getUserApi();
    return response; // Убедитесь, что возвращаете нужные данные
  }
);

export const registerUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/register',
  async (data) => {
    const response = await registerUserApi(data);
    return response; // Убедитесь, что возвращаете нужные данные
  }
);

export const loginUser = createAsyncThunk<TUser, Omit<TLoginData, 'name'>>(
  'user/loginUser',
  async ({ email, password }) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user; // Убедитесь, что возвращаете только пользователя
  }
);

// Thunk для обновления данных пользователя
export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user; // Убедитесь, что возвращаете только пользователя
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка обновления данных пользователя'
      );
    }
  }
);

// Slice пользователя
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsEditing(state, action) {
      state.isEditing = action.payload; // Обновление состояния редактирования
    }
  },
  extraReducers: (builder) => {
    builder
      // Получение пользователя
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Убедитесь, что ошибка сбрасывается
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Убедитесь, что поле user присутствует
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения данных';
      })

      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Убедитесь, что ошибка сбрасывается
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user; // Убедитесь, что поле user присутствует
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      // Авторизация пользователя
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Убедитесь, что ошибка сбрасывается
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload; // Убедитесь, что payload содержит пользователя
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })

      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Убедитесь, что ошибка сбрасывается
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Обновленные данные пользователя
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сообщение об ошибке
      });
  }
});

// Экспорт действий
export const { setIsEditing } = userSlice.actions;

// Экспорт редьюсера
export default userSlice.reducer;
