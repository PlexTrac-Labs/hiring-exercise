import { cleanup, render } from "@testing-library/react";
import React from "react";
import {
  InteractDialog,
  InteractDialogProps,
} from "../components/InteractDialog";

const props: InteractDialogProps = {
  open: true,
  title: "Title",
  handleClose: () => {},
};

afterEach(cleanup);

it("renders", async () => {
  const { asFragment } = render(<InteractDialog {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
