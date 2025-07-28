#!/bin/bash
# Auto-generated view: test1
# Created: Mon Jul 28 02:41:20 AM UTC 2025

SESSION_NAME="${1:-test1}"

# Check if session exists
if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "Session '$SESSION_NAME' already exists!"
    echo "Kill it and create new? (y/N)"
    read -r KILL_EXISTING
    if [[ $KILL_EXISTING =~ ^[Yy]$ ]]; then
        tmux kill-session -t "$SESSION_NAME"
    else
        echo "Exiting..."
        exit 1
    fi
fi

# Create session
tmux new-session -d -s "$SESSION_NAME" -n "Multi-View"

# Create split layout
tmux split-window -h -t $SESSION_NAME:0 -p 50
tmux split-window -v -t $SESSION_NAME:0.0 -p 50
tmux split-window -v -t $SESSION_NAME:0.2 -p 50
tmux select-layout -t $SESSION_NAME:0 tiled

# Send commands to panes
tmux send-keys -t $SESSION_NAME:0.0 'cd /home/wv3/test && claude' Enter
tmux select-pane -t $SESSION_NAME:0.0 -T 'Claude-Code'
tmux send-keys -t $SESSION_NAME:0.1 'cd /home/wv3/test && claude' Enter
tmux select-pane -t $SESSION_NAME:0.1 -T 'Claude-Flow'
tmux send-keys -t $SESSION_NAME:0.2 'cd /home/wv3/browsh/carbonyl-0.0.3 && ./carbonyl --no-sandbox https://google.com' Enter
tmux select-pane -t $SESSION_NAME:0.2 -T 'Carbonyl'
tmux send-keys -t $SESSION_NAME:0.3 'cd /home/wv3/claude-code-work && npm run monitor' Enter
tmux select-pane -t $SESSION_NAME:0.3 -T 'Blessed'

# Enable pane borders and titles
tmux set -t $SESSION_NAME pane-border-status top
tmux set -t $SESSION_NAME pane-border-format " #{pane_title} "

# Select first pane and attach
tmux select-pane -t $SESSION_NAME:0.0

if [ -n "$TMUX" ]; then
    echo "Switch to session: tmux switch-client -t $SESSION_NAME"
else
    tmux attach-session -t $SESSION_NAME
fi
