export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: s) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
  isEditMode: boolean;
  handleEditClick: () => void;
};
