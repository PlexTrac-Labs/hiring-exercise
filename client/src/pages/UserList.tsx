import { AccountCircle } from "@mui/icons-material";
import { ListItem, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../components/AuthContext";
import ButtonDeleteUser from "../components/ButtonDeleteUser";
import ButtonNavigateToEdit from "../components/ButtonNavigateToEdit";
import ListBase from "../components/ListBase";
import { actionUsersLoad, User, UserContext } from "../components/UserContext";

const UserList: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const userContext = React.useContext(UserContext);
  // const dispatch = userContext?.dispatch
  const users = userContext?.state.users;

  React.useEffect(() => {
    console.log(userContext?.state);
    auth?.axiosInstance
      .get("/user")
      .then(r => r.data as User[])
      .then(u => userContext?.dispatch(actionUsersLoad(u)))
      .catch(e => console.log(e.response));
  }, [auth?.axiosInstance, userContext?.dispatch]);

  return (
    <>
      <ListBase listHeader={<Typography>Users</Typography>}>
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
