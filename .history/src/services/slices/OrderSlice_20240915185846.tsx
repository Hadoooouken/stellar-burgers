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
  errorMessage: string | null; 
}

const initialState: IOrderState = {
  order: null,
  ordersHistory: null,
  orderRequest: false,
  orderFailed: false,
  ordersHistoryRequest: false,
  ordersHistoryFailed: false,
  errorMessage: "" 
};

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>(
  'order/create',
  async (ingredients: string[], { dispatch, rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);

      dispatch(resetConstructor());
      return response.order;
    } catch (error) {
     
      return rejectWithValue(
        'Failed to create order: ' + (error as Error).message
      );
    }
  }
);

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error) {
   
    return rejectWithValue(
      'Failed to fetch user orders: ' + (error as Error).message
    );
  }
});

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
        state.errorMessage = null; // Сбрасываем ошибку
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderFailed = true;
        state.orderRequest = false;
        state.errorMessage = action.payload || 'An error occurred'; // Сохраняем сообщение об ошибке
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.ordersHistoryRequest = true;
        state.ordersHistoryFailed = false;
        state.errorMessage = null; // Сбрасываем ошибку
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.ordersHistory = action.payload;
        state.ordersHistoryRequest = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.ordersHistoryFailed = true;
        state.ordersHistoryRequest = false;
        state.errorMessage = action.payload || 'An error occurred'; // Сохраняем сообщение об ошибке
      });
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
