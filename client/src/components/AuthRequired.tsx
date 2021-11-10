import React from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext, selectIsAuthenticated } from "./AuthContext";

const AuthRequired: React.FC = props => {
  const auth = React.useContext(AuthContext);
  const isAuthenticated = auth ? selectIsAuthenticated(auth.state) : false;
  const location = useLocation();

  return (
    <>
      {isAuthenticated ? (
        props.children
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </>
  );
};
export default AuthRequired;
