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
  const [isSaving, setIsSaving] = useState(false);

  const handleIconClick = (
    e: React.MouseEvent,
    field: keyof typeof isEditing
  ) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await handleSubmit(); // Предполагается, что handleSubmit возвращает промис
    setIsEditing({
      name: false,
      email: false,
      password: false
    });
    setIsSaving(false);
  };

  return (
    <main className={`${commonStyles.container}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        className={`mt-30 ${styles.form} ${commonStyles.form}`}
        onSubmit={onFormSubmit}
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
            disabled={!isEditing.name || isSaving}
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
            disabled={!isEditing.email || isSaving}
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
            disabled={!isEditing.password || isSaving}
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
              disabled={isSaving}
            >
              Отменить
            </Button>
            <Button type='primary' size='medium' htmlType='submit' disabled={isSaving}>
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
