import { cleanup, render } from "@testing-library/react";
import React from "react";
import { UserListItem, UserListItemProps } from "../components/UserListItem";
import { User } from "../util/user/types";
import { EMPTY_USER } from "./testConstants";

const props: UserListItemProps = {
  user: EMPTY_USER,
  handleClick: (user: User) => {},
  handleDelete: () => {},
};

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<UserListItem {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
