import { useState, useCallback, useMemo } from "react";

const useVirtualization = (
  logs,
  itemHeight,
  containerHeight,
  overscanCount
) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});

  const getItemHeight = useCallback(
    (index) => {
      return expandedRows[index] ? itemHeight * 8 : itemHeight;
    },
    [expandedRows, itemHeight]
  );

  const getTotalHeight = useCallback(() => {
    return logs.reduce((total, _, index) => total + getItemHeight(index), 0);
  }, [logs, getItemHeight]);

  const getVisibleRange = useCallback(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscanCount
    );
    const endIndex = Math.min(
      logs.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + overscanCount
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, overscanCount, logs.length]);

  const visibleLogs = useMemo(() => {
    const { startIndex, endIndex } = getVisibleRange();
    return logs.slice(startIndex, endIndex + 1).map((log, index) => ({
      log,
      index: index + startIndex,
    }));
  }, [logs, getVisibleRange]);

  const onScroll = useCallback((event) => {
    setScrollTop(event.target.scrollTop);
  }, []);

  const toggleRow = useCallback((index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  }, []);

  return {
    visibleLogs,
    getTotalHeight,
    getItemHeight,
    onScroll,
    toggleRow,
    expandedRows,
  };
};

export default useVirtualization;
