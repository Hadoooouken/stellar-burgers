import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import { ProfileUI } from '@ui-pages';
// import { updateUser } from '../../services/slices/UserSlice'; // 
import { AppDispatch } from '@store';

export const Profile: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [updateUserError, setUpdateUserError] = useState('');

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  useEffect(() => {
    setIsFormChanged(
      formValue.name !== user?.name ||
      formValue.email !== user?.email ||
      !!formValue.password
    );
  }, [formValue, user]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(formValue)).unwrap();
      setIsEditing({ name: false, email: false, password: false });
      setUpdateUserError('');
    } catch (error: any) {
      setUpdateUserError(error.message || 'Ошибка обновления данных');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setIsEditing({ name: false, email: false, password: false });
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
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      updateUserError={updateUserError}
    />
  );
};


// import { FC, useState, useEffect, SyntheticEvent } from 'react';
// import { useDispatch, useSelector } from '../../services/store';
// import { updateUser } from '../../services/slices/UserSlice'; // Импорт экшена обновления
// import { ProfileUI } from '@ui-pages';
// import { TRegisterData } from '@api';

// export const Profile: FC = () => {
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.user.user);

//   const [formValue, setFormValue] = useState<{
//     name: string;
//     email: string;
//     password: string;
//   }>({
//     name: user?.name || '',
//     email: user?.email || '',
//     password: ''
//   });

//   const [updateUserError, setUpdateUserError] = useState<string | undefined>(
//     undefined
//   );

//   useEffect(() => {
//     setFormValue({
//       name: user?.name || '',
//       email: user?.email || '',
//       password: ''
//     });
//   }, [user]);

//   const isFormChanged =
//     formValue.name !== user?.name ||
//     formValue.email !== user?.email ||
//     !!formValue.password;

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();
//     if (isFormChanged) {
//       dispatch(
//         updateUser({
//           name: formValue.name,
//           email: formValue.email,
//           password: formValue.password
//         })
//       )
//         .unwrap()
//         .then(() => {
//           setFormValue({ ...formValue, password: '' });
//           setUpdateUserError(undefined);
//         })
//         .catch((err) => setUpdateUserError(err.message));
//     }
//   };

//   const handleCancel = (e: SyntheticEvent) => {
//     e.preventDefault();
//     setFormValue({
//       name: user?.name || '',
//       email: user?.email || '',
//       password: ''
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <ProfileUI
//       formValue={formValue}
//       isFormChanged={isFormChanged}
//       updateUserError={updateUserError}
//       handleSubmit={handleSubmit}
//       handleCancel={handleCancel}
//       handleInputChange={handleInputChange}
//     />
//   );
// };
