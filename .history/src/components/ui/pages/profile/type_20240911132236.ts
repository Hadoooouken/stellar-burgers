import { ChangeEvent, SyntheticEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
  isEditing: {
    name: boolean;
    email: boolean;
    password: boolean;
  };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      name: boolean;
      email: boolean;
      password: boolean;
    }>
  >;
};
