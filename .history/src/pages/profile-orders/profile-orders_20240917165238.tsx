import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { fetchUserOrders } from '../../services/slices/OrderSlice';
import { RootState } from '../../services/store';
import { Preloader } from '@ui';
import { Modal, OrderInfo } from '@components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  const { ordersHistory, ordersHistoryRequest, ordersHistoryFailed } =
    useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (id && ordersHistory) {
      const order = ordersHistory.find((order) => order._id === id);
      if (order) {
        setSelectedOrder(order);
      }
    }
  }, [id, ordersHistory]);

  const handleOrderClick = (orderId: string) => {
    navigate(`/profile/orders/${orderId}`, { state: { background: location } });
  };

  const handleCloseModal = () => {
    navigate('/profile/orders');
    setSelectedOrder(null);
  };

  if (ordersHistoryRequest) {
    return <Preloader />;
  }

  if (ordersHistoryFailed) {
    return <p>Ошибка загрузки заказов</p>;
  }

  return (
    <>
      <ProfileOrdersUI orders={ordersHistory || []} onOrderClick={handleOrderClick} />
      {selectedOrder && (
        <Modal onClose={handleCloseModal}>
          <OrderInfo order={selectedOrder} />
        </Modal>
      )}
    </>
  );
};


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
