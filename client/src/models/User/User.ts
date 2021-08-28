import React from "react";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
}
