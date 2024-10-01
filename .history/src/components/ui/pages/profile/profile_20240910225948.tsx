import React, { FC, useState } from 'react';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';
import { TICons } from './icons';

// Пример определения типа TICons
type TICons = {
  EditIcon: React.ReactNode;
  SaveIcon: React.ReactNode;
  CancelIcon: React.ReactNode;
};

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
  handleEditClick
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    handleEditClick(); // Уведомляем родительский компонент о начале редактирования
  };

  // Присвойте iconType корректный ключ из TICons
  const iconType: keyof TICons | undefined = isEditing ? 'EditIcon' : undefined;

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
          
