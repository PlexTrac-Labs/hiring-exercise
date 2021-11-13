import { cleanup, render } from "@testing-library/react";
import React from "react";
import { TopBar } from "../components/TopBar";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<TopBar />);
  expect(asFragment()).toMatchSnapshot();
});
