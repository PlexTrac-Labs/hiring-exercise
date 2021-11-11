import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN, TOP_BAR_HEIGHT } from "../helpful/constants";
import { colors } from "../helpful/style";

export const TopBar = () => {
  const loggedIn = !!localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  const Bar = styled(AppBar)(() => ({
    height: TOP_BAR_HEIGHT,
    backgroundColor: colors.darkGreen,
  }));

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate("/");
  };

  return (
    <Bar>
      <Toolbar>
        {loggedIn && (
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button color="inherit" onClick={() => navigate("/list")}>
                Users
              </Button>
              <Button color="inherit" onClick={() => navigate("/reset")}>
                Reset Password
              </Button>
            </Grid>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        )}
      </Toolbar>
    </Bar>
  );
};
