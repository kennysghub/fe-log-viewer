import { useRef } from "react";
import PropTypes from "prop-types";
import LogEntry from "./LogEntry";
import useFetchLogs from "../hooks/useFetchLogs";
import useVirtualization from "../hooks/useVirtualization";
import "../LogViewer.css";

const LogViewer = ({ url }) => {
  const { logs, isLoading, error } = useFetchLogs(url);
  const containerRef = useRef(null);

  const ITEM_HEIGHT = 40;
  const CONTAINER_HEIGHT = 600;
  const OVERSCAN_COUNT = 30;

  const {
    visibleLogs,
    getTotalHeight,
    getItemHeight,
    onScroll,
    toggleRow,
    expandedRows,
  } = useVirtualization(logs, ITEM_HEIGHT, CONTAINER_HEIGHT, OVERSCAN_COUNT);

  if (isLoading) return <div>Loading logs...</div>;
  if (error) return <div>Error loading logs: {error.message}</div>;

  return (
    <div className="log-viewer-container">
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="log-viewer"
        style={{ height: `${CONTAINER_HEIGHT}px` }}
      >
        <div style={{ height: `${getTotalHeight()}px`, position: "relative" }}>
          {visibleLogs.map(({ log, index }) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: `${logs
                  .slice(0, index)
                  .reduce((total, _, i) => total + getItemHeight(i), 0)}px`,
                left: 0,
                right: 0,
              }}
            >
              <LogEntry
                log={log}
                isExpanded={!!expandedRows[index]}
                onToggle={() => toggleRow(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

LogViewer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default LogViewer;
