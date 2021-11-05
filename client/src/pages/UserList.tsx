import React from "react";
import { AuthContext } from "../components/AuthContext";

const UserList: React.FC = () => {
  const auth = React.useContext(AuthContext);

  return (
    <div>
      User List!
      {auth?.user?.username || "nothing"}
      <button
        onClick={() => auth?.login({ username: "clint", password: "12345678" })}
      >
        Click
      </button>
    </div>
  );
};
export default UserList;
