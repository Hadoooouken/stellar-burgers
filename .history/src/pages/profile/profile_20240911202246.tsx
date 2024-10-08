import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/UserSlice'; // Импорт экшена обновления
import { ProfileUI } from '@ui-pages';
import { TRegisterData } from '@api';

import { FC, useState } from 'react';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';
import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => {
  // Инициализация состояния для отслеживания активности полей редактирования
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false
  });

  const handleIconClick = (
    e: React.MouseEvent,
    field: keyof typeof isEditing
  ) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <main className={`${commonStyles.container}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        className={`mt-30 ${styles.form} ${commonStyles.form}`}
        onSubmit={handleSubmit}
      >
        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleInputChange}
            value={formValue.name}
            name={'name'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={!isEditing.name}
            onIconClick={(e) => handleIconClick(e, 'name')}
          />
        </div>
        <div className='pb-6'>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleInputChange}
            value={formValue.email}
            name={'email'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={!isEditing.email}
            onIconClick={(e) => handleIconClick(e, 'email')}
          />
        </div>
        <div className='pb-6'>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleInputChange}
            value={formValue.password}
            name={'password'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={!isEditing.password}
            onIconClick={(e) => handleIconClick(e, 'password')}
          />
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type='secondary'
              htmlType='button'
              size='medium'
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button type='primary' size='medium' htmlType='submit'>
              Сохранить
            </Button>
          </div>
        )}
        {updateUserError && (
          <p
            className={`${commonStyles.error} pt-5 text text_type_main-default`}
          >
            {updateUserError}
          </p>
        )}
      </form>
    </main>
  );
};

