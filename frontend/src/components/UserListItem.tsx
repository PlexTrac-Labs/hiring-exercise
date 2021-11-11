import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import { LIST_MIN_WIDTH } from "../helpful/constants";
import { User } from "../util/user/types";

export type UserListItemProps = {
  user: User;
  handleDelete: () => void;
  handleClick: (user: User) => void;
};

export const UserListItem = (props: UserListItemProps) => {
  const { user, handleDelete, handleClick } = { ...props };

  return (
    <ListItem
      sx={{ minWidth: LIST_MIN_WIDTH }}
      secondaryAction={
        <Tooltip title="Delete User" placement="right" enterDelay={1000}>
          <IconButton edge="end" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      }
    >
      <ListItemButton onClick={() => handleClick(user)}>
        <ListItemText>{user.username}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
