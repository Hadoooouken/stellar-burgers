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
        <BurgerIcon type='primary' />
        <NavLink
          exact
          to='/'
          className={styles.link}
          activeClassName={styles.link_active}
        >
          Конструктор
        </NavLink>
        <ListIcon type='primary' />
        <NavLink
          to='/feed'
          className={styles.link}
          activeClassName={styles.link_active}
        >
          Лента заказов
        </NavLink>
      </div>
      <NavLink to='/' className={styles.logo}>
        <Logo className='' />
      </NavLink>
      <div className={styles.link_position_last}>
        <ProfileIcon type='primary' />
        <NavLink
          to='/profile'
          className={styles.link}
          activeClassName={styles.link_active}
        >
          {userName || 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);
