import { cleanup, render, waitFor } from "@testing-library/react";
import React from "react";
import { ListUsers } from "../pages/ListUsers";
import { getAllUsers } from "../util/user/user";
import { EMPTY_USER } from "./testConstants";

jest.mock("../util/user/user", () => ({
  getAllUsers: jest.fn(),
}));

const mockedGetAllUsers = getAllUsers as jest.Mock;

afterEach(cleanup);

it("renders", async () => {
  mockedGetAllUsers.mockImplementation(() => [EMPTY_USER]);
  const { getByTestId, asFragment } = render(<ListUsers />);
  await waitFor(() => getByTestId("listUsers"));
  expect(asFragment()).toMatchSnapshot();
});
