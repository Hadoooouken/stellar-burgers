import React, { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/UserSlice';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
    }

  };

  if (isAuthorized) {
    return <Navigate to='/' replace />;
  }

  return (
    <LoginUI
      errorText={error + ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
