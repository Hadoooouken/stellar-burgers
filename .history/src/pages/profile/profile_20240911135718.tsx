// profile.tsx
import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser, setIsEditing } from '../../services/UserSlice'; // Импортируем setIsEditing
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isEditing = useSelector((state) => state.user.isEditing);

  const [formValue, setFormValue] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState<string | undefined>(undefined);

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
      dispatch(updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      }))
      .unwrap()
      .then(() => {
        setFormValue({ ...formValue, password: '' });
        setUpdateUserError(undefined);
        dispatch(setIsEditing({ field: 'name', value: false }));
        dispatch(setIsEditing({ field: 'email', value: false }));
        dispatch(setIsEditing({ field: 'password', value: false }));
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
    dispatch(setIsEditing({ field: 'name', value: false }));
    dispatch(setIsEditing({ field: 'email', value: false }));
    dispatch(setIsEditing({ field: 'password', value: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditToggle = (field: keyof typeof isEditing) => {
    dispatch(setIsEditing({ field, value: !isEditing[field] }));
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
      handleEditToggle={handleEditToggle}
    />
  );
};
