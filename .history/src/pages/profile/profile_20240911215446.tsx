import { FC, useEffect, useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileUI } from '@ui-pages';
import { RootState } from '../';
import { updateUser } from 'src/services/slices/UserSlice'; // Импортируем action для обновления пользователя

export const Profile: FC = () => {
  const dispatch = useDispatch();
  
  // Получаем пользователя из Redux-состояния
  const user = useSelector((state: RootState) => state.user.user);
  const updateUserError = useSelector((state: RootState) => state.user.error);
  
  // Локальное состояние для формы
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  useEffect(() => {
    // Обновляем форму, если изменились данные пользователя
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

  // Отправка данных на сервер при нажатии "Сохранить"
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedData = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password || undefined, // Если пароль не изменился, не отправляем его
    };
    dispatch(updateUser(updatedData))
      .unwrap() // После успешного запроса скрываем кнопки
      .then(() => {
        setFormValue((prev) => ({
          ...prev,
          password: '' // Очищаем поле пароля после успешного сохранения
        }));
      });
  };

  // Сброс изменений при нажатии "Отмена"
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  // Обновление полей формы при изменении ввода
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
