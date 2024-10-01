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
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false
  });

  // Функция для обработки клика на иконку
  const handleIconClick = (
    e: React.MouseEvent<HTMLDivElement>,
    field: keyof typeof isEditing
  ) => {
    e.preventDefault(); // Остановка выполнения других событий
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] })); // Тоггл состояния поля
  };

  // Сброс состояния редактирования при сохранении или отмене
  const resetEditing = () => {
    setIsEditing({
      name: false,
      email: false,
      password: false
    });
  };

  // Обработчик сохранения с вызовом handleSubmit и сбросом редактирования
  const handleSave = (e: React.FormEvent) => {
    handleSubmit(e);  // Вызов функции сохранения
    resetEditing();    // Сброс редактирования
  };

  // Обработчик отмены с вызовом handleCancel и сбросом редактирования
  const handleCancelClick = () => {
    handleCancel();   // Вызов функции отмены
    resetEditing();   // Сброс редактирования
  };

  return (
    <main className={`${commonStyles.container}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        className={`mt-30 ${styles.form} ${commonStyles.form}`}
        onSubmit={handleSave}  // Привязываем сохранение к форме
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
            disabled={!isEditing.name}  // Поле отключено, пока не нажата иконка
            onIconClick={(e) => handleIconClick(e, 'name')}  // Обработчик клика для иконки
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
              onClick={handleCancelClick}  // Обработчик для кнопки "Отменить"
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
