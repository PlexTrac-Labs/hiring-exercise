import React, { useState } from "react";
import { UpdateUserRequest, User } from "../util/user/types";
import { getAllUsers, updateUser } from "../util/user/user";
import { InteractDialog } from "./InteractDialog";
import { UserForm } from "./UserForm";

export type EditDialogProps = {
  open: boolean;
  user: User;
  setUsers: (users: User[]) => void;
  onClose: () => void;
};

export const EditDialog = (props: EditDialogProps) => {
  const { open, user, setUsers, onClose } = { ...props };
  const [error, setError] = useState(false);
  const errorMessage = "Problem updating user. Is this email already in use?";

  const handleClose = () => {
    setError(false);
    onClose();
  };

  const handleUpdate = async (event: any) => {
    event.preventDefault();
    const payload: UpdateUserRequest = {
      username: event.target.username.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      birthYear: parseInt(event.target.birthYear.value),
      favColor: event.target.favColor.value,
    };
    try {
      await updateUser(user._id, payload);
      let users = await getAllUsers();
      setUsers([...users]);
      handleClose();
    } catch (error: any) {
      setError(true);
    }
  };

  return (
    <InteractDialog open={open} handleClose={handleClose} title="Edit User">
      <UserForm
        user={user}
        submitText="Save"
        error={error}
        errorMessage={errorMessage}
        handleSubmit={handleUpdate}
        handleClose={handleClose}
      />
    </InteractDialog>
  );
};
