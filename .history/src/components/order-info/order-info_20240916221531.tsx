// import { FC, useMemo } from 'react';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';
// import { useParams } from 'react-router-dom';
// import { useSelector } from '../../services/store';

// export const OrderInfo: FC = () => {
//   const { number } = useParams();

//   const orderData = useSelector((state) =>
//     state.feed.orders.find((item) => item.number === Number(number))
//   );

//   const ingredients: TIngredient[] = useSelector(
//     (state) => state.ingredients.ingredients
//   );

//   /* Готовим данные для отображения */
//   const orderInfo = useMemo(() => {
//     if (!orderData || !ingredients.length) return null;

//     const date = new Date(orderData.createdAt);

//     type TIngredientsWithCount = {
//       [key: string]: TIngredient & { count: number };
//     };

//     const ingredientsInfo = orderData.ingredients?.reduce(
//       (acc: TIngredientsWithCount, item) => {
//         if (!acc[item]) {
//           const ingredient = ingredients.find((ing) => ing._id === item);
//           if (ingredient) {
//             acc[item] = {
//               ...ingredient,
//               count: 1
//             };
//           }
//         } else {
//           acc[item].count++;
//         }

//         return acc;
//       },
//       {}
//     );

//     const total = Object.values(ingredientsInfo).reduce(
//       (acc, item) => acc + item.price * item.count,
//       0
//     );

//     return {
//       ...orderData,
//       ingredientsInfo,
//       date,
//       total
//     };
//   }, [orderData, ingredients]);

//   if (!orderInfo) {
//     return <Preloader />;
//   }

//   return <OrderInfoUI orderInfo={orderInfo} />;
// };

import { getFeedsApi, getOrderApi, type TFeedsResponse, type TOrderResponse } from '@api'; // Импортируем новый API метод
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// Интерфейс состояния
export interface IFeedState {
  loading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  order?: TOrder; // Добавляем заказ
  error?: string | null;
}

const initialState: IFeedState = {
  loading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  order: undefined, // Начальное состояние для заказа
  error: ''
};

// Создаем срез
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Загрузка всех заказов
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      // Загрузка конкретного заказа
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // Сохраняем загруженный заказ
      });
  }
});

// Создаем асинхронные экшены
export const getFeeds = createAsyncThunk<TFeedsResponse>('feeds', async () =>
  getFeedsApi()
);

export const fetchOrder = createAsyncThunk<TOrderResponse, number>('order', async (orderId) =>
  getOrderApi(orderId) // Новый API метод для получения конкретного заказа
);

// Экспортируем экшены
export const { addBun } = feedSlice.actions;

// Экспортируем редуктор
export default feedSlice.reducer;
