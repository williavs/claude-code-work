#!/bin/bash
# Tmux session: dev-session
# Generated: 7/27/2025, 7:29:17 PM

SESSION="dev-session"

# Kill existing session
tmux kill-session -t $SESSION 2>/dev/null

# Create new session
echo "Creating tmux session: $SESSION"
tmux new-session -d -s $SESSION -n "Code"

# First window
tmux send-keys -t $SESSION:0 'ranger' C-m


# Window 1: Terminal
tmux new-window -t $SESSION -n "Terminal"
tmux send-keys -t $SESSION:1 'bash' C-m

# Enable mouse
tmux set -g mouse on

# Attach to session
echo "Attaching to session..."
tmux attach-session -t $SESSION
