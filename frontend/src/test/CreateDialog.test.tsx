import { cleanup, render } from "@testing-library/react";
import React from "react";
import { CreateDialog, CreateDialogProps } from "../components/CreateDialog";
import { User } from "../util/user/types";

const props: CreateDialogProps = {
  open: true,
  setUsers: (users: User[]) => {},
  onClose: () => {},
};

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<CreateDialog {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
