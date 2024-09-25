import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogEntry from "../LogEntry";

describe("LogEntry Component", () => {
  const mockLog = {
    _time: "2023-01-01T00:00:00Z",
    message: "Test log message",
  };

  test("renders log entry", () => {
    render(<LogEntry log={mockLog} isExpanded={false} onToggle={() => {}} />);
    expect(screen.getByText(JSON.stringify(mockLog))).toBeInTheDocument();
    expect(screen.getByText("2023-01-01T00:00:00.000Z")).toBeInTheDocument();
  });

  test("expands log entry on click", () => {
    const onToggleMock = jest.fn();
    render(
      <LogEntry log={mockLog} isExpanded={false} onToggle={onToggleMock} />
    );
    fireEvent.click(screen.getByText(JSON.stringify(mockLog)));
    expect(onToggleMock).toHaveBeenCalled();
  });

  test("renders expanded view when isExpanded is true", () => {
    render(<LogEntry log={mockLog} isExpanded={true} onToggle={() => {}} />);
    expect(screen.getByText(JSON.stringify(mockLog))).toBeInTheDocument();

    const logDetails = screen.getByRole("log");
    expect(logDetails).toBeInTheDocument();
    expect(logDetails).toHaveTextContent(mockLog._time);
    expect(logDetails).toHaveTextContent(mockLog.message);
  });
});
