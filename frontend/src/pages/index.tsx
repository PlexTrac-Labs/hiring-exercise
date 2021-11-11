import React from "react";
import { ListUsers } from "./ListUsers";
import { Login } from "./Login";
import { ResetPassword } from "./ResetPassword";

export type PageType = {
  title: string;
  route: string;
  comp: React.FunctionComponent;
};

const Pages: PageType[] = [
  {
    title: "Login",
    route: "/",
    comp: Login,
  },
  {
    title: "List",
    route: "/list",
    comp: ListUsers,
  },
  {
    title: "Reset Password",
    route: "/reset",
    comp: ResetPassword,
  },
];

export default Pages;
