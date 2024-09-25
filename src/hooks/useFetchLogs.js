import { useState, useEffect, useCallback } from "react";

const useFetchLogs = (url) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        const newLogs = lines
          .map((line) => {
            try {
              return JSON.parse(line);
            } catch (error) {
              console.error("Error parsing log entry:", error);
              return null;
            }
          })
          .filter(Boolean);

        setLogs((prevLogs) => [...prevLogs, ...newLogs]);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, isLoading, error };
};

export default useFetchLogs;
