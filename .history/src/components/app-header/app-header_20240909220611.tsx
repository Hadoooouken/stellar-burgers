import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'src/services/store';

export const AppHeader: FC = () => {
  const name = useSelector((state) => state.user.user?.name);
  return <AppHeaderUI userName={' />;
};
