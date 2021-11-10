import React from "react";
import { useParams } from "react-router";
import {
  AuthContext,
  selectAuthenticatedUser
} from "../components/AuthContext";
import ButtonNavigateToEdit from "../components/ButtonNavigateToEdit";
import ButtonNavigateToPasswordChange from "../components/ButtonNavigateToPasswordChange";
import ButtonNavigateToUserList from "../components/ButtonNavigateToUserList";
import FormUserUpdate from "../components/FormUserUpdate";
import TitleBar from "../components/TitleBar";
import { selectUserById, UserContext } from "../components/UserContext";

const UserView: React.FC = () => {
  const { userId } = useParams();

  const auth = React.useContext(AuthContext);
  const myId = auth ? selectAuthenticatedUser(auth.state)?._id : undefined;

  const userContext = React.useContext(UserContext);
  const user = selectUserById(userContext?.state, userId);

  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        justifyContent: "center"
      }}
    >
      <TitleBar
        left={<ButtonNavigateToUserList />}
        right={
          <>
            {myId === user?._id ? <ButtonNavigateToPasswordChange /> : <></>}
            <ButtonNavigateToEdit relativeNavigation={"update"} />
            {/* <ButtonDeleteUser userId={user?._id} /> */}
          </>
        }
      />
      <FormUserUpdate
        user={user}
        viewMode={true}
        save={() => {}}
        cancel={() => {}}
      />
    </div>
  );
};
export default UserView;
