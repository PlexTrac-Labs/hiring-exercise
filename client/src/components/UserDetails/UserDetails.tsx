import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Ctx } from "../../App";
import { User } from "../../models/User/User";
import { useEffectAsync } from "../../util/UseEffectAsync";
import "./UserDetails.scss";

interface Params {
  id: string;
}

export const UserDetails: React.FC = () => {
  const ctx = React.useContext(Ctx);
  const { id } = useParams<Params>();
  const [user, setUser] = useState<User>({} as User);
  const history = useHistory();

  useEffectAsync(async () => {
    await ctx.userService.GetUser(id).then(res => {
      setUser(res);
    });
  }, []);

  // TODO: add confirm
  const deleteUser = async () => {
    await ctx.userService.DeleteUser(id).then(() => {
      history.push("/");
    });
  };

  return (
    <div className="user-details-wrapper">
      <TableContainer className="table-container" component={Paper}>
        <Table className="user-details-table">
          <TableRow>
            <TableCell colSpan={2} align="center" className="table-cell">
              {user.firstName} {user.lastName}
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-btn"
                onClick={() => history.push(`/updateuser/${id}`)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-btn"
                onClick={async () => await deleteUser()}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="table-cell row-label">
              First Name
            </TableCell>
            <TableCell align="center" className="table-cell">
              {user.firstName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="table-cell row-label">
              Last Name
            </TableCell>
            <TableCell align="center" className="table-cell">
              {user.lastName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="table-cell row-label">
              Username
            </TableCell>
            <TableCell align="center" className="table-cell">
              {user.username}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="table-cell row-label">
              Email
            </TableCell>
            <TableCell align="center" className="table-cell">
              {user.email}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" className="table-cell row-label">
              Admin
            </TableCell>
            <TableCell align="center" className="table-cell">
              {`${user.admin}`}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Button
        className="back-btn"
        variant="outlined"
        color="primary"
        onClick={() => history.push("/")}
      >
        Back
      </Button>
    </div>
  );
};
