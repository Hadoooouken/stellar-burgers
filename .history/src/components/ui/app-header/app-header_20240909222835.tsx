import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}
        >
          <BurgerIcon type={'primary'} />
          Конструктор
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}
        >
          <ListIcon type={'primary'} />
          Лента заказов
        </NavLink>
      </div>
      <NavLink to='/' className={styles.logo}>
        {/* <Logo /> */}
      </NavLink>
      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}
        >
          <ProfileIcon type={'primary'} />
          {userName || 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);
