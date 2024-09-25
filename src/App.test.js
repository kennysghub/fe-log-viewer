import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

jest.mock("./components/LogViewer", () => () => (
  <div data-testid="mock-log-viewer" />
));

describe("App Component", () => {
  test("renders Log Viewer title", () => {
    render(<App />);
    expect(screen.getByText("Log Viewer")).toBeInTheDocument();
  });

  test("renders LogViewer component", () => {
    render(<App />);
    expect(screen.getByTestId("mock-log-viewer")).toBeInTheDocument();
  });
});
