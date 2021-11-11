import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN } from "../helpful/constants";

export const PrivateRoute = () => {
  const loggedIn = !!localStorage.getItem(AUTH_TOKEN);

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};
