import React, { useState } from "react";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";
import { useEffectAsync } from "../../util/UseEffectAsync";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import "./UserList.scss";
import { Button, colors } from "@material-ui/core";
import { idText } from "typescript";

const columns: GridColumns = [
  {
    field: "username",
    headerName: "Username",
    flex: 1,
    headerClassName: "userlist-table-header",
    cellClassName: "userlist-table-column",
    headerAlign: "center",
    align: "center",
    sortable: true
  },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
    headerClassName: "userlist-table-header",
    cellClassName: "userlist-table-column",
    headerAlign: "center",
    align: "center",
    sortable: true
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
    headerClassName: "userlist-table-header",
    cellClassName: "userlist-table-column",
    headerAlign: "center",
    align: "center",
    sortable: true
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerClassName: "userlist-table-header",
    cellClassName: "userlist-table-column",
    headerAlign: "center",
    align: "center",
    sortable: true
  },
  {
    field: "admin",
    headerName: "Admin",
    flex: 1,
    headerClassName: "userlist-table-header",
    cellClassName: "userlist-table-column",
    headerAlign: "center",
    align: "center",
    sortable: true
  }
];

export const UsersList: React.FC = () => {
  const ctx = React.useContext(Ctx);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffectAsync(async () => {
    await ctx?.userService.GetUsers().then(res => setUsers(res));
  }, []);

  const deleteUser = async () => {
    await ctx.userService.DeleteUser(selectedUser);
    setSelectedUser("");
  };

  return (
    <div className="userlist-wrapper">
      <DataGrid
        rows={users}
        columns={columns}
        className="userlist-table"
        getRowId={row => row._id}
        onSelectionModelChange={selection => {
          setSelectedUser(selection[0] as string);
        }}
      />

      <div className="userlist-btn-contaienr">
        <Button
          className="delete-btn"
          classes={{ disabled: "disabled-btn" }}
          variant="contained"
          onClick={async () => await deleteUser()}
          disabled={!selectedUser || selectedUser == ctx.user?._id}
        >
          delete
        </Button>
      </div>
    </div>
  );
};
