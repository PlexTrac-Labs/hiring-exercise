import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../util/user/types";
import { getAllUsers } from "../util/user/user";

export const List = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let isMounted = true;
    let getAll = async () => {
      let response = await getAllUsers();
      setUsers(response);
    };
    if (isMounted) {
      getAll();
    }
    return () => {
      isMounted = false;
    };
  });

  return <Typography>{users.map((user) => user?.firstName)}</Typography>;
};
