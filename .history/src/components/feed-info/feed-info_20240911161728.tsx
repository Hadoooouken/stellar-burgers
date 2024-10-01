import { FC } from 'react';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] => {
  console.log("Filtering orders with status:", status);
  return orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);
};

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const feed = useSelector((state) => ({
    total: state.feed.total,
    totalToday: state.feed.totalToday
  }));

  console.log("Orders from state:", orders);
  console.log("Feed data from state:", feed);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  console.log("Ready orders:", readyOrders);
  console.log("Pending orders:", pendingOrders);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
