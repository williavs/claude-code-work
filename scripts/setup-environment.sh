#!/bin/bash

# Claude Code Environment Setup Script
# Ensures all dependencies are installed before first run

ECOSYSTEM_HOME="${CLAUDE_ECOSYSTEM_HOME:-$(pwd)}"

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Claude Code Environment Setup ===${NC}"
echo ""

# Check Python (required for hooks)
echo -e "${YELLOW}Checking Python...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python3 not found! Please install Python 3.8+${NC}"
    echo "  Install with: sudo apt install python3 python3-pip"
    exit 1
fi
PYTHON_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo -e "${GREEN}✓ Python $PYTHON_VERSION${NC}"

# Check uv (required for hooks)
echo -e "${YELLOW}Checking uv (Python package manager)...${NC}"
if ! command -v uv &> /dev/null; then
    echo -e "${YELLOW}uv not found! Installing...${NC}"
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.cargo/bin:$PATH"
    if ! command -v uv &> /dev/null; then
        echo -e "${RED}Failed to install uv${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✓ uv $(uv --version | cut -d' ' -f2)${NC}"

# Check Node.js
echo -e "${YELLOW}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js not found! Please install Node.js 18+${NC}"
    echo "  Install with: curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs"
    exit 1
fi
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Node.js version too old. Please install Node.js 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm not found!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Check Bun (preferred for server)
echo -e "${YELLOW}Checking Bun...${NC}"
if ! command -v bun &> /dev/null; then
    echo -e "${YELLOW}Bun not found! Installing...${NC}"
    curl -fsSL https://bun.sh/install | bash
    export PATH="$HOME/.bun/bin:$PATH"
    if ! command -v bun &> /dev/null; then
        echo -e "${RED}Failed to install Bun${NC}"
        echo "  You can continue with npm, but Bun is recommended"
    else
        echo -e "${GREEN}✓ Bun installed successfully${NC}"
    fi
else
    echo -e "${GREEN}✓ Bun $(bun --version)${NC}"
fi

# Install dependencies for each component
components=(
    "apps/server:Observability Server:bun"
    "apps/blessed-monitor:Blessed CLI Monitor:npm"
    "apps/client:Vue Dashboard:bun"
)

for component in "${components[@]}"; do
    IFS=':' read -r path name pkg_manager <<< "$component"
    echo ""
    echo -e "${YELLOW}Installing dependencies for ${name}...${NC}"
    
    if [ -d "$ECOSYSTEM_HOME/$path" ]; then
        cd "$ECOSYSTEM_HOME/$path"
        
        # Check if dependencies need to be installed
        if [ ! -d "node_modules" ]; then
            if [ "$pkg_manager" = "bun" ] && command -v bun &> /dev/null; then
                echo "  Using Bun..."
                bun install
            else
                echo "  Using npm..."
                npm install
            fi
            
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
echo "Next step:"
echo "  Run: ${YELLOW}./scripts/tmux-multi-view.sh${NC}"
echo ""
echo "This will start:"
echo "  • Observability server (port 4000)"
echo "  • Vue dashboard (port 5173)"
echo "  • Blessed CLI monitor"
echo "  • Multiple Claude agents"
echo "  • File explorer"
echo ""
echo "Make sure you have Claude Code installed and configured!"