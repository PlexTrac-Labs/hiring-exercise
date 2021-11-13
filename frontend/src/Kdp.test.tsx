import React from "react";
import renderer from "react-test-renderer";
import Link from "./Kdp";

import axios from "axios";
import {
  render,
  cleanup,
  act,
  findByTestId,
  waitFor,
} from "@testing-library/react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(cleanup);

it("renders", async () => {
  mockedAxios.get.mockResolvedValue({
    data: [
      { id: 1, title: "title 1" },
      { id: 2, title: "title 2" },
    ],
  });
  const { getByTestId, asFragment } = render(<Link />);

  const listNode = await waitFor(() => getByTestId("list"));
  expect(listNode.children).toHaveLength(2);
  expect(asFragment()).toMatchSnapshot();
});
