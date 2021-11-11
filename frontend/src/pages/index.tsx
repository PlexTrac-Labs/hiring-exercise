import React from "react";
import { ListUsers } from "./ListUsers";
import { Login } from "./Login";
import { User } from "./User";

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
    title: "User",
    route: "/user",
    comp: User,
  },
];

export default Pages;
