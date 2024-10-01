import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store'; // Подключаем useDispatch и useSelector
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/orderSlice'; // Импортируем экшен для получения заказов
import { RootState } from '../../services/store'; // Типы


export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  // Получаем заказы из хранилища
  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders()); // Загружаем заказы при монтировании компонента
  }, [dispatch]);

  if (ordersHistoryRequest) {
    return <Preloader />; // Заменяем текст на Preloader
  }

  if (ordersHistoryFailed) {
    return <p>Ошибка загрузки заказов</p>;
  }

  return <ProfileOrdersUI orders={ordersHistory || []} />;
};
