# Ubuntu Setup Guide

> **Simple Multi-Agent Observability System for Ubuntu/Linux**

Get your Claude Code multi-agent observability system running on Ubuntu with just two scripts.

## What You're Building

A complete observability system that monitors all Claude Code activities:

- **🔍 Real-time monitoring** - Track all Claude Code interactions
- **🤖 Multi-agent support** - Run multiple Claude agents simultaneously
- **📊 Live dashboards** - Beautiful Vue.js web interface
- **📟 Terminal UI** - Blessed-based CLI monitor
- **📡 WebSocket streaming** - Real-time event updates
- **🔧 Hook system** - Capture and analyze all agent activities

## Quick Start

### Prerequisites

```bash
# Install system dependencies
sudo apt update
sudo apt install -y curl git tmux ranger python3 python3-pip

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Claude Code
npm install -g @anthropic-ai/claude-code
```

### Setup & Launch

```bash
# Clone the repository
git clone <your-repo-url>
cd claude-code-work

# Step 1: Run setup (installs all dependencies)
./scripts/setup-environment.sh

# Step 2: Launch the multi-view dashboard
./scripts/tmux-multi-view.sh
```

That's it! The system is now running.

## What's Running

After launching, you'll have:

- **Observability Server** - http://localhost:4000
- **Vue Dashboard** - http://localhost:5173
- **Blessed CLI Monitor** - In tmux pane
- **Multiple Claude Agents** - Ready for tasks
- **File Explorer** - Ranger for navigation

## Tmux Controls

Once running, you'll have 3 tmux windows:

**Window 0: Main** (4 panes)
- Top-left: Blessed CLI monitor
- Bottom-left: Server logs
- Top-right: Main Claude agent
- Bottom-right: File explorer

**Window 1: Agents** (4 Claude agents)
- 2x2 grid of additional Claude agents

**Window 2: Dashboard**
- Vue dashboard server output

### Keyboard Shortcuts
- `Ctrl+b, n` - Next window
- `Ctrl+b, p` - Previous window  
- `Ctrl+b, arrows` - Navigate panes
- `Ctrl+b, z` - Zoom pane (toggle)
- `Ctrl+b, d` - Detach (keep running)

## Blessed CLI Monitor

The terminal monitor shows real-time events with:
- Color-coded event types
- Activity chart
- Interactive filtering
- Keyboard navigation

### Monitor Shortcuts
- **Q/ESC** - Quit
- **F** - Toggle filters
- **R** - Reconnect
- **↑/↓** - Scroll events

## Making Services Public (Optional)

To expose services publicly:

1. **Run your service in Docker**
2. **Create a Cloudflare Tunnel** in the Cloudflare dashboard UI
3. **Point the tunnel** to your Docker container

**Important**: Never modify cloudflared config files directly. Always use the Cloudflare UI.

## Optional: Cloudflare MCP Servers

For advanced automation, you can add Cloudflare's MCP servers:

```bash
# See detailed setup
cat config/ubuntu-homelab/mcp-setup.md
```

This gives you access to 13 MCP servers for infrastructure automation.

## Manual Component Start

If you need to start components individually:

```bash
# Terminal 1: Start server
cd apps/server && bun run dev

# Terminal 2: Start Vue dashboard  
cd apps/client && bun run dev

# Terminal 3: Start blessed monitor
cd apps/blessed-monitor && npm start -- --server ws://localhost:4000/stream
```

## Troubleshooting

- **Dependencies not installing**: Make sure Node.js 18+ is installed
- **Server won't start**: Check if port 4000 is already in use
- **Hooks not working**: Ensure Python 3 and `uv` are installed (setup script checks this)
- **Tmux issues**: Install with `sudo apt install tmux`

## Environment Variables

Create a `.env` file in the project root:

```bash
# API Keys (optional but recommended)
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here

# Your name
ENGINEER_NAME=Your Name
```