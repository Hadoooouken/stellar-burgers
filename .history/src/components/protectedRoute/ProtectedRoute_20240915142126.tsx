//оригинал
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
import { useSelector, RootState } from '../../services/store';
import { Preloader } from '@ui';
import { ReactElement } from 'react';

type ProtectedRouteProps = {
  children?: ReactElement | ReactElement[];
  onlyUnAuth?: boolean;
};

const ProtectedRoute = ({ children, onlyUnAuth }: ProtectedRouteProps) => {
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized
  );
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const location = useLocation();

  // Пока статус авторизации загружается, показываем предзагрузчик
  if (loading) {
    return <Preloader />;
  }

  // Если маршрут предназначен для авторизованных пользователей и пользователь не авторизован, редирект на логин
  if (!onlyUnAuth && !isAuthorized) {
    return <Navigate replace to='/login' />;
  }

  // Если маршрут предназначен для неавторизованных пользователей и пользователь уже авторизован, редирект на предыдущую или главную страницу
  if (onlyUnAuth && isAuthorized && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  // Если все условия выполнены, рендерим дочерние компоненты
  return <>{children}</>;
};

export default ProtectedRoute;
