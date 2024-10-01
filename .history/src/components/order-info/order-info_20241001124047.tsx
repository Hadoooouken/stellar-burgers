// import { FC, useEffect, useMemo } from 'react';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from '../../services/store';
// import { fetchOrderByNumber } from '../../services/slices/OrderSlice';

// export const OrderInfo: FC = () => {
//   const { number } = useParams();
//   const dispatch = useDispatch();

//   // Получаем заказ как из глобальной ленты заказов, так и из истории заказов пользователя
//   const orderData = useSelector(
//     (state) =>
//       state.feed.orders.find((item) => item.number === Number(number)) ||
//       state.order.ordersHistory?.find((item) => item.number === Number(number))
//   );

//   const ingredients: TIngredient[] = useSelector(
//     (state) => state.ingredients.ingredients
//   );

//   useEffect(() => {
//     if (!orderData) {
//       // Если заказ отсутствует в состоянии, загружаем его по номеру
//       dispatch(fetchOrderByNumber(Number(number)));
//     }
//   }, [orderData, number, dispatch]);

//   // Подготавливаем данные для отображения
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
