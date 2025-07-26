#!/bin/bash

# Claude Code Multi-View Tmux Setup
# Creates a beautiful multi-pane layout for monitoring everything at once

# Configuration
ECOSYSTEM_HOME="${CLAUDE_ECOSYSTEM_HOME:-/home/v3/ai-infra-stack/claude-code-work}"
SESSION_NAME="claude-multi"

# Kill existing session if it exists
tmux kill-session -t $SESSION_NAME 2>/dev/null

# Create new session with first window (Main Claude)
tmux new-session -d -s $SESSION_NAME -n "main" -c "$ECOSYSTEM_HOME"

# Window 1: 4-pane layout for monitoring
# Create the layout
tmux split-window -h -t $SESSION_NAME:0 -c "$ECOSYSTEM_HOME"
tmux split-window -v -t $SESSION_NAME:0.0 -c "$ECOSYSTEM_HOME"
tmux split-window -v -t $SESSION_NAME:0.2 -c "$ECOSYSTEM_HOME"

# Pane 0 (top-left): CLI Monitor
tmux send-keys -t $SESSION_NAME:0.0 'cd apps/cli-tool && npm run start -- --server ws://localhost:4000/stream' C-m

# Pane 1 (bottom-left): Server logs
tmux send-keys -t $SESSION_NAME:0.1 'tail -f logs/server.log' C-m

# Pane 2 (top-right): Main Claude
tmux send-keys -t $SESSION_NAME:0.2 'claude' C-m

# Pane 3 (bottom-right): File explorer
# Check which file manager is available
if command -v ranger &> /dev/null; then
    tmux send-keys -t $SESSION_NAME:0.3 'ranger' C-m
elif command -v lf &> /dev/null; then
    tmux send-keys -t $SESSION_NAME:0.3 'lf' C-m
elif command -v mc &> /dev/null; then
    tmux send-keys -t $SESSION_NAME:0.3 'mc' C-m
else
    # Fallback to a tree view with watch for live updates
    tmux send-keys -t $SESSION_NAME:0.3 'echo "📁 File Explorer (install ranger for better experience: sudo apt install ranger)" && echo "" && watch -n 2 "tree -L 2 -C --dirsfirst || ls -la"' C-m
fi

# Window 2: Additional Claude agents (2x2 grid)
tmux new-window -t $SESSION_NAME -n "agents" -c "$ECOSYSTEM_HOME"
tmux split-window -h -t $SESSION_NAME:1 -c "$ECOSYSTEM_HOME"
tmux split-window -v -t $SESSION_NAME:1.0 -c "$ECOSYSTEM_HOME"
tmux split-window -v -t $SESSION_NAME:1.2 -c "$ECOSYSTEM_HOME"

# Set up 4 Claude instances
tmux send-keys -t $SESSION_NAME:1.0 'echo "Claude Agent 1 - General Purpose" && claude' C-m
tmux send-keys -t $SESSION_NAME:1.1 'echo "Claude Agent 2 - Code Review" && claude' C-m
tmux send-keys -t $SESSION_NAME:1.2 'echo "Claude Agent 3 - Testing" && claude' C-m
tmux send-keys -t $SESSION_NAME:1.3 'echo "Claude Agent 4 - Documentation" && claude' C-m

# Window 3: Dashboard helper
tmux new-window -t $SESSION_NAME -n "dashboard" -c "$ECOSYSTEM_HOME"
tmux send-keys -t $SESSION_NAME:2 'echo "=== Vue Dashboard ===" && echo "Starting dashboard..." && cd apps/client && npm run dev' C-m

# Set better pane borders
tmux set-option -t $SESSION_NAME pane-border-status top
tmux set-option -t $SESSION_NAME pane-border-format " #P: #{pane_current_command} "

# Switch back to main window
tmux select-window -t $SESSION_NAME:0

# Attach to the session
echo "✨ Multi-view setup complete!"
echo ""
echo "Windows:"
echo "  0: main    - Monitoring (CLI monitor, logs, main Claude, file explorer)"
echo "  1: agents  - 4 Claude agents in grid layout"
echo "  2: dashboard - Vue dashboard server"
echo ""
echo "Keyboard shortcuts:"
echo "  Ctrl+b, n    - Next window"
echo "  Ctrl+b, p    - Previous window"
echo "  Ctrl+b, w    - Window list"
echo "  Ctrl+b, arrows - Navigate panes"
echo "  Ctrl+b, z    - Zoom pane (toggle)"
echo "  Ctrl+b, d    - Detach (keep running)"
echo ""
echo "Attaching to session..."
sleep 2

tmux attach-session -t $SESSION_NAME