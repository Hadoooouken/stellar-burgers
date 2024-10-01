import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'src/services/store';

export const AppHeader: FC = () => {

    useSelector((state) => state.user.user)
return <AppHeaderUI userName='' />

}
