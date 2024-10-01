import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orderRequest: boolean;
  order: TOrder | null;
  orderFailed: boolean;
}

const initialState: OrderState = {
  orderRequest: false,
  order: null,
  orderFailed: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest(state) {
      state.orderRequest = true;
    },
    createOrderSuccess(state, action: PayloadAction<TOrder>) {
      state.orderRequest = false;
      state.order = action.payload;
    },
    createOrderFailure(state) {
      state.orderRequest = false;
      state.orderFailed = true;
    },
    closeModal(state) {
      state.order = null;
    },
  },
});

export const { createOrderRequest, createOrderSuccess, createOrderFailure, closeModal } = orderSlice.actions;
export default orderSlice.reducer;
