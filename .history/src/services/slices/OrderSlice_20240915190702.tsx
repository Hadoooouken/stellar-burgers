import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { resetConstructor } from './ConstructorSlice';

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
  ordersHistoryFailed: false,
};

export const createOrder = createAsyncThunk<TOrder, string[], { rejectValue: string }>(
  'order/create',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);

      dispatch(resetConstructor());
      return response.order;
    } catch (error) {
      return rejectWithValue('Failed to create order: ' + (error as Error).message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk<TOrder[], void, { rejectValue: string }>(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue('Failed to fetch user orders: ' + (error as Error).message);
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
      .addCase(createOrder.rejected, (_, action) => {
        console.error(action.payload);  // Выводим ошибку только в консоль
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersHistoryRequest = true;
        state.ordersHistoryFailed = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersHistory = action.payload;
        state.ordersHistoryRequest = false;
      })
      .addCase(fetchUserOrders.rejected, (_, action) => {
        console.error(action.payload);  // Выводим ошибку только в консоль
      });
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
