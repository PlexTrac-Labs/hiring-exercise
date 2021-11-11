import {
  Alert,
  Button,
  DialogActions,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { User } from "../util/user/types";

export type UserFormProps = {
  user?: User;
  showPassword?: boolean;
  submitText: string;
  error: boolean;
  errorMessage: string;
  handleSubmit: (event: any) => void;
  handleClose: () => void;
};

const defaultProps: Partial<UserFormProps> = {
  user: {
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    birthYear: 0,
    favColor: "",
    admin: false,
  },
  showPassword: false,
};

export const UserForm = (props: UserFormProps) => {
  const {
    user,
    showPassword,
    submitText,
    error,
    errorMessage,
    handleSubmit,
    handleClose,
  } = {
    ...defaultProps,
    ...props,
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        rowSpacing={2}
        marginTop={3}
      >
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl>
            <TextField
              required
              id="username"
              variant="outlined"
              label="Username"
              defaultValue={user?.username}
            />
          </FormControl>
        </Grid>
        {showPassword && (
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                required
                type="password"
                id="password"
                variant="outlined"
                label="Password"
                defaultValue={user?.username}
              />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl>
            <TextField
              required
              id="firstName"
              variant="outlined"
              label="First Name"
              defaultValue={user?.firstName}
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
              defaultValue={user?.lastName}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <TextField
              required
              id="email"
              variant="outlined"
              label="Email"
              defaultValue={user?.email}
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
              defaultValue={user?.birthYear === 0 ? 2000 : user?.birthYear}
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
              defaultValue={user?.favColor}
            />
          </FormControl>
        </Grid>
      </Grid>
      <DialogActions>
        <Button color="success" variant="contained" type="submit">
          {submitText}
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </form>
  );
};
