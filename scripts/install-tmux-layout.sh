#!/bin/bash

# Install tmuxinator and create Claude multi-agent layout

echo "🚀 Setting up tmuxinator for saved tmux layouts..."

# Check if tmuxinator is installed
if ! command -v tmuxinator &> /dev/null; then
    echo "Installing tmuxinator..."
    sudo gem install tmuxinator || {
        echo "Ruby gems not available, trying with apt..."
        sudo apt-get update
        sudo apt-get install -y tmuxinator
    }
fi

# Create tmuxinator config directory
mkdir -p ~/.config/tmuxinator

# Create the Claude multi-agent layout
cat > ~/.config/tmuxinator/claude.yml << 'EOF'
# Claude Code Multi-Agent Workspace
name: claude
root: <%= ENV['CLAUDE_ECOSYSTEM_HOME'] || "#{ENV['HOME']}/ai-infra-stack/claude-code-work" %>

# Optional: run commands before creating windows
pre: |
  export CLAUDE_ECOSYSTEM_HOME="${CLAUDE_ECOSYSTEM_HOME:-$HOME/ai-infra-stack/claude-code-work}"
  echo "🎯 Starting Claude Multi-Agent Workspace..."

windows:
  - monitoring:
      layout: tiled
      panes:
        - cli_monitor:
          - cd apps/cli-tool
          - echo "📊 CLI Monitor - Real-time event tracking"
          - npm run start -- --server ws://localhost:4000/stream
        - server_logs:
          - echo "📜 Server Logs"
          - tail -f logs/server.log
        - main_claude:
          - echo "🤖 Main Claude Agent"
          - claude
        - commands:
          - echo "🎮 Command Center"
          - echo "Dashboard: http://localhost:5173"
          - echo "Test: curl -X POST http://localhost:4000/events -H 'Content-Type: application/json' -d '{\"source_app\": \"test\", \"session_id\": \"test-123\", \"hook_event_type\": \"PreToolUse\", \"payload\": {\"tool_name\": \"Test\"}}'"

  - agents:
      layout: tiled
      panes:
        - general:
          - echo "🤖 General Purpose Agent"
          - claude
        - reviewer:
          - echo "🔍 Code Review Agent"
          - claude
        - tester:
          - echo "🧪 Testing Agent"
          - claude
        - docs:
          - echo "📚 Documentation Agent"
          - claude

  - dashboard:
      panes:
        - vue_dashboard:
          - cd apps/client
          - echo "🎨 Starting Vue Dashboard..."
          - npm run dev

  - workspace:
      layout: main-vertical
      panes:
        - editor:
          - echo "📝 Workspace"
          - echo "Ready for editing..."
        - terminal:
          - echo "💻 Terminal"
EOF

echo "✅ Tmuxinator layout created!"
echo ""
echo "📖 Usage:"
echo "  tmuxinator start claude    # Start the workspace"
echo "  tmuxinator stop claude     # Stop the workspace"
echo "  tmuxinator edit claude     # Edit the layout"
echo ""
echo "🎯 Quick start:"
echo "  mux claude                 # Short alias for 'tmuxinator start claude'"
echo ""
echo "💡 The layout includes:"
echo "  - Window 1: Monitoring (4 panes - CLI monitor, logs, main Claude, commands)"
echo "  - Window 2: Agents (4 Claude agents in grid)"
echo "  - Window 3: Dashboard (Vue development server)"
echo "  - Window 4: Workspace (editor + terminal)"