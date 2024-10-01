import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchUserOrders } from '../../services/slices/OrderSlice'; // добавляем экшн для загрузки заказа
import { Preloader } from '@ui';
import { RootState } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>(); // получаем номер заказа из параметров
  const orderId = parseInt(number, 10); // преобразуем в число для сравнения
  
  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state: RootState) => state.order);

  const currentOrder = ordersHistory.find(order => order.number === orderId);

  useEffect(() => {
    if (!currentOrder) {
      // Если заказа нет в истории, загружаем его
      dispatch(fetchOrderById(orderId));
    }
  }, [currentOrder, orderId, dispatch]);

  if (ordersHistoryRequest) {
    return <Preloader />;
  }

  if (ordersHistoryFailed) {
    return <p>Ошибка загрузки заказа</p>;
  }

  if (!currentOrder) {
    return <p>Заказ не найден</p>; // Отображаем сообщение, если заказ не найден
  }

  return (
    <div>
      {/* Отобразите здесь детали заказа */}
      <p>Детали заказа #{currentOrder.number}</p>
    </div>
  );
};



//ГПТ ПЕРВАЯ ПОПЫТКА, ПОЧТИ ВСЕ РАБОТАЕТ
// import { FC, useMemo } from 'react';
// import { Preloader } from '../ui/preloader';
// import { OrderInfoUI } from '../ui/order-info';
// import { TIngredient } from '@utils-types';
// import { useParams } from 'react-router-dom';
// import { useSelector } from '../../services/store';

// export const OrderInfo: FC = () => {
//   const { number } = useParams();

//   // Получаем заказ как из глобальной ленты заказов, так и из истории заказов пользователя
//   const orderData = useSelector(
//     (state) =>
//       state.feed.orders.find((item) => item.number === Number(number)) ||
//       state.order.ordersHistory?.find((item) => item.number === Number(number))
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





//ОРИГИНАЛ
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
