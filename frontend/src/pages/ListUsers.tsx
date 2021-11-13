import { Grid, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CreateUser } from "../components/CreateUser";
import { EditDialog } from "../components/EditDialog";
import { UserListItem } from "../components/UserListItem";
import { User } from "../util/user/types";
import { deleteUser, getAllUsers } from "../util/user/user";

export const ListUsers = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
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

  const handleDelete = (id: string, index: number) => {
    deleteUser(id);
    users.splice(index, 1);
    setUsers([...users]);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
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
      data-testid="listUsers"
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
          open={openEditDialog}
          setUsers={setUsers}
          onClose={() => setOpenEditDialog(false)}
        />
      </Grid>
      <Grid item xs={12}>
        <List>
          <CreateUser setUsers={setUsers} />
          {users.map((user, index) => (
            <UserListItem
              key={user._id}
              user={user}
              handleClick={handleUserClick}
              handleDelete={() => handleDelete(user._id, index)}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
