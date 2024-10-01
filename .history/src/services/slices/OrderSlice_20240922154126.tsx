// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { orderBurgerApi, getOrdersApi } from '@api';
// import { TOrder } from '@utils-types';
// import { resetConstructor } from './ConstructorSlice';

// export interface IOrderState {
//   order: TOrder | null;
//   ordersHistory: TOrder[] | null;
//   orderRequest: boolean;
//   orderFailed: boolean;
//   ordersHistoryRequest: boolean;
//   ordersHistoryFailed: boolean;
// }

// const initialState: IOrderState = {
//   order: null,
//   ordersHistory: null,
//   orderRequest: false,
//   orderFailed: false,
//   ordersHistoryRequest: false,
//   ordersHistoryFailed: false
// };

// export const createOrder = createAsyncThunk<TOrder, string[]>(
//   'order/create',
//   async (ingredients: string[], { dispatch, rejectWithValue }) => {
//     try {
//       const response = await orderBurgerApi(ingredients);

//       dispatch(resetConstructor());
//       return response.order;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const fetchUserOrders = createAsyncThunk<TOrder[]>(
//   'order/fetchUserOrders',
//   async (_, { rejectWithValue }) => {
//     try {
//       const orders = await getOrdersApi();
//       return orders;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     closeModal(state) {
//       state.order = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createOrder.pending, (state) => {
//         state.orderRequest = true;
//         state.orderFailed = false;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.order = action.payload;
//         state.orderRequest = false;
//       })
//       .addCase(createOrder.rejected, (state) => {
//         state.orderFailed = true;
//         state.orderRequest = false;
//       })

//       .addCase(fetchUserOrders.pending, (state) => {
//         state.ordersHistoryRequest = true;
//         state.ordersHistoryFailed = false;
//       })
//       .addCase(fetchUserOrders.fulfilled, (state, action) => {
//         state.ordersHistory = action.payload; // Сохраняем полученные заказы
//         state.ordersHistoryRequest = false;
//       })
//       .addCase(fetchUserOrders.rejected, (state) => {
//         state.ordersHistoryFailed = true;
//         state.ordersHistoryRequest = false;
//       });
//   }
// });

// export const { closeModal } = orderSlice.actions;
// export default orderSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { orderBurgerApi, getOrdersApi } from '@api';
// import { TOrder } from '@utils-types';
// import { resetConstructor } from './ConstructorSlice';

// export interface IOrderState {
//   order: TOrder | null;
//   ordersHistory: TOrder[] | null;
//   orderRequest: boolean;
//   orderFailed: boolean;
//   ordersHistoryRequest: boolean;
//   ordersHistoryFailed: boolean;
// }

// const initialState: IOrderState = {
//   order: null,
//   ordersHistory: null,
//   orderRequest: false,
//   orderFailed: false,
//   ordersHistoryRequest: false,
//   ordersHistoryFailed: false
// };

// // AsyncThunk для создания нового заказа
// export const createOrder = createAsyncThunk<TOrder, string[]>(
//   'order/create',
//   async (ingredients: string[], { dispatch, rejectWithValue }) => {
//     try {
//       const response = await orderBurgerApi(ingredients);

//       dispatch(resetConstructor());
//       return response.order;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // AsyncThunk для получения истории заказов пользователя
// export const fetchUserOrders = createAsyncThunk<TOrder[]>(
//   'order/fetchUserOrders',
//   async (_, { rejectWithValue }) => {
//     try {
//       const orders = await getOrdersApi();
//       return orders;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // AsyncThunk для получения заказа по номеру
// export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
//   'order/fetchOrderByNumber',
//   async (number, { rejectWithValue }) => {
//     try {
//       const orders = await getOrdersApi(); // Assuming this returns TOrder[]
//       const order = orders.find((order) => order.number === number);
//       if (!order) throw new Error('Order not found');
//       return order;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     closeModal(state) {
//       state.order = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Обработка создания заказа
//       .addCase(createOrder.pending, (state) => {
//         state.orderRequest = true;
//         state.orderFailed = false;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.order = action.payload;
//         state.orderRequest = false;
//       })
//       .addCase(createOrder.rejected, (state) => {
//         state.orderFailed = true;
//         state.orderRequest = false;
//       })

//       // Обработка получения истории заказов
//       .addCase(fetchUserOrders.pending, (state) => {
//         state.ordersHistoryRequest = true;
//         state.ordersHistoryFailed = false;
//       })
//       .addCase(fetchUserOrders.fulfilled, (state, action) => {
//         state.ordersHistory = action.payload;
//         state.ordersHistoryRequest = false;
//       })
//       .addCase(fetchUserOrders.rejected, (state) => {
//         state.ordersHistoryFailed = true;
//         state.ordersHistoryRequest = false;
//       })

//       // Обработка получения заказа по номеру
//       .addCase(fetchOrderByNumber.pending, (state) => {
//         state.ordersHistoryRequest = true;
//         state.ordersHistoryFailed = false;
//       })
//       .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
//         state.ordersHistory = [...(state.ordersHistory || []), action.payload];
//         state.ordersHistoryRequest = false;
//       })
//       .addCase(fetchOrderByNumber.rejected, (state) => {
//         state.ordersHistoryFailed = true;
//         state.ordersHistoryRequest = false;
//       });
//   }
// });

// export const { closeModal } = orderSlice.actions;
// export default orderSlice.reducer;
