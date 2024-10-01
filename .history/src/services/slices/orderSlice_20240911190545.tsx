import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { orderBurgerApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { resetConstructor } from '../ConstructorSlice';

export interface IOrderState {
  order: TOrder | null;
  ordersHistory: TOrder[] | null;
  orderRequest: boolean;
  orderFailed: boolean;
  ordersHistoryRequest: boolean;
  ordersHistoryFailed: boolean;
}

const initialState: IOrderState = {
  order: null,
  ordersHistory: null,
  orderRequest: false,
  orderFailed: false,
  ordersHistoryRequest: false,
  ordersHistoryFailed: false
};

// Асинхронное действие для создания заказа
export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredients: string[], { dispatch, rejectWithValue, getState }) => {
    const state = getState() as any; // Замените на корректный тип состояния
    const isAuthorized = Boolean(state.user.accessToken); // Проверьте, как у вас хранится информация о токене

    if (!isAuthorized) {
      return rejectWithValue('User not authorized'); // Вернуть ошибку, чтобы обработать её
    }

    try {
      const response = await orderBurgerApi(ingredients);
      dispatch(resetConstructor());
      return response.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[]>(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal(state) {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        if (action.payload === 'User not authorized') {
          // Используйте хук useNavigate для перенаправления
          const navigate = useNavigate();
          navigate('/login'); // Путь к странице авторизации
        }
        state.orderFailed = true;
        state.orderRequest = false;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersHistoryRequest = true;
        state.ordersHistoryFailed = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersHistory = action.payload;
        state.ordersHistoryRequest = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.ordersHistoryFailed = true;
        state.ordersHistoryRequest = false;
      });
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
