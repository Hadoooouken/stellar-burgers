import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <BurgerIcon type='primary' />
          <span
            onClick={() => navigate('/')}
            className='text text_type_main-default ml-2 mr-10'
            style={{ cursor: 'pointer' }}
          >
            Конструктор
          </span>
          <ListIcon type='primary' />
          <span
            onClick={() => navigate('/feed')}
            className='text text_type_main-default ml-2'
            style={{ cursor: 'pointer' }}
          >
            Лента заказов
          </span>
        </div>
        <div
          onClick={() => navigate('/')}
          className={styles.logo}
          style={{ cursor: 'pointer' }}
        >
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type='primary' />
          <span
            onClick={() => navigate('/profile')}
            className='text text_type_main-default ml-2'
            style={{ cursor: 'pointer' }}
          >
            {userName || 'Личный кабинет'}
          </span>
        </div>
      </nav>
    </header>
  );
};
