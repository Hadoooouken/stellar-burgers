
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../services/slices/FeedSlice';
import { Modal, OrderInfo } from '@components';
import { useNavigate, useParams } from 'react-router-dom';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { number } = useParams();
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const loading: boolean = useSelector((state) => state.feed.loading);

  if (loading || !orders.length) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(getFeeds());
        }}
      />
      {number && (
        <Modal title={`#${number}`} onClose={() => navigate('/feed')}>
          <OrderInfo />
        </Modal>
      )}
    </>
  );
};
