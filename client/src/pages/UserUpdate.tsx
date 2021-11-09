import React from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../components/AuthContext";
import ButtonDeleteUser from "../components/ButtonDeleteUser";
import ButtonNavigateToPasswordChange from "../components/ButtonNavigateToPasswordChange";
import ButtonNavigateToUserList from "../components/ButtonNavigateToUserList";
import ButtonNavigateToView from "../components/ButtonNavigateToView";
import FormUserUpdate from "../components/FormUserUpdate";
import TitleBar from "../components/TitleBar";
import {
  actionUserUpdate,
  selectUserById,
  User,
  UserContext
} from "../components/UserContext";

const UserUpdate: React.FC = () => {
  const { userId } = useParams();
  const auth = React.useContext(AuthContext);
  const myId = auth?.user?._id;

  const userContext = React.useContext(UserContext);
  const dispatch = userContext.dispatch;
  const user = selectUserById(userContext?.state, userId);

  const navigate = useNavigate();

  const handleSave = (u: User) => {
    console.log("saving...");
    auth?.axiosInstance
      .put(`user/${userId}`, {
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        birthYear: u.birthYear,
        favoriteColor: u.favoriteColor
      })
      .then(r => r.data)
      .then(() => (dispatch ? dispatch(actionUserUpdate(u)) : null))
      .catch(e => console.log("user update failed...", e.response));
  };

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
            {myId === user?._id ? <ButtonNavigateToPasswordChange /> : null}
            <ButtonNavigateToView relativeNavigation={"/user/" + user?._id} />
            <ButtonDeleteUser userId={user?._id} />
          </>
        }
      />
      <FormUserUpdate
        user={user}
        viewMode={false}
        save={(u: User) => handleSave(u)}
        cancel={() => navigate(-1)}
      />
    </div>
  );
};
export default UserUpdate;
