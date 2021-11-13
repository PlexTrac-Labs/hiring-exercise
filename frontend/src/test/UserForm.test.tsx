import { cleanup, render } from "@testing-library/react";
import React from "react";
import { UserForm, UserFormProps } from "../components/UserForm";
import { EMPTY_USER } from "./testConstants";

const props: UserFormProps = {
  user: EMPTY_USER,
  showPassword: false,
  submitText: "",
  error: false,
  errorMessage: "",
  handleSubmit: (event) => {},
  handleClose: () => {},
};

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<UserForm {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
