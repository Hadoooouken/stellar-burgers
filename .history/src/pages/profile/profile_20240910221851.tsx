import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/UserSlice'; // Импорт экшена обновления
import { ProfileUI } from '@ui-pages';
import { TRegisterData } from '@api'; // Типы данных пользователя

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [formValue, setFormValue] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState<string | undefined>(
    undefined
  );

  const [isEditing, setIsEditing] = useState<boolean>(false); // Новый стейт для управления режимом редактирования

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      )
        .unwrap()
        .then(() => {
          setFormValue({ ...formValue, password: '' });
          setUpdateUserError(undefined);
        })
        .catch((err) => setUpdateUserError(err.message));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setIsEditing(false); // Возвращаемся в режим просмотра
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Переключаем режим редактирования
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      isEditMode={isEditing} // Передаем состояние редактирования
      handleEditClick={handleEditClick} // Передаем обработчик клика
    />
  );
};
