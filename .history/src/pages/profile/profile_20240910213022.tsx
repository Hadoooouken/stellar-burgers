import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/UserSlice'; // Импорт экшена обновления
import { ProfileUI } from './ProfileUI'; // Импорт UI компонента
import { TRegisterData } from '@api'; // Типы данных пользователя

export const Profile: FC = () => {
  const dispatch = useDispatch();

  // Получаем данные пользователя из стора
  const user = useSelector((state) => state.user.user);

  // Локальное состояние формы
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState<string | null>(null);

  // Обновляем данные формы при изменении пользователя
  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  // Проверка, изменились ли данные формы
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(updateUser({ name: formValue.name, email: formValue.email, password: formValue.password }))
        .unwrap()
        .then(() => {
          setFormValue({ ...formValue, password: '' }); // Очищаем поле пароля после обновления
          setUpdateUserError(null); // Сбрасываем ошибку, если она была
        })
        .catch((err) => setUpdateUserError(err)); // Обрабатываем ошибки
    }
  };

  // Обработчик отмены изменений
  const handleCancel = () => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  // Обработчик изменения полей формы
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
      updateUserError={updateUserError}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
