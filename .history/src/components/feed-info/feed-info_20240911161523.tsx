export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const feed = useSelector((state) => ({
    total: state.feed.total,
    totalToday: state.feed.totalToday
  }));

  console.log("Orders:", orders);
  console.log("Feed data:", feed);

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
