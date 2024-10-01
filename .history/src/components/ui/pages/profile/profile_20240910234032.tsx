import { FC, useState } from 'react';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';
import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

const EditIcon = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
  <svg
    onClick={onClick}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.editIcon}
  >
    <path
      d="M16.22 5.78L18.22 7.78L16.22 5.78ZM16.22 5.78L18.22 7.78L16.22 5.78ZM16.22 5.78L18.22 7.78L16.22 5.78Z"
      fill="currentColor"
    />
  </svg>
);

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

  const handleIconClick = (e: React.MouseEvent, field: keyof typeof isEditing) => {
    e.stopPropagation(); // Prevent event bubbling
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
            icon={<EditIcon onClick={(e) => handleIconClick(e, 'name')} />}
            disabled={!isEditing.name}
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
            icon={<EditIcon onClick={(e) => handleIconClick(e, 'email')} />}
            disabled={!isEditing.email}
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
            icon={<EditIcon onClick={(e) => handleIconClick(e, 'password')} />}
            disabled={!isEditing.password}
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
