import { cleanup, render } from "@testing-library/react";
import React from "react";
import { EditDialog, EditDialogProps } from "../components/EditDialog";
import { User } from "../util/user/types";
import { EMPTY_USER } from "./testConstants";

const props: EditDialogProps = {
  open: true,
  user: EMPTY_USER,
  setUsers: (users: User[]) => {},
  onClose: () => {},
};

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<EditDialog {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
