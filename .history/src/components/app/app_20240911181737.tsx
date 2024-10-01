import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/RootReducer';
import { getFeeds } from '../../services/FeedSlice';
import { getUser } from '../../services/UserSlice';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import ProtectedRoute from '../../components/';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );

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
        <Route
          path='/login'
          element={isAuthorized ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path='/register'
          element={isAuthorized ? <Navigate to='/' /> : <Register />}
        />
        <Route
          path='/forgot-password'
          element={isAuthorized ? <Navigate to='/' /> : <ForgotPassword />}
        />
        <Route
          path='/reset-password'
          element={isAuthorized ? <Navigate to='/' /> : <ResetPassword />}
        />

        {/* Защищённые маршруты */}
        <Route element={<ProtectedRoute />}>
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
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
