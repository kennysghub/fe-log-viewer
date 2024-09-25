import LogViewer from "./components/LogViewer";
import ErrorBoundary from "./components/ErrorBoundary";
const App = () => {
  const logUrl = "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log";
  return (
    <div className="app">
      <h1>Log Viewer</h1>
      <ErrorBoundary
        fallback={
          <div>
            An error occurred while loading logs. Please try again later.
          </div>
        }
      >
        <LogViewer url={logUrl} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
