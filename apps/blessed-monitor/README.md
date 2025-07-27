# Claude Monitor - Blessed CLI

A terminal-based monitoring application built with blessed for real-time event visualization and tmux session management.

## Features

- Real-time WebSocket connection to event stream
- Color-coded event display with emojis
- Activity chart showing event frequency
- Interactive filtering by source app, session ID, and event type
- **NEW: Tmux Session Setup Wizard** - Create custom development environments
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
- **T**: Open Tmux Session Setup Wizard
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

## Tmux Session Wizard

The Tmux Session Setup Wizard allows you to create custom development environments with multiple windows configured for different tools:

### Available Applications:
- **Claude Code** - Standard Claude Code instance
- **Claude Flow** - Claude Flow with 54 specialized agents
- **Tmux Orchestrator** - Autonomous 24/7 agent orchestration
- **Browsh Browser** - Terminal web browser with graphics
- **Ranger File Manager** - Terminal file manager
- **System Monitor** - Interactive process viewer (htop)
- **Server Logs** - Real-time server log monitoring
- **Blessed Monitor** - Event monitoring dashboard
- **Shell** - Bash shell
- **Custom Command** - Enter your own command

### Using the Wizard:
1. Press **T** to open the wizard
2. Configure basic settings (session name, project path)
3. Choose number of windows (1-8)
4. Select application for each window
5. Review configuration
6. Generate script

Generated scripts are:
- Saved to `apps/blessed-monitor/tmux-scripts/`
- Symlinked to your home directory for easy access
- Executable directly: `~/your-session-name.sh`

### Example Sessions:
- `dev-session.sh` - Standard development setup
- `claude-flow-session.sh` - Full Claude Flow environment