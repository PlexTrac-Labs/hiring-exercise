import { cleanup, render } from "@testing-library/react";
import React from "react";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<ResetPasswordForm />);
  expect(asFragment()).toMatchSnapshot();
});
