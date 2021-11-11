import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import React, { useState } from "react";
import { LIST_MIN_WIDTH } from "../helpful/constants";
import { User } from "../util/user/types";
import { CreateDialog } from "./CreateDialog";

export type CreateUserProps = {
  setUsers: (users: User[]) => void;
};

export const CreateUser = (props: CreateUserProps) => {
  const style = {
    minWidth: LIST_MIN_WIDTH,
  };

  const { setUsers } = { ...props };
  const [open, setOpen] = useState(false);

  return (
    <ListItem sx={style}>
      <CreateDialog
        open={open}
        onClose={() => setOpen(false)}
        setUsers={setUsers}
      />
      <ListItemButton onClick={() => setOpen(true)}>
        <ListItemIcon>
          <AddCircleIcon color="success" />
        </ListItemIcon>
        Create User
      </ListItemButton>
    </ListItem>
  );
};
