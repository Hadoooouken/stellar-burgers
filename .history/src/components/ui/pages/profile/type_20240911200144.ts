import { ChangeEvent, SyntheticEvent } from 'react';

// ProfileUI.tsx
import { ChangeEvent, MouseEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: MouseEvent<HTMLButtonElement>) => void;  // Изменен тип здесь
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
};
