#!/bin/bash

# Script to run Claude Code Hooks observability server and terminal monitor
set -e

echo "🚀 Starting Claude Code Hooks Observability System..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to cleanup background processes
cleanup() {
    echo -e "\n${YELLOW}Shutting down...${NC}"
    if [ ! -z "$SERVER_PID" ]; then
        echo "Stopping server (PID: $SERVER_PID)"
        kill $SERVER_PID 2>/dev/null || true
    fi
    exit 0
}

# Trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Check if required directories exist
if [ ! -d "apps/server" ]; then
    echo -e "${RED}Error: apps/server directory not found${NC}"
    echo "Please run this script from the project root directory"
    exit 1
fi

if [ ! -d "apps/cli-tool" ]; then
    echo -e "${RED}Error: apps/cli-tool directory not found${NC}"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Start the server in background
echo -e "${BLUE}Starting WebSocket server...${NC}"
cd apps/server
bun start &
SERVER_PID=$!
cd ../..

# Wait a moment for server to start
sleep 2

# Check if server is running
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${RED}Failed to start server${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Server started (PID: $SERVER_PID)${NC}"
echo -e "${GREEN}✅ WebSocket listening on ws://localhost:4000/stream${NC}"

# Start the CLI monitor
echo -e "${BLUE}Starting terminal monitor...${NC}"
cd apps/cli-tool

# Build if needed
if [ ! -f "dist/ink-app.js" ]; then
    echo "Building CLI tool..."
    bun run build
fi

echo -e "${GREEN}🖥️  Launching Claude Monitor Terminal UI...${NC}"
echo -e "${YELLOW}Controls: [q]uit [f]ilter [r]econnect${NC}"
echo ""

# Run the enhanced Ink-based monitor
node dist/ink-app.js