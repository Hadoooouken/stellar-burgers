import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, get } from '@api';
import { TOrder } from '@utils-types';

export interface IOrderState {
  order: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: IOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false
};

// Создаем асинхронное действие для создания заказа
export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      return response.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Добавляем редьюсер для закрытия модального окна
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
      .addCase(createOrder.rejected, (state) => {
        state.orderFailed = true;
        state.orderRequest = false;
      });
  }
});

// Экспортируем действие для закрытия модального окна
export const { closeModal } = orderSlice.actions;

export default orderSlice.reducer;
