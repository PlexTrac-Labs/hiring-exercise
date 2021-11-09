import React from "react";
import { AuthContext } from "./AuthContext";
import ButtonDelete from "./ButtonDelete";
import { actionUserDelete, UserContext } from "./UserContext";

interface props {
  userId?: string;
}

const ButtonDeleteUser: React.FC<props> = ({ userId }) => {
  const auth = React.useContext(AuthContext);
  const userContext = React.useContext(UserContext);
  const dispatch = userContext.dispatch;

  const deleteUser = (uid: string) => {
    auth?.axiosInstance
      .delete(`/user/${uid}`)
      .then(() => (dispatch ? dispatch(actionUserDelete(uid)) : null))
      .catch(e => console.log(e.response));
  };

  return <ButtonDelete onClick={() => (userId ? deleteUser(userId) : null)} />;
};
export default ButtonDeleteUser;
