import { cleanup, render } from "@testing-library/react";
import React from "react";
import { ResetPassword } from "../pages/ResetPassword";

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<ResetPassword />);
  expect(asFragment()).toMatchSnapshot();
});
