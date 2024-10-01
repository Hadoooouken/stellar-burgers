//КАЧЕК

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { useEffect } from 'react';
import { useDispatch } from '../../services/store';

import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import { getUser } from 'src/services/slices/UserSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  useEffect(() => {
    dispatch(get());
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Заказ'
                onClose={() => {
                  navigate(backgroundLocation);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(backgroundLocation);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Информаци по заказу'
                  onClose={() => navigate(backgroundLocation)}
                >
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

//GELENA

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
// import { useEffect } from 'react';
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// import { ProtectedRoute } from '../protected-route';
// import { fetchIngredients } from '../../services/ingredientsSlice';
// import { AppHeader, OrderInfo, Modal, IngredientDetails } from '@components';
// import { useDispatch } from '../../services/store';

// const App = () => {
//   const location = useLocation();
//   const background = location.state?.background;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(());
//     dispatch(fetchIngredients());
//   }, [dispatch]);

//   return (
//     <div className={styles.app}>
//       <AppHeader />
//       <Routes location={background || location}>
//         <Route path='/' element={<ConstructorPage />} />
//         <Route path='/feed' element={<Feed />} />
//         <Route
//           path='/login'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Login />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/register'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <Register />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/forgot-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ForgotPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/reset-password'
//           element={
//             <ProtectedRoute onlyUnAuth>
//               <ResetPassword />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders'
//           element={
//             <ProtectedRoute>
//               <ProfileOrders />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/profile/orders/:number'
//           element={
//             <ProtectedRoute>
//               <OrderInfo />
//             </ProtectedRoute>
//           }
//         />
//         <Route path='/ingredients/:id' element={<IngredientDetails />} />
//         <Route path='/feed/:number' element={<OrderInfo />} />
//         <Route path='*' element={<NotFound404 />} />
//       </Routes>

//       {background && (
//         <Routes>
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal title='Детали заказа' onClose={() => navigate('/feed')}>
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//           <Route
//             path='/ingredients/:id'
//             element={
//               <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <Modal
//                 title='Детали заказа'
//                 onClose={() => navigate('/profile/orders')}
//               >
//                 <OrderInfo />
//               </Modal>
//             }
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default App;

// ОРИГИНАЛ

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

//gpt
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
