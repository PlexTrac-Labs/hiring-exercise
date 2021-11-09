import { AccountCircle } from "@mui/icons-material";
import { ListItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import ButtonDeleteUser from "../components/ButtonDeleteUser";
import ButtonNavigateToEdit from "../components/ButtonNavigateToEdit";
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

  return (
    <ListItem
      key={user._id}
      button={true}
      onClick={() => navigate(`${user._id}`)}
    >
      <Cell>
        <AccountCircle fontSize="large" />
      </Cell>
      <Cell>
        <Typography>{user.username}</Typography>
      </Cell>
      <Cell>
        <Typography>{user.firstName + " " + user.lastName}</Typography>
      </Cell>
      <Cell>
        <Typography>{user.email}</Typography>
      </Cell>
      <Cell style={{ display: "flex", justifyContent: "end" }}>
        <ButtonNavigateToEdit relativeNavigation={`${user._id}/update`} />
        <ButtonDeleteUser userId={user._id} />
      </Cell>
    </ListItem>
  );
};