import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { getFeeds } from '../../services/slices/FeedSlice';
import { getUser } from '../../services/slices/UserSlice';
import { ProtectedRoute } from '../../components/protectedRoute/ProtectedRoute';
import {
  Navigate,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';

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

  // Определяем, была ли открыта модалка до этого
  const backgroundLocation = location.state?.background || null;

  const feedNumber = useMatch('/feed/:number')?.params.number;
  const profileNumber = useMatch('/profile/orders/:number')?.params.number;

  const orderId = feedNumber || profileNumber;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getFeeds());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Определяем отображение страницы или модального окна */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />

        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                #{String(orderId).padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />

        {/* Защищённые маршруты */}
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
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  #{String(orderId).padStart(6, '0')}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Неавторизованные маршруты */}
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

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна для тех, кто перешёл по клику, сохраняя состояние backgroundLocation */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${String(orderId).padStart(6, '0')}`}
                onClose={() => {
                  navigate(-1);  // Закрываем модалку и возвращаемся на предыдущую страницу
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
                  navigate(-1);  // Закрываем модалку и возвращаемся на предыдущую страницу
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
                  title={`#${String(orderId).padStart(6, '0')}`}
                  onClose={() => {
                    navigate(-1);  // Закрываем модалку и возвращаемся на предыдущую страницу
                  }}
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


// import { useEffect } from 'react';

// import { useDispatch, useSelector } from '../../services/store';
// import { getIngredients } from '../../services/slices/IngredientsSlice';
// import { getFeeds } from '../../services/slices/FeedSlice';
// import { getUser } from '../../services/slices/UserSlice';
// import { ProtectedRoute } from '../../components/protectedRoute/ProtectedRoute';
// import {
//   Navigate,
//   Routes,
//   Route,
//   useNavigate,
//   useLocation,
//   useMatch
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
//   const backgroundLocation = location.state?.background;
//   const isAuthorized = useSelector((state) => state.user.isAuthorized);

//   const feedNumber = useMatch('/feed/:number')?.params.number;
//   const profileNumber = useMatch('/profile/orders/:number')?.params.number;

//   const orderId = feedNumber || profileNumber;

//   useEffect(() => {
//     dispatch(getIngredients());
//     dispatch(getFeeds());
//     dispatch(getUser());
//   }, [dispatch]);

//   return (
//     <div className={styles.app}>
//       <AppHeader />

//       <Routes location={backgroundLocation || location}>
//         <Route path='/' element={<ConstructorPage />} />

//         <Route path='/feed' element={<Feed />} />

//         <Route
//           path='/feed/:number'
//           element={
//             <div className={styles.detailPageWrap}>
//               <p className={`text text_type_main-large ${styles.detailHeader}`}>
//                 #{String(orderId).padStart(6, '0')}
//               </p>
//               <OrderInfo />
//             </div>
//           }
//         />

//         <Route
//           path='/ingredients/:id'
//           element={
//             <div className={styles.detailPageWrap}>
//               <p className={`text text_type_main-large ${styles.detailHeader}`}>
//                 Детали ингредиента
//               </p>

//               <IngredientDetails />
//             </div>
//           }
//         />

//         {/* Защищённые маршруты */}

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
//               <div className={styles.detailPageWrap}>
//                 <p
//                   className={`text text_type_main-large ${styles.detailHeader}`}
//                 >
//                   #{String(orderId).padStart(6, '0')}
//                 </p>
//                 <OrderInfo />
//               </div>
//             </ProtectedRoute>
//           }
//         />

//         {/* Неавторизованные маршруты */}
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

//         <Route path='*' element={<NotFound404 />} />
//       </Routes>

//       {backgroundLocation && (
//         <Routes>
//           <Route
//             path='/feed/:number'
//             element={
//               <Modal
//                 title={`#${String(orderId).padStart(6, '0')}`}
//                 onClose={() => {
//                   navigate(backgroundLocation);
//                 }}
//               >
//                 <OrderInfo />
//               </Modal>
//             }
//           />

//           <Route
//             path='ingredients/:id'
//             element={
//               <Modal
//                 title='Детали ингредиента'
//                 onClose={() => {
//                   navigate(backgroundLocation);
//                 }}
//               >
//                 <IngredientDetails />
//               </Modal>
//             }
//           />
//           <Route
//             path='/profile/orders/:number'
//             element={
//               <ProtectedRoute>
//                 <Modal
//                   title={`#${String(orderId).padStart(6, '0')}`}
//                   onClose={() => navigate(backgroundLocation)}
//                 >
//                   <OrderInfo />
//                 </Modal>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default App;
