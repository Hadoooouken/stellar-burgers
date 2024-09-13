import { FC } from 'react';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] => {
  const statusToLower = status.toLowerCase();

  const filteredOrders = orders.filter(
    (item) => item.status.toLowerCase() === statusToLower
  );

  return filteredOrders.map((item) => item.number).slice(0, 20);
};

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const feed = useSelector((state) => ({
    total: state.feed.total,
    totalToday: state.feed.totalToday
  }));

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
