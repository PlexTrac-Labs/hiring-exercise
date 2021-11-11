import React, { useState } from "react";
import { CreateUserRequest, User } from "../util/user/types";
import { createUser, getAllUsers } from "../util/user/user";
import { InteractDialog } from "./InteractDialog";
import { UserForm } from "./UserForm";

export type CreateDialogProps = {
  open: boolean;
  setUsers: (users: User[]) => void;
  onClose: () => void;
};

export const CreateDialog = (props: CreateDialogProps) => {
  const { open, setUsers, onClose } = { ...props };
  const [error, setError] = useState(false);
  const errorMessage = "Problem creating user. Is this email already in use?";

  const handleClose = () => {
    setError(false);
    onClose();
  };

  const handleCreate = async (event: any) => {
    event.preventDefault();
    const payload: CreateUserRequest = {
      username: event.target.username.value,
      password: event.target.password.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      birthYear: parseInt(event.target.birthYear.value),
      favColor: event.target.favColor.value,
    };
    try {
      await createUser(payload);
      let users = await getAllUsers();
      setUsers([...users]);
      handleClose();
    } catch (error: any) {
      setError(true);
    }
  };

  return (
    <InteractDialog open={open} handleClose={handleClose} title="Create User">
      <UserForm
        showPassword
        submitText="Create"
        error={error}
        errorMessage={errorMessage}
        handleSubmit={handleCreate}
        handleClose={handleClose}
      />
    </InteractDialog>
  );
};
