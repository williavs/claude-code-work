#!/bin/bash
# Complete launcher for Claude Code Multi-Agent Ecosystem
# Consolidates all components from the project

echo "🚀 Starting Claude Code Multi-Agent Ecosystem (Complete Edition)..."
echo "📍 Including: Server, Monitor, Router, Claude Flow, Tmux Orchestrator"

# Check if tmux session exists
if tmux has-session -t claude 2>/dev/null; then
    echo "⚠️  Session 'claude' already exists. Kill it? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        tmux kill-session -t claude
    else
        tmux attach-session -t claude
        exit 0
    fi
fi

# Create new tmux session
tmux new-session -d -s claude -n server

# Window 1: Observability Server (SQLite + WebSocket)
echo "📊 Starting observability server..."
tmux send-keys -t claude:server "cd apps/server && bun index.ts" C-m

# Window 2: CLI Monitor (Ink-based)
echo "🖥️  Starting CLI monitor..."
tmux new-window -t claude -n monitor
tmux send-keys -t claude:monitor "cd apps/cli-tool && npm start" C-m

# Window 3: Claude Code Router
echo "🔄 Starting Claude Code Router..."
tmux new-window -t claude -n router
tmux send-keys -t claude:router "cd claude-code-router && WS_ENABLED=true npm start" C-m

# Window 4: Claude Flow (64 agents with pooling)
echo "🤖 Starting Claude Flow agents..."
tmux new-window -t claude -n agents
tmux send-keys -t claude:agents "cd claude-flow && claude --agents" C-m

# Window 5: Tmux Orchestrator (if you want autonomous agents)
echo "🎯 Starting Tmux Orchestrator..."
tmux new-window -t claude -n orchestrator
tmux send-keys -t claude:orchestrator "cd Tmux-Orchestrator && python3 tmux_utils.py" C-m

# Window 6: Your workspace
echo "💻 Creating workspace..."
tmux new-window -t claude -n workspace
tmux send-keys -t claude:workspace "# Ready to work! Try: claude 'build me something'" C-m

# Show status
echo ""
echo "✅ All components started in tmux session 'claude'"
echo ""
echo "📺 Windows:"
echo "  1. server      - Observability server (port 4000)"
echo "  2. monitor     - CLI Monitor (real-time events)"
echo "  3. router      - Model switcher (with WebSocket events)"
echo "  4. agents      - Claude Flow (64 agents, pooled)"
echo "  5. orchestrator- Tmux Orchestrator (autonomous agents)"
echo "  6. workspace   - Your workspace"
echo ""
echo "🌐 Access Points:"
echo "  Server API:    http://localhost:4000"
echo "  WebSocket:     ws://localhost:4000"
echo "  Router:        http://localhost:3000"
echo ""
echo "🎯 Quick Commands:"
echo "  tmux attach -t claude     # Enter session"
echo "  Ctrl+B then 1-6          # Switch windows"
echo "  Ctrl+B then D            # Detach"
echo "  tmux kill-session -t claude # Stop everything"
echo ""
echo "💡 Try in workspace:"
echo "  claude 'build a REST API'"
echo "  claude --agents"
echo "  claude /agents"
echo ""

# Optional: Open Vue client in browser
if command -v xdg-open &> /dev/null; then
    echo "🌐 Opening Vue dashboard in browser..."
    sleep 3
    xdg-open http://localhost:5173 &
fi

# Attach to session
tmux attach-session -t claude -t workspace