import React, { useState } from "react";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";
import { useEffectAsync } from "../../util/UseEffectAsync";
import { DataGrid, GridColumns } from "@material-ui/data-grid";

const columns: GridColumns = [
  {
    field: "username",
    headerName: "Username",
    width: 150
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 150
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150
  },
  {
    field: "email",
    headerName: "Email",
    width: 150
  },
  {
    field: "admin",
    headerName: "Admin",
    width: 150
  }
];

export const UsersList: React.FC = () => {
  const ctx = React.useContext(Ctx);
  const [users, setUsers] = useState<User[]>([]);

  useEffectAsync(async () => {
    await ctx?.userService.GetUsers().then(res => setUsers(res));
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        getRowId={row => row._id}
      />
    </div>
  );
};
