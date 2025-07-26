# Ubuntu Setup Command

Sets up and launches the COMPLETE Claude Code Multi-Agent Ecosystem on your Ubuntu server.

## Quick Start

When you're on your Ubuntu server, run:
```bash
claude /ubuntu-setup
```

## What This Command Does

```bash
#!/bin/bash
# This is what the command runs:

# 1. Make scripts executable
chmod +x launch-complete.sh
chmod +x launch.sh

# 2. Install any missing dependencies
echo "🔍 Checking dependencies..."
cd apps/server && bun install
cd ../cli-tool && npm install
cd ../../claude-code-router && npm install
cd ../claude-flow && npm install
cd ..

# 3. Create necessary directories
mkdir -p logs
mkdir -p /opt/claude-observability/{data,config,logs,backups}

# 4. Start everything
./launch-complete.sh
```

## What You Get

### 6 Tmux Windows:
1. **server** - Observability server (SQLite + WebSocket on port 4000)
2. **monitor** - CLI Monitor with Ink.js UI (real-time events)
3. **router** - Claude Code Router (model switching + events)
4. **agents** - Claude Flow (64 agents with memory pooling)
5. **orchestrator** - Tmux Orchestrator (autonomous agents)
6. **workspace** - Your command center

### Access Points:
- Server API: `http://localhost:4000`
- WebSocket: `ws://localhost:4000`
- Router: `http://localhost:3000`
- Vue Dashboard: `http://localhost:5173` (if running)

## Complete Setup (if fresh Ubuntu)

If you haven't run the full Ubuntu setup yet:

```bash
# 1. Follow the complete guide
cat config/ubuntu-homelab/01-system-setup.md

# 2. Or quick install essentials
sudo apt update && sudo apt install -y \
    tmux nodejs npm python3 python3-pip sqlite3 git curl

# 3. Install package managers
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# 4. Install Claude Code globally
npm install -g @anthropic-ai/claude-code
```

## Usage Examples

```bash
# In workspace window (6)

# Build something
claude "create a user authentication API with JWT"

# Use specific agents
claude "use the architect agent to design a microservices system"

# List all 64 agents
claude /agents

# Use Claude Flow agents
claude --agents
```

## Monitoring

Switch to monitor window (Ctrl+B, 2) to see:
- 🔧 Tool usage
- 💬 User prompts
- ✅ Completions
- 📊 Activity charts
- 🚨 Errors

## Quick Controls

- `tmux attach -t claude` - Enter the session
- `Ctrl+B, 1-6` - Switch between windows
- `Ctrl+B, D` - Detach (keeps running)
- `tmux ls` - List sessions
- `tmux kill-session -t claude` - Stop everything

## With Cloudflare Tunnel (optional)

If you've set up Cloudflare tunnels:
```bash
# Add to your .env
CLOUDFLARE_TUNNEL_TOKEN=your_token

# Access globally at
https://observability.yourdomain.com
```

$ARGUMENTS