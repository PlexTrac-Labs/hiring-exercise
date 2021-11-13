import { cleanup, render } from "@testing-library/react";
import React from "react";
import { CreateUser, CreateUserProps } from "../components/CreateUser";
import { User } from "../util/user/types";

const props: CreateUserProps = {
  setUsers: (users: User[]) => {},
};

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<CreateUser {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
