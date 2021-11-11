import { Alert, Button, FormControl, Grid, TextField } from "@mui/material";
import React from "react";

export type ResetFormProps = {
  error: boolean;
  errorMessage: string;
  handleSubmit: (event: any) => void;
};

const defaultProps: Partial<ResetFormProps> = {};

export const ResetPasswordForm = (props: ResetFormProps) => {
  const { error, errorMessage, handleSubmit } = {
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
              type="password"
              id="old"
              variant="outlined"
              label="Current Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <TextField
              required
              type="password"
              id="new"
              variant="outlined"
              label="New Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <TextField
              required
              type="password"
              id="confirm"
              variant="outlined"
              label="Confirm New Password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" type="submit">
            Change Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
