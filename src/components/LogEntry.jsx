import PropTypes from "prop-types";
import { formatJSON } from "../utils/formatJSON.js";
const LogEntry = ({ log, isExpanded, onToggle }) => {
  return (
    <div
      className={`log-entry ${isExpanded ? "expanded" : ""}`}
      onClick={onToggle}
      role="log"
    >
      <div className="log-header">
        <span className="log-time">{new Date(log._time).toISOString()}</span>
        <span className="log-message">{JSON.stringify(log)}</span>
      </div>
      {isExpanded && <pre className="log-details">{formatJSON(log)}</pre>}
    </div>
  );
};
LogEntry.propTypes = {
  log: PropTypes.shape({
    _time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default LogEntry;
