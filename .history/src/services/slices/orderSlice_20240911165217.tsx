import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api'; // Импортируйте вашу функцию получения заказов
import { TOrder } from '@utils-types';

export interface IOrderState {
  orders: TOrder[]; // Обновляем состояние для хранения массива заказов
  ordersRequest: boolean;
  ordersFailed: boolean;
}

const initialState: IOrderState = {
  orders: [],
  ordersRequest: false,
  ordersFailed: false
};

// Создаем асинхронное действие для получения заказов пользователя
export const fetchUserOrders = createAsyncThunk<TOrder[]>(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi(); // Получаем заказы
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
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersRequest = true;
        state.ordersFailed = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersRequest = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.ordersFailed = true;
        state.ordersRequest = false;
      });
  }
});

export const { closeModal } = orderSlice.actions;

export default orderSlice.reducer;
