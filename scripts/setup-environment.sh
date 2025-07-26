#!/bin/bash

# Claude Code Environment Setup Script
# Ensures all dependencies are installed before first run

ECOSYSTEM_HOME="${CLAUDE_ECOSYSTEM_HOME:-/home/v3/ai-infra-stack/claude-code-work}"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Claude Code Environment Setup ===${NC}"
echo ""

# Check Node.js
echo -e "${YELLOW}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js not found! Please install Node.js 18+${NC}"
    exit 1
fi
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${RED}Node.js version too old. Please install Node.js 16+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm not found!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Install dependencies for each component
components=(
    "apps/server:Observability Server"
    "apps/blessed-monitor:Blessed CLI Monitor"
    "apps/client:Vue Dashboard"
    "apps/cli-tool:Ink CLI Tool (optional)"
)

for component in "${components[@]}"; do
    IFS=':' read -r path name <<< "$component"
    echo ""
    echo -e "${YELLOW}Installing dependencies for ${name}...${NC}"
    
    if [ -d "$ECOSYSTEM_HOME/$path" ]; then
        cd "$ECOSYSTEM_HOME/$path"
        if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
            npm install
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✓ ${name} dependencies installed${NC}"
            else
                echo -e "${RED}✗ Failed to install ${name} dependencies${NC}"
            fi
        else
            echo -e "${GREEN}✓ ${name} dependencies already installed${NC}"
        fi
    else
        echo -e "${YELLOW}⚠ ${name} directory not found at $path${NC}"
    fi
done

# Create necessary directories
echo ""
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p "$ECOSYSTEM_HOME/logs"
echo -e "${GREEN}✓ Logs directory created${NC}"

# Check for optional tools
echo ""
echo -e "${BLUE}Optional tools:${NC}"

# Check tmux
if command -v tmux &> /dev/null; then
    echo -e "${GREEN}✓ tmux installed${NC}"
else
    echo -e "${YELLOW}⚠ tmux not found (needed for multi-view)${NC}"
    echo "  Install with: sudo apt install tmux"
fi

# Check ranger
if command -v ranger &> /dev/null; then
    echo -e "${GREEN}✓ ranger installed${NC}"
else
    echo -e "${YELLOW}⚠ ranger not found (file explorer in tmux)${NC}"
    echo "  Install with: sudo apt install ranger"
fi

# Check curl
if command -v curl &> /dev/null; then
    echo -e "${GREEN}✓ curl installed${NC}"
else
    echo -e "${YELLOW}⚠ curl not found${NC}"
    echo "  Install with: sudo apt install curl"
fi

echo ""
echo -e "${GREEN}=== Setup Complete! ===${NC}"
echo ""
echo "Next steps:"
echo "1. Start the server: cd apps/server && npm start"
echo "2. Run the multi-view: ./scripts/tmux-multi-view.sh"
echo "3. Or run components individually"
echo ""
echo "For more info, see the README.md"