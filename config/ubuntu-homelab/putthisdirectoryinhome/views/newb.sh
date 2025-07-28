#!/bin/bash
# Auto-generated view: newb
# Created: Mon Jul 28 03:02:07 AM UTC 2025

SESSION_NAME="${1:-newb}"

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
tmux split-window -t $SESSION_NAME:0
tmux split-window -t $SESSION_NAME:0
tmux split-window -t $SESSION_NAME:0
tmux split-window -t $SESSION_NAME:0
tmux select-layout -t $SESSION_NAME:0 tiled

# Send commands to panes
tmux send-keys -t $SESSION_NAME:0.0 'htop' Enter
tmux select-pane -t $SESSION_NAME:0.0 -T 'Monitor'
tmux send-keys -t $SESSION_NAME:0.1 'cd /home/wv3/test-next-app' Enter
tmux select-pane -t $SESSION_NAME:0.1 -T 'Terminal'
tmux send-keys -t $SESSION_NAME:0.2 'cd /home/wv3/test-next-app && ranger --cmd='set show_hidden true'' Enter
tmux select-pane -t $SESSION_NAME:0.2 -T 'Ranger'
tmux send-keys -t $SESSION_NAME:0.3 'lynx https://google.com' Enter
tmux select-pane -t $SESSION_NAME:0.3 -T 'Lynx'
tmux send-keys -t $SESSION_NAME:0.4 'cd /home/wv3/test-next-app && claude' Enter
tmux select-pane -t $SESSION_NAME:0.4 -T 'Claude-Flow'

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
