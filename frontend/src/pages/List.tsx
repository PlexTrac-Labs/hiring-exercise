import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../util/user/types";
import { getAllUsers } from "../util/user/user";

export const List = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let getAll = async () => {
      let response = await getAllUsers();
      setUsers(response);
    };
    getAll();
  });

  return <Typography>{users.map((user) => user?.firstName)}</Typography>;
};
