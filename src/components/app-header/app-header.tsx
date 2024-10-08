import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const name = useSelector((state) => state.user.user?.name);
  return <AppHeaderUI userName={name} />;
};
