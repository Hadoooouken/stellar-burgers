// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from '../../services/store';
// import { RootState } from '../../services/store';

// const ProtectedRoute: React.FC = () => {
//   const isAuthorized = useSelector(
//     (state: RootState) => state.user.isAuthorized
//   );

//   if (!isAuthorized) {
//     return <Navigate to='/login' replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { selectIsAuth, selectUser } from '..//../slices/userSlice';

type PrivateRouteProps = {
  children?: React.ReactElement | React.ReactElement[];
  onlyUnAuth?: boolean;
};

export const PrivateRoute = ({ children, onlyUnAuth }: PrivateRouteProps) => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);
  const location = useLocation();
  if (!isAuth) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};