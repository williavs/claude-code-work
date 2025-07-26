#!/bin/bash
# Simple launcher for Claude Code Multi-Agent Ecosystem
# Just starts everything you need in tmux windows

echo "🚀 Starting Claude Code Multi-Agent Ecosystem..."

# Check if tmux session exists
if tmux has-session -t claude 2>/dev/null; then
    echo "⚠️  Session 'claude' already exists. Attaching..."
    tmux attach-session -t claude
    exit 0
fi

# Create new tmux session
tmux new-session -d -s claude -n monitor

# Window 1: CLI Monitor (Ink-based UI to see what's happening)
tmux send-keys -t claude:monitor "cd apps/cli-tool && npm start" C-m

# Window 2: Claude Code Router (switches between AI models)
tmux new-window -t claude -n router
tmux send-keys -t claude:router "cd claude-code-router && npm start" C-m

# Window 3: Claude Flow (your 64 agents, now optimized)
tmux new-window -t claude -n agents
tmux send-keys -t claude:agents "cd claude-flow && claude --agents" C-m

# Window 4: Your workspace
tmux new-window -t claude -n workspace
tmux send-keys -t claude:workspace "# Your workspace - run 'claude' here" C-m

# Show what's running
echo "✅ Started all components in tmux session 'claude'"
echo ""
echo "📺 Windows created:"
echo "  1. monitor   - CLI Monitor (see all events)"
echo "  2. router    - Model switcher"
echo "  3. agents    - Claude Flow agents"
echo "  4. workspace - Your workspace"
echo ""
echo "🎯 Quick commands:"
echo "  tmux attach -t claude    # Enter the session"
echo "  Ctrl+B then 1/2/3/4     # Switch windows"
echo "  Ctrl+B then D           # Detach (keep running)"
echo ""
echo "💡 In workspace window, try:"
echo "  claude 'help me build X'"
echo "  claude --agents"

# Attach to session
tmux attach-session -t claude