

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
//   const { number } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

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
//       {number && (
//         <Modal title={`#${number}`} onClose={() => navigate('/profile/orders')}>
//           <OrderInfo />
//         </Modal>
//       )}
//     </>
//   );
// };
