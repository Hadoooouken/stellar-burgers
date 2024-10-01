import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/UserSlice'; // Импорт экшена обновления
import { ProfileUI } from '@ui-pages';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false
  });

  const [updateUserError, setUpdateUserError] = useState<string | undefined>(
    undefined
  );

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
          setIsEditing({ name: false, email: false, password: false }); // Закрытие всех полей после сохранения
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
    setIsEditing({ name: false, email: false, password: false }); // Закрытие всех полей после отмены
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
      updateUserError={updateUserError}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  );
};
