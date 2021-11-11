import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CreateUser } from "../components/CreateUser";
import { EditDialog } from "../components/EditDialog";
import { LIST_MIN_WIDTH } from "../helpful/constants";
import { User } from "../util/user/types";
import { deleteUser, getAllUsers } from "../util/user/user";

export const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    birthYear: 0,
    favColor: "",
    admin: false,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = (id: string, index: number) => {
    deleteUser(id);
    users.splice(index, 1);
    setUsers([...users]);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  useEffect(() => {
    let getAll = async () => {
      let response = await getAllUsers();
      setUsers(response);
    };
    getAll();
  }, []);

  return (
    <Grid
      container
      direction="column"
      rowSpacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography variant="h3">Users</Typography>
        <EditDialog
          user={selectedUser}
          open={openDialog}
          setUsers={setUsers}
          onClose={() => setOpenDialog(false)}
        />
      </Grid>
      <Grid item xs={12}>
        <List>
          <CreateUser />
          {users.map((user, index) => (
            <ListItem
              sx={{ minWidth: LIST_MIN_WIDTH }}
              key={user._id}
              secondaryAction={
                <Tooltip
                  title="Delete User"
                  placement="right"
                  enterDelay={1000}
                >
                  <IconButton
                    edge="end"
                    onClick={() => handleDelete(user._id, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemButton onClick={() => handleUserClick(user)}>
                <ListItemText>{user.username}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
