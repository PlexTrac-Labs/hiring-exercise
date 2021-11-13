import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Login } from "../pages/Login";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});
