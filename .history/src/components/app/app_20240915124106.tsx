import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { getFeeds } from '../../services/slices/FeedSlice';
import { getUser } from '../../services/slices/UserSlice';
import ProtectedRoute from '../../components/protectedRoute/ProtectedRoute';
import { Navigate, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

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
  const state = location.state as { backgroundLocation?: Location };
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
    dispatch(getUser());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute onlyUnAuth>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path='feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;



// import {
//   ConstructorPage,
//   Feed,
//   ForgotPassword,
//   Login,
//   NotFound404,
//   Profile,
//   ProfileOrders,
//   Register,
//   ResetPassword
// } from '@pages';
// import '../../index.css';
// import styles from './app.module.css';

// import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
// import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
// import { ProtectedRoute } from '../routes/ProtectedRoute';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from '../../services/store';
// import {
//   fetchIngredients,
//   selectIngredients
// } from '../../slices/ingredientsSlice';
// import { fetchFeed, selectFeed } from '../../slices/feedSlice';



// export default App;


//оригинал
// import { useEffect } from 'react';

// import { useDispatch, useSelector } from '../../services/store';
// import { getIngredients } from '../../services/slices/IngredientsSlice';
// import { getFeeds } from '../../services/slices/FeedSlice';
// import { getUser } from '../../services/slices/UserSlice';
// import ProtectedRoute from '../../components/protectedRoute/ProtectedRoute';
// import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';

// import {
//   ConstructorPage,
//   Feed,
//   Login,
//   Register,
//   ResetPassword,
//   Profile,
//   ProfileOrders,
//   NotFound404,
//   ForgotPassword
// } from '@pages';
// import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
// import '../../index.css';
// import styles from './app.module.css';

// const App = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isAuthorized = useSelector((state) => state.user.isAuthorized);

//   useEffect(() => {
//     dispatch(getIngredients());
//     dispatch(getFeeds());
//     dispatch(getUser());
//   }, [dispatch]);

//   return (
//     <div className={styles.app}>
//       <AppHeader />

//       <Routes>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/ingredients/:id' element={<ConstructorPage />} />

//         <Route path='/feed' element={<Feed />} />
//         <Route path='/feed/:number' element={<Feed />} />

//         {/* Защищённые маршруты */}
//         <Route element={<ProtectedRoute />}>
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/profile/orders' element={<ProfileOrders />} />
//           <Route path='/profile/orders/:number' element={<ProfileOrders />} />
//         </Route>

//         {/* Неавторизованные маршруты */}
//         <Route
//           path='/login'
//           element={!isAuthorized ? <Login /> : <Navigate to='/' />}
//         />
//         <Route
//           path='/register'
//           element={!isAuthorized ? <Register /> : <Navigate to='/' />}
//         />
//         <Route
//           path='/forgot-password'
//           element={!isAuthorized ? <ForgotPassword /> : <Navigate to='/' />}
//         />
//         <Route
//           path='/reset-password'
//           element={!isAuthorized ? <ResetPassword /> : <Navigate to='/' />}
//         />

//         <Route path='*' element={<NotFound404 />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


//гпт
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from '../../services/store';
// import { getIngredients } from '../../services/slices/IngredientsSlice';
// import { getFeeds } from '../../services/slices/FeedSlice';
// import { getUser } from '../../services/slices/UserSlice';
// import ProtectedRoute from '../../components/protectedRoute/ProtectedRoute';
// import {
//   Navigate,
//   Routes,
//   Route,
//   useNavigate,
//   useLocation
// } from 'react-router-dom';

// import {
//   ConstructorPage,
//   Feed,
//   Login,
//   Register,
//   ResetPassword,
//   Profile,
//   ProfileOrders,
//   NotFound404,
//   ForgotPassword
// } from '@pages';
// import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
// import '../../index.css';
// import styles from './app.module.css';

// const App = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthorized = useSelector((state) => state.user.isAuthorized);

//   // background для отслеживания предыдущего местоположения
//   const background = location.state && location.state.background;

//   useEffect(() => {
//     dispatch(getIngredients());
//     dispatch(getFeeds());
//     dispatch(getUser());
//   }, [dispatch]);

//   return (
//     <div className={styles.app}>
//       <AppHeader />

//       {/* Роутинг с учётом модального окна (если есть background) */}
//       <Routes location={background || location}>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/ingredients/:id' element={<IngredientDetails />} />

//         <Route path='/feed' element={<Feed />} />
//         <Route path='/feed/:number' element={<OrderInfo />} />

//         {/* Защищённые маршруты */}
//         <Route element={<ProtectedRoute />}>
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/profile/orders' element={<ProfileOrders />} />
//           <Route path='/profile/orders/:number' element={<OrderInfo />} />
//         </Route>

//         {/* Неавторизованные маршруты */}
//         <Route
//           path='/login'
//           element={!isAuthorized ? <Login /> : <Navigate to='/' />}
//         />
//         <Route
//           path='/register'
//           element={!isAuthorized ? <Register /> : <Navigate to='/' />}
//         />
//         <Route
//           path='/forgot-password'
//           element={!isAuthorized ? <ForgotPassword /> : <Navigate to='/' />}
//         />
//         <Route
//           path='/reset-password'
//           element={!isAuthorized ? <ResetPassword /> : <Navigate to='/' />}
//         />

//         <Route path='*' element={<NotFound404 />} />
//       </Routes>

//       {/* Модальные окна для ингредиентов и заказов */}
//       {background && (
//         <>
//           <Routes>
//             <Route
//               path='/ingredients/:id'
//               element={
//                 <Modal
//                   title='Ingredient Details' // передаём заголовок
//                   onClose={() => navigate(-1)}
//                 >
//                   <IngredientDetails />
//                 </Modal>
//               }
//             />
//             <Route
//               path='/feed/:number'
//               element={
//                 <Modal
//                   title='Order Details' // передаём заголовок
//                   onClose={() => navigate(-1)}
//                 >
//                   <OrderInfo />
//                 </Modal>
//               }
//             />
//             <Route
//               path='/profile/orders/:number'
//               element={
//                 <Modal
//                   title='Order Details' // передаём заголовок
//                   onClose={() => navigate(-1)}
//                 >
//                   <OrderInfo />
//                 </Modal>
//               }
//             />
//           </Routes>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
