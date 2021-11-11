import { Grid, Typography } from "@mui/material";
import React from "react";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

export const ResetPassword = () => {
  return (
    <Grid
      container
      direction="column"
      rowSpacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography variant="h3">Reset Password</Typography>
      </Grid>
      <Grid item>
        <ResetPasswordForm />
      </Grid>
    </Grid>
  );
};
