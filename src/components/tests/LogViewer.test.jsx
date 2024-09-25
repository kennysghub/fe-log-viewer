/* eslint-disable no-template-curly-in-string */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogViewer from "../LogViewer";
import useFetchLogs from "../../hooks/useFetchLogs";
import useVirtualization from "../../hooks/useVirtualization";

jest.mock("../../hooks/useFetchLogs");
jest.mock("../../hooks/useVirtualization");

describe("LogViewer Component", () => {
  const mockLogs = [
    {
      _time: 1724323612592,
      cid: "api",
      channel: "conf:policies",
      level: "info",
      message: "loading policy",
      context: "cribl",
      policy: {
        args: ["groupName", "macroId"],
        template: [
          "GET /m/\\${groupName}/search/macros/\\${macroId}",
          "GET /m/\\${groupName}/search/macros/\\${macroId}/*",
        ],
        description: "Members with this policy can view and use the macro",
        title: "Read Only",
      },
    },
  ];

  beforeEach(() => {
    useFetchLogs.mockReturnValue({
      logs: mockLogs,
      isLoading: false,
      error: null,
    });
    useVirtualization.mockReturnValue({
      visibleLogs: mockLogs.map((log, index) => ({ log, index })),
      getTotalHeight: () => 1000,
      getItemHeight: () => 50,
      onScroll: jest.fn(),
      toggleRow: jest.fn(),
      expandedRows: {},
    });
  });

  test("renders log entries", () => {
    render(<LogViewer url="https://example.com/logs" />);
    expect(screen.getByText(JSON.stringify(mockLogs[0]))).toBeInTheDocument();
  });

  test("displays loading state", () => {
    useFetchLogs.mockReturnValue({ logs: [], isLoading: true, error: null });
    render(<LogViewer url="https://example.com/logs" />);
    expect(screen.getByText("Loading logs...")).toBeInTheDocument();
  });

  test("displays error state", () => {
    useFetchLogs.mockReturnValue({
      logs: [],
      isLoading: false,
      error: new Error("Failed to fetch"),
    });
    render(<LogViewer url="https://example.com/logs" />);
    expect(
      screen.getByText("Error loading logs: Failed to fetch")
    ).toBeInTheDocument();
  });
});
