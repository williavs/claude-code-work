# Claude Monitor - Blessed CLI

A terminal-based monitoring application built with blessed for real-time event visualization.

## Features

- Real-time WebSocket connection to event stream
- Color-coded event display with emojis
- Activity chart showing event frequency
- Interactive filtering by source app, session ID, and event type
- Keyboard shortcuts for easy navigation
- Auto-reconnection on disconnect
- Mouse support for scrolling

## Installation

```bash
npm install
```

## Usage

### Start the monitor (connects to ws://localhost:4000/stream by default):
```bash
npm start
```

### With custom server URL:
```bash
npm start -- --server ws://your-server:port/stream
```

### Run the test server (for demo/testing):
```bash
npm run test-server
```

## Keyboard Shortcuts

- **Q** or **ESC**: Quit the application
- **F**: Toggle filter panel
- **R**: Reconnect to server
- **C**: Clear all filters (when filter panel is shown)
- **1**: Cycle Source App filter (when filter panel is shown)
- **2**: Cycle Session ID filter (when filter panel is shown)
- **3**: Cycle Event Type filter (when filter panel is shown)
- **↑/↓** or **Mouse Wheel**: Scroll through events

## Event Types

The monitor displays different event types with unique colors and emojis:

- 🔧 **PreToolUse** (Yellow): Tool is about to be used
- ✅ **PostToolUse** (Green): Tool use completed
- 🔔 **Notification** (Blue): System notification
- 🛑 **Stop** (Red): Process stopped
- 👥 **SubagentStop** (Magenta): Subagent stopped
- 💬 **UserPromptSubmit** (Cyan): User submitted a prompt

## Architecture

- **src/index.js**: Main application entry point and layout manager
- **src/websocket.js**: WebSocket client with auto-reconnection
- **src/eventStore.js**: Event storage and filtering logic
- **src/components/**: UI components (header, event list, chart, filters, status bar)

## Testing

1. Start the test server:
   ```bash
   npm run test-server
   ```

2. In another terminal, start the monitor:
   ```bash
   npm start
   ```

The test server will send random events every 2 seconds for demonstration purposes.