## Getting Started

1. Clone the repo:
```
https://github.com/kennysghub/fe-log-viewer.git
```
2. Install dependencies:

```
npm install

```

3. Start App:

```
npm start
```

Application is now running on http://localhost:3000 

## Overview

The Log Viewer is a web application built to display and interact with large volumes of log data. It features log fetching and virtualized rendering for optimized performance. Each log can be expanded for inspection. 

## Architecture

### Key Components:

* **LogViewer** - Container component for LogEntry components.
* **LogEntry** - Renders each individual log entry fetched from API.
* **useFetch** - Custom hook for encapsulating the logic for fetching and parsing log data.
* **useVirtualization** - Custom hook to optimize the rendering of large datasets.

### Data Flow

1. **Data Ingestion and Parsing**
   1. **useFetch** makes a GET request to the endpoint.
   2. Once headers are received, the Promise resolves to a Response object. The body of the response is a ReadableStream, that can read chunk by chunk.
   3. Inside a loop, chunks are converted into strings and added to the component's log state.

2. **Virtual Rendering**
   1. Only the logs visible in the current viewport plus an overscan area are rendered, reducing the number of nodes injected into the DOM.
   2. The **useVirtualization** hook expands log entries by calculating their height, which ensures a smooth scrolling experience with variable-height log entries.
   3. Expensive calculations such as getVisibleRange are memoized to prevent unnecessary recalculations.

3. **Render Lifecycle**
   1. **Initial Render** - On first load, the LogViewer component renders a minimal set of logs.
   2. **Scroll Events** - As the user scrolls, the onScroll callback updates the scrollTop state in the virtualization hook, triggering a recalculation of the visible range.
   3. **Visible Range Update** - When the visible range changes, only the newly visible logs are rendered, and logs scrolled out of view are removed from the DOM.
   4. **Log Expansion** - When a user expands a log entry, the toggleRow function updates the expandedRows state, triggering a recalculation of total height and visible range. This only affects the rendering of logs around the expanded entry.

## Testing

The current testing suite contains unit tests for the main components of the application:

* **App** - Mocks LogViewer component to isolate the App component's rendering.
* **LogEntry** - Checks if the component renders correctly with given props.
* **LogViewer** - Mocks custom hooks to control behavior and validates if log entries are rendered correctly.

While the current tests provide a good foundation, these are areas that could be expanded if I had more time:

* Integration tests 
* Edge cases
* Performance testing