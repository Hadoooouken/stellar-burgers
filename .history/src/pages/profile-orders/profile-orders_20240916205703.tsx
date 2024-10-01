// import { ProfileOrdersUI } from '@ui-pages';
// import { useDispatch, useSelector } from '../../services/store';
// import { TOrder } from '@utils-types';
// import { FC, useEffect } from 'react';
// import { fetchUserOrders } from '../../services/slices/OrderSlice';
// import { RootState } from '../../services/store';
// import { Preloader } from '@ui';
// import { Modal, OrderInfo } from '@components';
// import { useNavigate, useParams } from 'react-router-dom';

// export const ProfileOrders: FC = () => {
//   const dispatch = useDispatch();

//   const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
//     useSelector((state: RootState) => state.order);

//   useEffect(() => {
//     dispatch(fetchUserOrders());
//   }, [dispatch]);

//   if (ordersHistoryRequest) {
//     return <Preloader />;
//   }

//   if (ordersHistoryFailed) {
//     return <p>Ошибка загрузки заказов</p>;
//   }

//   return (
//     <>
//       <ProfileOrdersUI orders={ordersHistory || []} />;
//     </>
//   );
// };
import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/OrderSlice';
import { RootState } from '../../services/store';
import { Preloader } from '@ui';
import { Modal, OrderInfo } from '@components';
import { useNavigate, useParams } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state: RootState) => state.order);

  // Загружаем историю заказов, если она еще не была загружена
  useEffect(() => {
    if (!ordersHistory) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, ordersHistory]);

  // Если идет запрос за заказами — показываем прелоадер
  if (ordersHistoryRequest) {
    return <Preloader />;
  }

  // Если произошла ошибка при загрузке заказов
  if (ordersHistoryFailed) {
    console.error("Ошибка при загрузке заказов.");
    return <p>Ошибка загрузки заказов. Попробуйте позже.</p>;
  }

  // Если заказы загружены, но их нет — показываем сообщение
  if (ordersHistory && ordersHistory.length === 0) {
    return <p>У вас пока нет заказов.</p>;
  }

  return (
    <>
      <ProfileOrdersUI orders={ordersHistory || []} />
    </>
  );
};
