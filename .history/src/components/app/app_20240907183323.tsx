import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Routes, Route } from 'react-router-dom';
import styles from './constructor-page.module.css';
import { getIngredients } from '../../services/RootReducer';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => { 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  
  return (
  <div className={styles.app}>
    <AppHeader />

    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/feed/:number'
        element={
          <Modal title='rerer' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/feed/:number'
        element={
          <Modal title='rerer' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='rerer' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
)};

export default App;
