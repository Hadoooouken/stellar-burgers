import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/slices/ffff';
import { RootState } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (ordersHistoryRequest) {
    return <Preloader />;
  }

  if (ordersHistoryFailed) {
    return <p>Ошибка загрузки заказов</p>;
  }

  return <ProfileOrdersUI orders={ordersHistory || []} />;
};
