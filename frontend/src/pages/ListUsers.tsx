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
import { EditDialog } from "../components/EditDialog";
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
          {users.map((user, index) => (
            <ListItem
              onClick={() => handleUserClick(user)}
              sx={{ minWidth: 400 }}
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
              <ListItemButton>
                <ListItemText>{user.username}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
