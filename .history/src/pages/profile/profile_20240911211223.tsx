import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store'; // Ваш корневой тип состояния Redux
import { updateUser, getUser } from '../../services/slices/'

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [initialFormValue, setInitialFormValue] = useState({
    name: '',
    email: ''
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const updateUserError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (user) {
      setInitialFormValue({ name: user.name, email: user.email });
      setFormValue({ ...formValue, name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      ).unwrap();
      setInitialFormValue({ name: formValue.name, email: formValue.email });
      setIsFormChanged(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({ ...initialFormValue, password: '' });
    setIsFormChanged(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setIsFormChanged(
      value !== initialFormValue[name] || formValue.password !== ''
    );
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
