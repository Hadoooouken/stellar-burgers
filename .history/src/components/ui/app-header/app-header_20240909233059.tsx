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
  to='/'
  className='link text text_type_main-default ml-2 mr-10'
  activeClassName='link_active'
>
  Конструктор
</NavLink>
<NavLink 
  to='/feed'
  className='link text text_type_main-default ml-2'
  activeClassName='link_active'
>
  Лента заказов
</NavLink>
<NavLink 
  to='/profile'
  className='link text text_type_main-default ml-2'
  activeClassName='link_active'
>
  {userName || 'Личный кабинет'}
</NavLink>

      </div>
    </nav>
  </header>
);
