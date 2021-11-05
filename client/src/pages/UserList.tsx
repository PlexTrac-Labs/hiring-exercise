import React, { useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { User } from "../types/User";

const UserList: React.FC = () => {
  const auth = React.useContext(AuthContext);

  const [users, setUsers] = React.useState<User[]>();

  useEffect(() => {
    auth?.axiosInstance
      .get("/user")
      .then(r => r.data as User[])
      .then(r => setUsers(r))
      .catch(e => console.log(e.response));
  }, [auth?.axiosInstance]);

  return (
    <div>
      <h3>User List!</h3>

      <div>
        {users ? (
          users.map(u => (
            <div key={u.username}>
              {u.username} - {u.firstName + " " + u.lastName}
            </div>
          ))
        ) : (
          <div>Failed Auth</div>
        )}
      </div>
    </div>
  );
};
export default UserList;
