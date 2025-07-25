# System Setup - Ubuntu Dependencies

> **Foundation setup for your AI-powered homelab infrastructure**

## Overview

This guide sets up a Ubuntu 22.04 LTS server with all dependencies needed for the Claude Code Multi-Agent Observability System.

## Prerequisites

- Ubuntu Server 22.04 LTS (minimum 4GB RAM, 50GB storage)
- sudo access
- Internet connection
- SSH access (if remote)

## 1. System Update & Core Dependencies

```bash
# Update package lists and upgrade system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y \
    curl \
    wget \
    git \
    tmux \
    sqlite3 \
    python3.10 \
    python3-pip \
    nodejs \
    npm \
    unzip \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Install build essentials (needed for some packages)
sudo apt install -y build-essential
```

## 2. Modern Package Managers

### Install Bun (faster than npm)
```bash
# Install Bun (JavaScript runtime & package manager)
curl -fsSL https://bun.sh/install | bash

# Add to PATH
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify installation
bun --version
```

### Install uv (Python package manager)
```bash
# Install uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Add to PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify installation
uv --version
```

## 2.5. Terminal Monitoring Installation

### Install Ink React Terminal UI Framework
```bash
# Install TypeScript and development tools globally
npm install -g typescript ts-node @types/node

# Create terminal monitoring directory
mkdir -p ~/terminal-monitoring
cd ~/terminal-monitoring

# Initialize package.json
npm init -y

# Install Ink React framework and dependencies
npm install ink react@^18.0.0
npm install --save-dev @types/react typescript

# Install additional terminal UI components
npm install ink-text-input ink-select-input ink-spinner ink-box
npm install chalk cli-boxes terminal-kit

# Install monitoring utilities
npm install systeminformation node-pty blessed blessed-contrib

# Verify installation
node -e "console.log('Ink installed:', require('ink/package.json').version)"
```

### Install Additional Monitoring Dependencies
```bash
# Install system monitoring tools
sudo apt install -y htop iotop nethogs iftop

# Install process monitoring libraries
npm install pidusage ps-list systeminformation

# Install real-time data streaming
npm install ws socket.io-client

# Install configuration management
npm install js-yaml dotenv
```

## 3. Claude Code & Router

### Install Claude Code CLI
```bash
# Install Claude Code CLI globally
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Install Claude Code Router
```bash
# Install Claude Code Router
npm install -g @musistudio/claude-code-router

# Verify installation
ccr --version
```

## 3.5. CLI Tool Setup

### Build Enhanced Terminal Monitoring Tool
```bash
# Navigate to CLI tool directory (adjust path as needed)
cd ~/claude-observability/apps/cli-tool

# Install CLI tool dependencies
npm install


# Build the CLI tool
npm run build


# Test installation
claude-monitor --version

# run the cli tool 

  # From project root
  ./monitor
  # OR
  # Run with the server that listens for hooks on 4000 all in one 
  ./run-monitor.sh

```

### Configure CLI Tool Settings
```bash
# Create CLI configuration directory
mkdir -p ~/.config/claude-monitor

# Create default configuration
cat > ~/.config/claude-monitor/config.json << 'EOF'
{
  "monitoring": {
    "interval": 1000,
    "enableSystemStats": true,
    "enableProcessMonitoring": true,
    "enableNetworkMonitoring": true
  },
  "display": {
    "theme": "dark",
    "showTimestamps": true,
    "compactMode": false,
    "refreshRate": 30
  },
  "alerts": {
    "cpuThreshold": 80,
    "memoryThreshold": 85,
    "diskThreshold": 90
  },
  "integrations": {
    "websocketUrl": "ws://localhost:4000",
    "apiEndpoint": "http://localhost:4000/api"
  }
}
EOF

# Set appropriate permissions
chmod 644 ~/.config/claude-monitor/config.json
```



## 4. Cloudflare Tools

### Install cloudflared (Tunnel daemon)
```bash
# Download and install cloudflared
curl -L --output cloudflared.deb \
    https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

sudo dpkg -i cloudflared.deb

# Verify installation
cloudflared version

# Clean up
rm cloudflared.deb
```

## 5. Optional: TTS Dependencies

For text-to-speech notifications (optional but recommended):

```bash
# Install system TTS packages
sudo apt install -y espeak espeak-data libespeak-dev

# Test TTS
echo "Hello from your Ubuntu homelab" | espeak
```

## 6. User Configuration

### Create dedicated service user (recommended)
```bash
# Create user for Claude services
sudo adduser claude-observability

# Add to necessary groups
sudo usermod -aG sudo claude-observability

# Switch to service user (optional)
sudo su - claude-observability
```

### Set up directories
```bash
# Create application directories
sudo mkdir -p /opt/claude-observability/{data,config,logs,backups}

# Set ownership
sudo chown -R $USER:$USER /opt/claude-observability

# Create symlink to home directory
ln -s /opt/claude-observability ~/claude-observability
```

## 7. Environment Configuration

### Create global environment file
```bash
# Create environment file
cat > ~/.env << 'EOF'
# API Keys (fill in your actual keys)
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here

# User Configuration
ENGINEER_NAME=your_name_here

# System Configuration
NODE_ENV=production
SQLITE_DB_PATH=/opt/claude-observability/data/events.db
LOG_LEVEL=info

# Network Configuration
OBSERVABILITY_PORT=4000
CLIENT_PORT=5173
WEBSOCKET_PORT=4000

# Cloudflare Configuration (fill in after tunnel setup)
CLOUDFLARE_TUNNEL_TOKEN=your_tunnel_token_here
TUNNEL_HOSTNAME=observability.yourdomain.com
EOF

# Secure the environment file
chmod 600 ~/.env

# Source it in bashrc
echo 'source ~/.env' >> ~/.bashrc
source ~/.bashrc
```

## 8. Git Configuration

```bash
# Configure git (needed for tmux orchestrator)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Set up SSH keys for GitHub
ssh-keygen -t ed25519 -C "your.email@example.com"
# Add the public key to your GitHub account
cat ~/.ssh/id_ed25519.pub
```

## 9. Firewall Configuration

```bash
# Install and configure UFW (Ubuntu Firewall)
sudo ufw enable

# Allow SSH (adjust port if needed)
sudo ufw allow 22/tcp

# Allow local services (only accessible via localhost)
sudo ufw allow from 127.0.0.1 to any port 4000
sudo ufw allow from 127.0.0.1 to any port 5173

# Check status
sudo ufw status verbose
```

## 10. System Services Setup

### Create systemd service directories
```bash
# Create user systemd directory
mkdir -p ~/.config/systemd/user

# Enable user lingering (services start without login)
sudo loginctl enable-linger $USER
```

### Basic log rotation
```bash
# Create logrotate configuration
sudo tee /etc/logrotate.d/claude-observability << 'EOF'
/opt/claude-observability/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF
```

## 11. Verification

### Test all installations
```bash
#!/bin/bash
echo "=== System Verification ==="

# Check versions
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)" 
echo "Bun: $(bun --version)"
echo "Python: $(python3 --version)"
echo "uv: $(uv --version)"
echo "Claude Code: $(claude --version)"
echo "Claude Router: $(ccr --version)"
echo "cloudflared: $(cloudflared version)"
echo "SQLite: $(sqlite3 --version)"
echo "tmux: $(tmux -V)"

# Check directories
echo -e "\n=== Directory Structure ==="
ls -la ~/claude-observability/
ls -la /opt/claude-observability/

# Check environment
echo -e "\n=== Environment Variables ==="
echo "ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY:0:8}..." 
echo "ENGINEER_NAME: $ENGINEER_NAME"

echo -e "\n✅ System setup verification complete!"
```

## Next Steps

Your Ubuntu system is now ready! Continue with:

1. **[Core Components Setup](02-core-components.md)** - Deploy the observability stack
2. **[Cloudflare Setup](03-cloudflare-setup.md)** - Configure secure tunnels

## Troubleshooting

### Common Issues

**Permission errors with npm global installs:**
```bash
# Fix npm global permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

**Python/uv installation issues:**
```bash
# Install Python dev packages
sudo apt install -y python3-dev python3-venv

# Reinstall uv
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Cloudflared installation fails:**
```bash
# Alternative installation method
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared
```

### Health Check Script

Save this as `~/check-system.sh`:
```bash
#!/bin/bash
set -e

echo "🔍 Checking system health..."

# Check services
systemctl --user is-active claude-server.service || echo "❌ Server service not running"
systemctl --user is-active claude-client.service || echo "❌ Client service not running"

# Check ports
nc -z localhost 4000 && echo "✅ Server port 4000 open" || echo "❌ Server port 4000 closed"
nc -z localhost 5173 && echo "✅ Client port 5173 open" || echo "❌ Client port 5173 closed"

# Check disk space
df -h /opt/claude-observability/

# Check recent logs
echo "📋 Recent server logs:"
tail -n 5 /opt/claude-observability/logs/server.log 2>/dev/null || echo "No server logs yet"

echo "✅ System health check complete!"
```

---

**System ready!** Continue with [Core Components Setup](02-core-components.md)