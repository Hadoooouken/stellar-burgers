import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); // Поменяйте на реальный путь к статусу авторизации
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
