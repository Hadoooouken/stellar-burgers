import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileUI } from '@ui-pages';
import { RootState, useAppDispatch } from '@store'; // Используйте типизированный dispatch
import { updateUser } from '../'; // Импортируем action для обновления пользователя

export const Profile: FC = () => {
  const dispatch = useAppDispatch(); // Типизированный dispatch
  const user = useSelector((state: RootState) => state.user.user);
  const updateUserError = useSelector((state: RootState) => state.user.error);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    const updatedData = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password || undefined,
    };
    
    try {
      await dispatch(updateUser(updatedData)).unwrap(); // await для async thunk и unwrap для обработки ошибок
      setFormValue((prev) => ({
        ...prev,
        password: '' // Очищаем поле пароля
      }));
    } catch (error: any) {
      console.error('Ошибка обновления пользователя:', error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError}
    />
  );
};
