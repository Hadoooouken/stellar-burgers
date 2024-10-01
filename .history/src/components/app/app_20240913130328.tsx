import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { getFeeds } from '../../services/slices/FeedSlice';
import { getUser } from '../../services/slices/UserSlice';
import ProtectedRoute from '../../components/protectedRoute/ProtectedRoute';
import { Navigate, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  ForgotPassword
} from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  // Location state for modal detection
  const backgroundLocation = location.state && location.state.backgroundLocation;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>

        {/* Non-authenticated routes */}
        <Route
          path='/login'
          element={!isAuthorized ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path='/register'
          element={!isAuthorized ? <Register /> : <Navigate to='/' />}
        />
        <Route
          path='/forgot-password'
          element={!isAuthorized ? <ForgotPassword /> : <Navigate to='/' />}
        />
        <Route
          path='/reset-password'
          element={!isAuthorized ? <ResetPassword /> : <Navigate to='/' />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Modal Routes */}
      {backgroundLocation && (
        <>
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal title='Лента заказов' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title='Информация о заказе' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
