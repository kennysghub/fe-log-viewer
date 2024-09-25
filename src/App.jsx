import LogViewer from "./components/LogViewer";

const App = () => {
  const logUrl = "https://s3.amazonaws.com/io.cribl.c021.takehome/cribl.log";
  return (
    <div className="app">
      <h1>Log Viewer</h1>
      <LogViewer url={logUrl} />
    </div>
  );
};

export default App;
