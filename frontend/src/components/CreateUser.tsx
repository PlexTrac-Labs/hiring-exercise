import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";
import { LIST_MIN_WIDTH } from "../helpful/constants";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const CreateUser = () => {
  const style = {
    minWidth: LIST_MIN_WIDTH,
  };

  return (
    <ListItem sx={style}>
      <ListItemButton>
        <ListItemIcon>
          <AddCircleIcon color="success" />
        </ListItemIcon>
        Create User
      </ListItemButton>
    </ListItem>
  );
};
