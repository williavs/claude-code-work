#!/bin/bash
# Ubuntu installation and test script for Claude Monitor

set -e

echo "Claude Monitor - Ubuntu Installation Script"
echo "=========================================="

# Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null || echo "Not installed")
if [[ "$NODE_VERSION" == "Not installed" ]]; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 18+ first:"
    echo "  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    exit 1
fi

echo "Node.js version: $NODE_VERSION"

# Check terminal capabilities
echo ""
echo "Checking terminal capabilities..."
echo "TERM: $TERM"
echo "Colors: $(tput colors 2>/dev/null || echo 'unknown')"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Build the project
echo ""
echo "Building project..."
npm run clean
npm run build

# Create global link
echo ""
echo "Creating global command..."
sudo npm link

# Test the installation
echo ""
echo "Testing installation..."
claude-monitor --version

echo ""
echo "Installation complete!"
echo ""
echo "Usage:"
echo "  claude-monitor                    # Connect to default server (ws://localhost:4000/stream)"
echo "  claude-monitor -s ws://host:port  # Connect to custom server"
echo "  claude-monitor --help             # Show all options"
echo ""
echo "Controls:"
echo "  q        - Quit"
echo "  f        - Toggle filters"
echo "  r        - Reconnect"
echo "  1/2/3    - Cycle through filter values (when filter panel is open)"
echo "  c        - Clear all filters"
echo ""

# Test for common terminal issues
echo "Terminal compatibility notes:"
if [[ "$TERM" == "xterm-256color" ]] || [[ "$TERM" == "screen-256color" ]]; then
    echo "✓ Terminal supports 256 colors"
else
    echo "⚠ Terminal may have limited color support (TERM=$TERM)"
    echo "  For best results, use: export TERM=xterm-256color"
fi

# Check if running over SSH
if [[ -n "$SSH_CLIENT" ]] || [[ -n "$SSH_TTY" ]]; then
    echo "✓ SSH session detected - terminal emulation should work fine"
fi

# Check tmux
if command -v tmux &> /dev/null; then
    echo "✓ tmux is installed - can integrate with Tmux-Orchestrator"
else
    echo "⚠ tmux not found - install with: sudo apt-get install tmux"
fi