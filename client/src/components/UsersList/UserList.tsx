import React, { useState } from "react";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";
import { useEffectAsync } from "../../util/UseEffectAsync";
import { DataGrid, GridColumns } from "@material-ui/data-grid";
import "./UserList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

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
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 1,
    headerClassName: "userlist-table-header",
    cellClassName: "userlist-table-column",
    headerAlign: "center",
    align: "center",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: () => {
      return <FontAwesomeIcon icon={faEdit} className="edit-btn" />;
    }
  },
  {
    field: "delete",
    headerName: "Delete",
    flex: 1,
    headerClassName: "userlist-table-header",
    cellClassName: "userlist-table-column",
    headerAlign: "center",
    align: "center",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: () => {
      return <FontAwesomeIcon icon={faTrash} className="delete-btn" />;
    }
  }
];

export const UsersList: React.FC = () => {
  const ctx = React.useContext(Ctx);
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();

  const getUsers = async () => {
    await ctx.userService.GetUsers().then(res => setUsers(res));
  };

  useEffectAsync(async () => {
    await getUsers();
  }, []);

  return (
    <div className="userlist-wrapper">
      <h2>Users</h2>
      <DataGrid
        rows={users}
        columns={columns}
        className="userlist-table"
        getRowId={row => row._id}
        disableSelectionOnClick={true}
        onCellClick={async cell => {
          if (cell.field === "edit") {
            history.push(`/updateuser/${cell.id}`);
            return;
          }
          if (cell.field === "delete") {
            // TODO: Add confirm to this.
            await ctx.userService
              .DeleteUser(cell.id as string)
              .then(async () => {
                await getUsers();
              });
            return;
          }
          history.push(`/user/${cell.id}`);
        }}
      />
    </div>
  );
};
