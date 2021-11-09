import { Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router";
import ButtonDeleteUser from "../components/ButtonDeleteUser";
import ButtonNavigateToEdit from "../components/ButtonNavigateToEdit";
import ButtonNavigateToUserList from "../components/ButtonNavigateToUserList";
import FormUserUpdate from "../components/FormUserUpdate";
import TitleBar from "../components/TitleBar";
import { selectUserById, UserContext } from "../components/UserContext";

const UserView: React.FC = () => {
  const { userId } = useParams();

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
