import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/FeedSlice';
import { Modal, OrderInfo, } from '@components';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useNavigate, useParams } from 'react-router-dom';
import { Preloader } from '@ui';


export const Feed: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { number } = useParams();
  const orders = useSelector((state: any) => state.feed.orders) as TOrder[];
  const loading = useSelector((state: any) => state.feed.loading) as boolean;

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  // Приведение `number` к типу `string` для сравнения
  const orderNumber = number ? parseInt(number, 10) : null;
  const orderDetails = orders.find(order => order.number === orderNumber);

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />
      {number ? (
        <Modal title={`#${number}`} onClose={() => navigate('/feed')}>
          <OrderInfo order={orderDetails} />
        </Modal>
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />
      )}
    </>
  );
};

// ОРИГИНАЛ
// import { Preloader } from '@ui';
// import { FeedUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC } from 'react';
// import { useDispatch, useSelector } from '../../services/store';
// import { getFeeds } from '../../services/slices/FeedSlice';
// import { Modal, OrderInfo } from '@components';
// import { useNavigate, useParams } from 'react-router-dom';

// export const Feed: FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { number } = useParams();
//   const orders: TOrder[] = useSelector((state) => state.feed.orders);
//   const loading: boolean = useSelector((state) => state.feed.loading);

//   if (loading || !orders.length) {
//     return <Preloader />;
//   }

//   return (
//     <>
//       <FeedUI
//         orders={orders}
//         handleGetFeeds={() => {
//           dispatch(getFeeds());
//         }}
//       />
//       {number && (
//         <Modal title={`#${number}`} onClose={() => navigate('/feed')}>
//           <OrderInfo />
//         </Modal>
//       )}
//     </>
//   );
// };
