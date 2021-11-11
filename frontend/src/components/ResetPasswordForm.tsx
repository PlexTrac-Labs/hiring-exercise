import { Alert, Button, FormControl, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { CURRENT_USER_ID } from "../helpful/constants";
import { ResetPasswordRequest } from "../util/user/types";
import { resetPassword } from "../util/user/user";

export const ResetPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [matchError, setMatchError] = useState(false);

  const validate = (e: any) => {
    const confirm = e.target.value;
    setMatchError(confirm !== password);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (matchError) {
      return;
    }

    const oldPassword = event.target.old.value;
    const newPassword = event.target.new.value;
    const confirm = event.target.confirm.value;

    if (newPassword !== confirm) {
      setMatchError(true);
      return;
    } else {
      setMatchError(false);
    }

    const userId = localStorage.getItem(CURRENT_USER_ID) ?? "";
    const payload: ResetPasswordRequest = {
      oldPassword,
      newPassword,
    };
    try {
      await resetPassword(userId, payload);
      setSuccess(true);
      setError(false);
    } catch (error: any) {
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
        spacing={2}
      >
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">Problem updating password</Alert>
          </Grid>
        )}
        {success && (
          <Grid item xs={12}>
            <Alert severity="success">Password updated</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl>
            <TextField
              required
              type="password"
              id="old"
              variant="outlined"
              label="Current Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              required
              onChange={(e: any) => setPassword(e.target.value)}
              type="password"
              id="new"
              variant="outlined"
              label="New Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <TextField
              required
              error={matchError}
              helperText={matchError ? "Fields must match" : ""}
              onChange={validate}
              type="password"
              id="confirm"
              variant="outlined"
              label="Confirm New Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={matchError}
            color="primary"
            variant="contained"
            type="submit"
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
