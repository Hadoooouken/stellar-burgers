import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store'; // Подключаем useDispatch и useSelector
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/orderSlice'; // Импортируем экшен для получения заказов
import { RootState } from '../../services/store'; // Типы
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  
  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders()); 
  }, [dispatch]);

  if (ordersHistoryRequest) {
    return <Preloader />; // Заменяем текст на Preloader
  }

  if (ordersHistoryFailed) {
    return <p>Ошибка загрузки заказов</p>;
  }

  return <ProfileOrdersUI orders={ordersHistory || []} />;
};
