# Claude Monitor - CLI Tool

A stable, Ink.js-based CLI monitoring tool for Claude Code observability, optimized for Ubuntu server deployment.

## Features

- **Real-time WebSocket streaming** with event buffering for stability
- **Interactive filtering** by source app, session ID, and event type
- **Activity chart** showing event frequency over 3 minutes
- **Ubuntu-optimized** with graceful terminal degradation
- **Auto-reconnection** with exponential backoff
- **Memory-efficient** with configurable event limits

## Installation

### Ubuntu Server

```bash
# Clone the repository
git clone <repository-url>
cd apps/cli-tool

# Run the installation script
./install-ubuntu.sh
```

### Manual Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Create global command
npm link

# Run the monitor
claude-monitor
```

## Usage

```bash
# Connect to default server (ws://localhost:4000/stream)
claude-monitor

# Connect to custom server
claude-monitor --server ws://your-server:port/stream

# Configure options
claude-monitor --max-events 2000 --buffer-interval 50
```

## Controls

- `q` or `Ctrl+C` - Quit
- `f` - Toggle filter panel
- `r` - Reconnect to server
- `1` - Cycle through Source App filters (when filter panel is open)
- `2` - Cycle through Session ID filters (when filter panel is open)
- `3` - Cycle through Event Type filters (when filter panel is open)
- `c` - Clear all filters

## Architecture

The tool has been completely refactored to use Ink.js (React for CLI) with proper separation of concerns:

```
src/
├── index.tsx           # Main entry point
├── components/         # UI components
│   ├── App.tsx        # Main app component
│   ├── Header.tsx     # Status header
│   ├── Chart.tsx      # Activity visualization
│   ├── FilterPanel.tsx # Filter controls
│   └── EventList.tsx  # Event display
├── services/          # Core services
│   ├── websocket.ts   # WebSocket management
│   └── eventBuffer.ts # Event buffering for stability
├── hooks/             # React hooks
│   ├── useWebSocket.ts    # WebSocket connection hook
│   ├── useEventStream.ts  # Event filtering hook
│   └── useChartData.ts    # Chart data management
└── types/             # TypeScript types
    └── index.ts       # Shared type definitions
```

## Key Improvements

1. **Stable Streaming**: Event buffering prevents UI overload during high-frequency events
2. **Memory Management**: Automatic event rotation and limits prevent memory leaks
3. **React Best Practices**: Proper state management, memoization, and effect cleanup
4. **Ubuntu Compatibility**: Works reliably over SSH and in limited terminal environments
5. **Clean Architecture**: Modular design with clear separation of concerns

## Running as a Service

To run Claude Monitor as a systemd service on Ubuntu:

```bash
# Copy the service file
sudo cp claude-monitor.service /etc/systemd/system/

# Edit the service file to match your setup
sudo systemctl edit claude-monitor.service

# Enable and start the service
sudo systemctl enable claude-monitor
sudo systemctl start claude-monitor

# Check status
sudo systemctl status claude-monitor

# View logs
journalctl -u claude-monitor -f
```

## Integration with Other Components

### With Claude Code Router
```bash
# Monitor all routed requests
claude-monitor --server ws://router-host:4000/stream
```

### With Tmux Orchestrator
```bash
# Auto-start in tmux pane
tmux new-window -n monitor 'claude-monitor --server ws://localhost:4000/stream'
```

## Troubleshooting

### Connection Issues
- Verify the WebSocket server is running
- Check firewall rules for the WebSocket port
- Try connecting with `ws` instead of `wss` for local servers

### Display Issues
- Ensure `TERM` environment variable is set correctly
- For SSH sessions, use `export TERM=xterm-256color`
- The tool gracefully degrades for limited terminals

### Performance Issues
- Adjust buffer interval: `--buffer-interval 200` (higher = less CPU)
- Reduce max events: `--max-events 500` (lower = less memory)

## Development

```bash
# Watch mode for development
npm run dev

# Run tests
npm test

# Clean build artifacts
npm run clean
```