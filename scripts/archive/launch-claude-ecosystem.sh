#!/bin/bash

# Claude Code Multi-Agent Ecosystem Launcher
# Purpose: Start all components in the correct order with proper configuration
# Compatible with Ubuntu 20.04+

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ECOSYSTEM_HOME="${CLAUDE_ECOSYSTEM_HOME:-$HOME/claude-env}"
LOG_DIR="${ECOSYSTEM_HOME}/logs"
CONFIG_DIR="${ECOSYSTEM_HOME}/config"
PID_DIR="${ECOSYSTEM_HOME}/pids"

# Component settings
SERVER_PORT="${CLAUDE_SERVER_PORT:-4000}"
ROUTER_PORT="${CLAUDE_ROUTER_PORT:-3001}"
MONITOR_WS="${CLAUDE_MONITOR_WS:-ws://localhost:${SERVER_PORT}/stream}"

# Create necessary directories
mkdir -p "$LOG_DIR" "$CONFIG_DIR" "$PID_DIR"

# Logging function
log() {
    echo -e "${2:-$BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_DIR/ecosystem.log"
}

# Error handling
error_exit() {
    echo -e "${RED}ERROR: $1${NC}" >&2
    exit 1
}

# Check dependencies
check_dependencies() {
    log "Checking dependencies..." "$YELLOW"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        error_exit "Node.js is not installed. Please install Node.js 18+"
    fi
    
    # Check tmux
    if ! command -v tmux &> /dev/null; then
        error_exit "tmux is not installed. Please run: sudo apt-get install tmux"
    fi
    
    # Check Python3
    if ! command -v python3 &> /dev/null; then
        error_exit "Python3 is not installed. Please run: sudo apt-get install python3"
    fi
    
    log "All dependencies found ✓" "$GREEN"
}

# Start component with logging
start_component() {
    local name=$1
    local cmd=$2
    local log_file="$LOG_DIR/${name}.log"
    local pid_file="$PID_DIR/${name}.pid"
    
    log "Starting $name..."
    
    # Start in background and save PID
    nohup $cmd > "$log_file" 2>&1 &
    local pid=$!
    echo $pid > "$pid_file"
    
    # Wait a moment and check if process is still running
    sleep 2
    if kill -0 $pid 2>/dev/null; then
        log "$name started successfully (PID: $pid) ✓" "$GREEN"
    else
        log "$name failed to start. Check $log_file for details" "$RED"
        return 1
    fi
}

# Stop all components
stop_all() {
    log "Stopping all components..." "$YELLOW"
    
    for pid_file in "$PID_DIR"/*.pid; do
        if [[ -f "$pid_file" ]]; then
            pid=$(cat "$pid_file")
            name=$(basename "$pid_file" .pid)
            if kill -0 $pid 2>/dev/null; then
                log "Stopping $name (PID: $pid)"
                kill $pid
                rm "$pid_file"
            fi
        fi
    done
    
    # Kill any tmux sessions
    tmux kill-session -t claude-ecosystem 2>/dev/null || true
    
    log "All components stopped ✓" "$GREEN"
}

# Start server component
start_server() {
    cd "$ECOSYSTEM_HOME/apps/server" || error_exit "Server directory not found"
    start_component "server" "node index.js"
}

# Start Claude Code Router
start_router() {
    cd "$ECOSYSTEM_HOME/claude-code-router" || error_exit "Router directory not found"
    
    # Check if config exists
    if [[ ! -f "config.json" ]] && [[ -f "config.example.json" ]]; then
        log "Creating router config from example" "$YELLOW"
        cp config.example.json config.json
    fi
    
    start_component "router" "node src/index.js"
}

# Start CLI Monitor
start_monitor() {
    cd "$ECOSYSTEM_HOME/apps/cli-tool" || error_exit "CLI tool directory not found"
    
    # Build if needed
    if [[ ! -d "dist" ]]; then
        log "Building CLI monitor..." "$YELLOW"
        npm run build
    fi
    
    # Start in tmux for interactive use
    tmux new-window -t claude-ecosystem -n monitor "cd $ECOSYSTEM_HOME/apps/cli-tool && npm run start -- --server $MONITOR_WS; bash"
}

# Start Claude Flow (with resource management)
start_claude_flow() {
    cd "$ECOSYSTEM_HOME/claude-flow" || error_exit "Claude Flow directory not found"
    
    # Create resource-limited config
    cat > "$CONFIG_DIR/claude-flow-pool.json" <<EOF
{
  "agentPool": {
    "minAgents": 4,
    "maxAgents": 8,
    "idleTimeout": 300,
    "memoryLimitMB": 100,
    "totalMemoryLimitMB": 800
  },
  "resourceLimits": {
    "maxCpuPercent": 70,
    "maxMemoryPercent": 50
  }
}
EOF
    
    log "Starting Claude Flow with resource limits" "$YELLOW"
    tmux new-window -t claude-ecosystem -n flow "cd $ECOSYSTEM_HOME/claude-flow && claude --agents --config $CONFIG_DIR/claude-flow-pool.json; bash"
}

# Setup tmux orchestrator
setup_tmux() {
    log "Setting up tmux orchestrator..." "$YELLOW"
    
    # Kill existing session if it exists
    tmux kill-session -t claude-ecosystem 2>/dev/null || true
    
    # Create new session
    tmux new-session -d -s claude-ecosystem -n main
    tmux send-keys -t claude-ecosystem:main "cd $ECOSYSTEM_HOME" C-m
    tmux send-keys -t claude-ecosystem:main "echo 'Claude Ecosystem Main Window'" C-m
    
    log "Tmux session 'claude-ecosystem' created ✓" "$GREEN"
}

# Health check
health_check() {
    log "Performing health check..." "$YELLOW"
    
    # Check server
    if curl -s "http://localhost:${SERVER_PORT}/health" > /dev/null 2>&1; then
        log "Server: Healthy ✓" "$GREEN"
    else
        log "Server: Not responding" "$RED"
    fi
    
    # Check router
    if curl -s "http://localhost:${ROUTER_PORT}/health" > /dev/null 2>&1; then
        log "Router: Healthy ✓" "$GREEN"
    else
        log "Router: Not responding" "$RED"
    fi
    
    # Check WebSocket
    if command -v wscat &> /dev/null; then
        if timeout 2 wscat -c "$MONITOR_WS" 2>/dev/null; then
            log "WebSocket: Connected ✓" "$GREEN"
        else
            log "WebSocket: Cannot connect" "$RED"
        fi
    fi
    
    # Check tmux session
    if tmux has-session -t claude-ecosystem 2>/dev/null; then
        log "Tmux: Session active ✓" "$GREEN"
    else
        log "Tmux: No session" "$RED"
    fi
}

# Main menu
show_menu() {
    echo ""
    echo -e "${BLUE}Claude Code Ecosystem Launcher${NC}"
    echo -e "${BLUE}==============================${NC}"
    echo "1) Start all components"
    echo "2) Stop all components"
    echo "3) Restart all components"
    echo "4) Health check"
    echo "5) View logs"
    echo "6) Attach to tmux session"
    echo "7) Start individual component"
    echo "q) Quit"
    echo ""
    read -p "Select option: " choice
}

# Start individual component menu
start_individual() {
    echo ""
    echo "Select component to start:"
    echo "1) Server"
    echo "2) Router"
    echo "3) Monitor"
    echo "4) Claude Flow"
    echo "5) Back to main menu"
    echo ""
    read -p "Select option: " comp_choice
    
    case $comp_choice in
        1) start_server ;;
        2) start_router ;;
        3) 
            setup_tmux
            start_monitor 
            ;;
        4) 
            setup_tmux
            start_claude_flow 
            ;;
        5) return ;;
        *) echo "Invalid option" ;;
    esac
}

# View logs
view_logs() {
    echo ""
    echo "Select log to view:"
    echo "1) Ecosystem log"
    echo "2) Server log"
    echo "3) Router log"
    echo "4) All logs (tail -f)"
    echo "5) Back to main menu"
    echo ""
    read -p "Select option: " log_choice
    
    case $log_choice in
        1) less "$LOG_DIR/ecosystem.log" ;;
        2) less "$LOG_DIR/server.log" ;;
        3) less "$LOG_DIR/router.log" ;;
        4) tail -f "$LOG_DIR"/*.log ;;
        5) return ;;
        *) echo "Invalid option" ;;
    esac
}

# Start all components
start_all() {
    log "Starting Claude Code Ecosystem..." "$GREEN"
    
    check_dependencies
    
    # Start in order
    start_server
    sleep 2
    
    start_router
    sleep 2
    
    setup_tmux
    start_monitor
    start_claude_flow
    
    log "All components started successfully! ✓" "$GREEN"
    echo ""
    echo -e "${YELLOW}To attach to the tmux session, run:${NC}"
    echo -e "${GREEN}tmux attach -t claude-ecosystem${NC}"
    echo ""
    
    health_check
}

# Main loop
main() {
    # Handle command line arguments
    case "${1:-}" in
        start)
            start_all
            exit 0
            ;;
        stop)
            stop_all
            exit 0
            ;;
        restart)
            stop_all
            sleep 2
            start_all
            exit 0
            ;;
        health)
            health_check
            exit 0
            ;;
        attach)
            tmux attach -t claude-ecosystem
            exit 0
            ;;
        --help|-h)
            echo "Usage: $0 [start|stop|restart|health|attach]"
            echo "  start   - Start all components"
            echo "  stop    - Stop all components"
            echo "  restart - Restart all components"
            echo "  health  - Check component health"
            echo "  attach  - Attach to tmux session"
            echo ""
            echo "Without arguments, shows interactive menu"
            exit 0
            ;;
    esac
    
    # Interactive menu
    while true; do
        show_menu
        case $choice in
            1) start_all ;;
            2) stop_all ;;
            3) 
                stop_all
                sleep 2
                start_all
                ;;
            4) health_check ;;
            5) view_logs ;;
            6) tmux attach -t claude-ecosystem ;;
            7) start_individual ;;
            q|Q) 
                echo "Goodbye!"
                exit 0
                ;;
            *) echo "Invalid option" ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main "$@"