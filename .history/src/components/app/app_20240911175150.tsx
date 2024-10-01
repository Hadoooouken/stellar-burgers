import { useEffect } from 'react';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword, // Исправлено
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getIngredients } from '../../services/RootReducer';
import { getFeeds } from '../../services/FeedSlice';
import { useDispatch } from '../../services/store';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { getUser } from '../../services/UserSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Лента заказов'
              onClose={() => {
                navigate('/feed');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Детали ингредиента'
              onClose={() => {
                navigate('/');
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />{' '}
        {/* Исправлено */}
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='Информация о заказе'
              onClose={() => {
                navigate('/profile/orders');
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
