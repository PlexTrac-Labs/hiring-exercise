import React from "react";
import { AuthContext } from "./AuthContext";
import ButtonDelete from "./ButtonDelete";
import { UserContext } from "./UserContext";

interface props {
  userId: string;
}

const ButtonDeleteUser: React.FC<props> = ({ userId }) => {
  const auth = React.useContext(AuthContext);
  const userContext = React.useContext(UserContext);

  const deleteUser = (uid: string) => {
    auth?.axiosInstance
      .delete(`/user/${uid}`)
      .then(() => {
        console.log("successfully deleted ", uid);
        // userContext.actions?.userDelete(uid)
      })
      .catch(e => console.log(e.response));
  };

  return <ButtonDelete onClick={() => deleteUser(userId)} />;
};
export default ButtonDeleteUser;
