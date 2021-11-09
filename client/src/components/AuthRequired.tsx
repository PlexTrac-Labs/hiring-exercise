import React from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";

const AuthRequired: React.FC = props => {
  const auth = React.useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {auth?.auth_token ? (
        props.children
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </>
  );
};
export default AuthRequired;
