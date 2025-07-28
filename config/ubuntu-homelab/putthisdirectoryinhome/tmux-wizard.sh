#!/bin/bash

# Tmux Workspace Wizard - Split View Edition
# Interactive script to set up a tmux session with split panes

set -e

# Colors for better UI
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to create split layout based on pane count
create_split_layout() {
    local pane_count=$1
    
    case $pane_count in
        2)
            # Split horizontally (side by side)
            tmux split-window -h -t $SESSION_NAME:0
            ;;
        3)
            # One big pane on left, two stacked on right
            tmux split-window -h -t $SESSION_NAME:0
            tmux split-window -v -t $SESSION_NAME:0.1
            ;;
        4)
            # 2x2 grid
            tmux split-window -h -t $SESSION_NAME:0
            tmux split-window -v -t $SESSION_NAME:0.0
            tmux split-window -v -t $SESSION_NAME:0.2
            ;;
        5)
            # Top row with 3, bottom row with 2
            tmux split-window -v -t $SESSION_NAME:0
            tmux split-window -h -t $SESSION_NAME:0.0
            tmux split-window -h -t $SESSION_NAME:0.1
            tmux split-window -h -t $SESSION_NAME:0.3
            ;;
        6)
            # 3x2 grid
            tmux split-window -v -t $SESSION_NAME:0
            tmux split-window -h -t $SESSION_NAME:0.0
            tmux split-window -h -t $SESSION_NAME:0.1
            tmux split-window -h -t $SESSION_NAME:0.3
            tmux split-window -h -t $SESSION_NAME:0.4
            ;;
        7|8|9|10)
            # Use tiled layout for 7+ panes
            for (( i=1; i<$pane_count; i++ )); do
                tmux split-window -t $SESSION_NAME:0
                tmux select-layout -t $SESSION_NAME:0 tiled
            done
            ;;
    esac
    
    # Apply appropriate layout
    if [ $pane_count -eq 2 ]; then
        tmux select-layout -t $SESSION_NAME:0 even-horizontal
    elif [ $pane_count -eq 3 ]; then
        tmux select-layout -t $SESSION_NAME:0 main-vertical
    elif [ $pane_count -ge 4 ]; then
        tmux select-layout -t $SESSION_NAME:0 tiled
    fi
}

# Main wizard starts here
clear
print_color $BLUE "╔══════════════════════════════════════╗"
print_color $BLUE "║    TMUX WORKSPACE WIZARD - SPLIT     ║"
print_color $BLUE "╚══════════════════════════════════════╝"
echo

# Ask if this is a new app project
print_color $YELLOW "Is this a new app/project? (y/N):"
read -r IS_NEW_APP

# Get session name
print_color $YELLOW "Enter session/project name (default: workspace):"
read -r SESSION_NAME
SESSION_NAME=${SESSION_NAME:-workspace}

# Set up directories based on new app choice
if [[ $IS_NEW_APP =~ ^[Yy]$ ]]; then
    WORKING_DIR="/home/wv3/$SESSION_NAME"
    print_color $BLUE "Creating new project directory: $WORKING_DIR"
    mkdir -p "$WORKING_DIR"
    
    # Copy essential AI infrastructure
    print_color $GREEN "Setting up AI infrastructure..."
    cp -r /home/wv3/claude-code-work/.claude "$WORKING_DIR/" 2>/dev/null && print_color $GREEN "✓ Copied .claude configuration"
    
    # Initialize as a basic project structure
    mkdir -p "$WORKING_DIR"/{src,docs,scripts}
    
    # Create a project README
    cat > "$WORKING_DIR/README.md" << EOF
# $SESSION_NAME

Project created on $(date)

## Project Structure
- src/ - Source code
- docs/ - Documentation
- scripts/ - Utility scripts
- .claude/ - Claude AI configuration (agents, hooks, settings)

## Available Commands
- \`claude\` - Open Claude in project context
- \`ranger\` - File manager
- \`tmux\` - Terminal multiplexer
EOF
    
    print_color $GREEN "✓ Project structure created"
else
    WORKING_DIR="/home/wv3"
    print_color $BLUE "Using home directory: $WORKING_DIR"
fi

# Check if session already exists
if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    print_color $RED "Session '$SESSION_NAME' already exists!"
    print_color $YELLOW "Do you want to kill it and create a new one? (y/N)"
    read -r KILL_EXISTING
    if [[ $KILL_EXISTING =~ ^[Yy]$ ]]; then
        tmux kill-session -t "$SESSION_NAME"
    else
        print_color $RED "Exiting..."
        exit 1
    fi
fi

# Available applications
print_color $GREEN "\nAvailable applications:"
echo "1) Claude Code (Normal)"
echo "2) Claude Flow (in claude-flow directory)"
echo "3) Tmux Orchestrator (in Tmux-Orchestrator directory)"
echo "4) Carbonyl (Pretty Terminal Browser)"
echo "5) Lynx (Simple Terminal Browser)"
echo "6) Ranger (File Manager)"
echo "7) Empty Terminal"
echo "8) System Monitor (htop)"
echo "9) Blessed Monitor (Event Monitor)"
echo "10) Custom Command"

# Get pane count
print_color $YELLOW "\nHow many panes do you want in your split view? (1-10):"
read -r PANE_COUNT

# Validate input
if ! [[ "$PANE_COUNT" =~ ^[0-9]+$ ]] || [ "$PANE_COUNT" -lt 1 ] || [ "$PANE_COUNT" -gt 10 ]; then
    print_color $RED "Please enter a number between 1 and 10"
    exit 1
fi

# Arrays to store configurations
declare -a COMMANDS
declare -a NAMES

# Get configuration for each pane
for (( i=0; i<$PANE_COUNT; i++ )); do
    print_color $GREEN "\nPane $((i+1)) configuration:"
    print_color $YELLOW "Select application (1-10):"
    read -r APP_CHOICE
    
    case $APP_CHOICE in
        1)
            NAMES[$i]="Claude-Code"
            COMMANDS[$i]="cd $WORKING_DIR && claude"
            ;;
        2)
            NAMES[$i]="Claude-Flow"
            if [[ $IS_NEW_APP =~ ^[Yy]$ ]]; then
                COMMANDS[$i]="cd $WORKING_DIR && claude"
            else
                COMMANDS[$i]="cd /home/wv3/claude-code-work/claude-flow && claude"
            fi
            ;;
        3)
            NAMES[$i]="Tmux-Orch"
            if [[ $IS_NEW_APP =~ ^[Yy]$ ]]; then
                COMMANDS[$i]="cd $WORKING_DIR && claude"
            else
                COMMANDS[$i]="cd /home/wv3/claude-code-work/Tmux-Orchestrator && claude"
            fi
            ;;
        4)
            NAMES[$i]="Carbonyl"
            COMMANDS[$i]="cd /home/wv3/browsh/carbonyl-0.0.3 && ./carbonyl --no-sandbox https://google.com"
            ;;
        5)
            NAMES[$i]="Lynx"
            COMMANDS[$i]="lynx https://google.com"
            ;;
        6)
            NAMES[$i]="Ranger"
            COMMANDS[$i]="cd $WORKING_DIR && ranger --cmd='set show_hidden true'"
            ;;
        7)
            NAMES[$i]="Terminal"
            COMMANDS[$i]="cd $WORKING_DIR"
            ;;
        8)
            NAMES[$i]="Monitor"
            COMMANDS[$i]="htop"
            ;;
        9)
            NAMES[$i]="Blessed"
            # Check if monitor is already running
            if lsof -ti:4000 > /dev/null 2>&1; then
                print_color $YELLOW "⚠️  Monitor already running on port 4000"
                COMMANDS[$i]="echo 'Monitor already running! Check existing windows or use a different pane.'"
            else
                COMMANDS[$i]="cd /home/wv3/claude-code-work && npm run monitor"
            fi
            ;;
        10)
            print_color $YELLOW "Enter custom pane name:"
            read -r CUSTOM_NAME
            print_color $YELLOW "Enter command to run (leave empty for shell):"
            read -r CUSTOM_CMD
            NAMES[$i]="${CUSTOM_NAME:-Custom}"
            COMMANDS[$i]="$CUSTOM_CMD"
            ;;
        *)
            print_color $RED "Invalid choice, using empty terminal"
            NAMES[$i]="Terminal"
            COMMANDS[$i]=""
            ;;
    esac
done

# Create the tmux session with first pane
print_color $BLUE "\nCreating tmux session '$SESSION_NAME' with split view..."
tmux new-session -d -s "$SESSION_NAME" -n "Multi-View"

# Create the split layout if more than 1 pane
if [ $PANE_COUNT -gt 1 ]; then
    create_split_layout $PANE_COUNT
fi

# Send commands to each pane
for (( i=0; i<$PANE_COUNT; i++ )); do
    if [ ! -z "${COMMANDS[$i]}" ]; then
        print_color $GREEN "Setting up pane $((i+1)): ${NAMES[$i]}"
        tmux send-keys -t $SESSION_NAME:0.$i "${COMMANDS[$i]}" Enter
    else
        print_color $GREEN "Setting up pane $((i+1)): ${NAMES[$i]} (empty terminal)"
    fi
    
    # Set pane title (border)
    tmux select-pane -t $SESSION_NAME:0.$i -T "${NAMES[$i]}"
done

# Enable pane borders and titles
tmux set -t $SESSION_NAME pane-border-status top
tmux set -t $SESSION_NAME pane-border-format " #{pane_title} "

# Select first pane
tmux select-pane -t $SESSION_NAME:0.0

# Attach to session
print_color $BLUE "\nWorkspace ready! Attaching to session..."
sleep 1

# Check if we're already in tmux
if [ -n "$TMUX" ]; then
    print_color $YELLOW "You're already in a tmux session. Switch to the new session with:"
    print_color $GREEN "tmux switch-client -t $SESSION_NAME"
    print_color $YELLOW "\nOr detach current session (Ctrl+b d) and run 'wiz' again"
else
    tmux attach-session -t "$SESSION_NAME"
fi

# Save configuration for future use
save_view_config() {
    print_color $YELLOW "\nSave this configuration as a view? (y/N):"
    read -r SAVE_CONFIG
    
    if [[ $SAVE_CONFIG =~ ^[Yy]$ ]]; then
        print_color $YELLOW "Enter view name (no spaces):"
        read -r VIEW_NAME
        VIEW_NAME=${VIEW_NAME// /_}  # Replace spaces with underscores
        
        if [ ! -z "$VIEW_NAME" ]; then
            VIEW_FILE="/home/wv3/tmux-scripts/views/${VIEW_NAME}.sh"
            
            # Create the view script
            cat > "$VIEW_FILE" << EOF
#!/bin/bash
# Auto-generated view: $VIEW_NAME
# Created: $(date)

SESSION_NAME="\${1:-$VIEW_NAME}"

# Check if session exists
if tmux has-session -t "\$SESSION_NAME" 2>/dev/null; then
    echo "Session '\$SESSION_NAME' already exists!"
    echo "Kill it and create new? (y/N)"
    read -r KILL_EXISTING
    if [[ \$KILL_EXISTING =~ ^[Yy]$ ]]; then
        tmux kill-session -t "\$SESSION_NAME"
    else
        echo "Exiting..."
        exit 1
    fi
fi

# Create session
tmux new-session -d -s "\$SESSION_NAME" -n "Multi-View"

EOF

            # Add split layout
            if [ $PANE_COUNT -gt 1 ]; then
                echo "# Create split layout" >> "$VIEW_FILE"
                case $PANE_COUNT in
                    2)
                        echo "tmux split-window -h -t \$SESSION_NAME:0" >> "$VIEW_FILE"
                        echo "tmux select-layout -t \$SESSION_NAME:0 even-horizontal" >> "$VIEW_FILE"
                        ;;
                    3)
                        echo "tmux split-window -h -t \$SESSION_NAME:0 -p 50" >> "$VIEW_FILE"
                        echo "tmux split-window -v -t \$SESSION_NAME:0.1 -p 50" >> "$VIEW_FILE"
                        echo "tmux select-layout -t \$SESSION_NAME:0 main-vertical" >> "$VIEW_FILE"
                        ;;
                    4)
                        echo "tmux split-window -h -t \$SESSION_NAME:0 -p 50" >> "$VIEW_FILE"
                        echo "tmux split-window -v -t \$SESSION_NAME:0.0 -p 50" >> "$VIEW_FILE"
                        echo "tmux split-window -v -t \$SESSION_NAME:0.2 -p 50" >> "$VIEW_FILE"
                        echo "tmux select-layout -t \$SESSION_NAME:0 tiled" >> "$VIEW_FILE"
                        ;;
                    *)
                        for (( i=1; i<$PANE_COUNT; i++ )); do
                            echo "tmux split-window -t \$SESSION_NAME:0" >> "$VIEW_FILE"
                        done
                        echo "tmux select-layout -t \$SESSION_NAME:0 tiled" >> "$VIEW_FILE"
                        ;;
                esac
            fi
            
            # Add commands and titles
            echo "" >> "$VIEW_FILE"
            echo "# Send commands to panes" >> "$VIEW_FILE"
            for (( i=0; i<$PANE_COUNT; i++ )); do
                if [ ! -z "${COMMANDS[$i]}" ]; then
                    echo "tmux send-keys -t \$SESSION_NAME:0.$i '${COMMANDS[$i]}' Enter" >> "$VIEW_FILE"
                fi
                echo "tmux select-pane -t \$SESSION_NAME:0.$i -T '${NAMES[$i]}'" >> "$VIEW_FILE"
            done
            
            # Add final setup
            cat >> "$VIEW_FILE" << 'EOF'

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
EOF
            
            chmod +x "$VIEW_FILE"
            print_color $GREEN "View saved as: $VIEW_FILE"
            print_color $YELLOW "Run it with: $VIEW_FILE [session_name]"
        fi
    fi
}

save_view_config

print_color $GREEN "\nTmux wizard complete! 🚀"
print_color $YELLOW "\nUseful keys:"
print_color $GREEN "  Ctrl+b → Arrow keys : Navigate between panes"
print_color $GREEN "  Ctrl+b z           : Zoom/unzoom current pane"
print_color $GREEN "  Ctrl+b space       : Cycle through layouts"
print_color $GREEN "  Ctrl+b d           : Detach from session"