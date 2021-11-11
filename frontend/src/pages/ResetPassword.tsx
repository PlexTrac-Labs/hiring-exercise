import { Grid, Typography } from "@mui/material";
import React from "react";

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
    </Grid>
  );
};
