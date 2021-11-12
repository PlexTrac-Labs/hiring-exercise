import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { TopBar } from "../components/TopBar";

afterEach(cleanup);

it("Text in state is changed when button clicked", () => {
  const { getByText } = render(<TopBar />);

  expect(getByText(/Initial/i).textContent).toBe("Initial State");

  fireEvent.click(getByText("State Change Button"));

  expect(getByText(/Initial/i).textContent).toBe("Initial State Changed");
});
