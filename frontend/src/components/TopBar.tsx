import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AUTH_TOKEN,
  CURRENT_USER_ID,
  TOP_BAR_HEIGHT,
} from "../helpful/constants";
import { colors } from "../helpful/style";
import { PrivatePages } from "../pages";

export const TopBar = () => {
  const loggedIn = !!localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  const Bar = styled(AppBar)(() => ({
    height: TOP_BAR_HEIGHT,
    backgroundColor: colors.darkGreen,
  }));

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(CURRENT_USER_ID);
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
              {PrivatePages.map((page) => (
                <Button
                  key={page.route}
                  color="inherit"
                  onClick={() => navigate(page.route)}
                >
                  {page.title}
                </Button>
              ))}
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
