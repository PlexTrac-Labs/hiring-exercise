import { AccountCircle } from "@mui/icons-material";
import { ListItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import {
  AuthContext,
  selectAuthenticatedUser
} from "../components/AuthContext";
import ButtonDeleteUser from "../components/ButtonDeleteUser";
import ButtonNavigateToEdit from "../components/ButtonNavigateToEdit";
import ButtonNavigateToPasswordChange from "../components/ButtonNavigateToPasswordChange";
import ButtonNavigateToUserList from "../components/ButtonNavigateToUserList";
import ListBase from "../components/ListBase";
import TitleBar from "../components/TitleBar";
import { User, UserContext } from "../components/UserContext";

const UserList: React.FC = () => {
  const userContext = React.useContext(UserContext);
  const users = userContext?.state.users;

  return (
    <>
      <TitleBar left={<ButtonNavigateToUserList disabled />} />
      <ListBase>
        {users?.map(u => (
          <Row key={u._id} user={u} />
        ))}
      </ListBase>
    </>
  );
};
export default UserList;

interface cellProps {
  width?: string;
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
}

const Cell: React.FC<cellProps> = ({ width, children, style }) => {
  const myStyle: React.CSSProperties = {
    width: width || "100%",
    ...style
  };

  return <div style={myStyle}>{children}</div>;
};

interface rowProps {
  user: User;
}

const Row: React.FC<rowProps> = ({ user }) => {
  const navigate = useNavigate();

  const auth = React.useContext(AuthContext);
  const myId = auth ? selectAuthenticatedUser(auth.state)?._id : undefined;

  return (
    <ListItem
      key={user._id}
      button={true}
      onClick={() => navigate(`${user._id}`)}
    >
      <Cell width="10%">
        <AccountCircle fontSize="large" />
      </Cell>
      <Cell width="20%">
        <Typography>{user.username}</Typography>
      </Cell>
      <Cell width="20%">
        <Typography>{user.firstName + " " + user.lastName}</Typography>
      </Cell>
      <Cell width="25%">
        <Typography>{user.email}</Typography>
      </Cell>
      <Cell width="25%" style={{ display: "flex", justifyContent: "end" }}>
        {myId === user._id ? <ButtonNavigateToPasswordChange /> : <></>}
        <ButtonNavigateToEdit relativeNavigation={`${user._id}/update`} />
        <ButtonDeleteUser userId={user._id} />
      </Cell>
    </ListItem>
  );
};
