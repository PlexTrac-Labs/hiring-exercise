import { AppBar, Button, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
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
    localStorage.removeItem(AUTH_TOKEN); //need to cleanup warning
    navigate("/");
  };

  return (
    <Bar>
      <Toolbar>
        {loggedIn && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}{" "}
      </Toolbar>
    </Bar>
  );
};
