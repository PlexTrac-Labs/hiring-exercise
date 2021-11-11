import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../helpful/style";
import { UpdateUserRequest, User } from "../util/user/types";
import { getAllUsers, updateUser } from "../util/user/user";

export type EditDialogProps = {
  open: boolean;
  user: User;
  setUsers: (users: User[]) => void;
  onClose: () => void;
};

export const EditDialog = (props: EditDialogProps) => {
  const { open, user, setUsers, onClose } = { ...props };
  //const loggedIn = !!localStorage.getItem(AUTH_TOKEN);
  const [error, setError] = useState(false);

  const TitleStyle = {
    backgroundColor: colors.darkGreen,
    color: "white",
  };

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
      console.log(payload);
      await updateUser(user._id, payload);
      let users = await getAllUsers();
      setUsers([...users]);
      handleClose();
    } catch (error: any) {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleUpdate}>
        <DialogTitle sx={TitleStyle}>Edit User</DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            rowSpacing={2}
            marginTop={3}
          >
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">
                  Problem updating user. Is this email already in use?
                </Alert>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  required
                  id="username"
                  variant="outlined"
                  label="Username"
                  defaultValue={user.username}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  required
                  id="firstName"
                  variant="outlined"
                  label="First Name"
                  defaultValue={user.firstName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  required
                  id="lastName"
                  variant="outlined"
                  label="Last Name"
                  defaultValue={user.lastName}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  required
                  id="email"
                  variant="outlined"
                  label="Email" //need to make sure this is not in use
                  defaultValue={user.email}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  required
                  type="number"
                  id="birthYear"
                  variant="outlined"
                  label="Birth Year"
                  defaultValue={user.birthYear}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <TextField
                  required
                  id="favColor"
                  variant="outlined"
                  label="Favorite Color"
                  defaultValue={user.favColor}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="success" variant="contained" type="submit">
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
