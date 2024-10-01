import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { getFeeds } from '../../services/slices/FeedSlice';
import { getUser } from '../../services/slices/UserSlice';
import ProtectedRoute from '../../components/protectedRoute/ProtectedRoute';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';

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
import { AppHeader} from '@components';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

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
        <Route path='/ingredients/:id' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<Feed />} />

        {/* Защищённые маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<ProfileOrders />} />
        </Route>

        {/* Неавторизованные маршруты */}
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
    </div>
  );
};

export default App;
