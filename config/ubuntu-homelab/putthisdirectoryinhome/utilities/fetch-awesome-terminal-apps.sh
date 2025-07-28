#!/bin/bash

# Fetch Awesome Terminal Apps List
# This script downloads and maintains a local copy of awesome terminal apps

DOCS_DIR="/home/wv3/tmux-scripts/docs"
AWESOME_FILE="$DOCS_DIR/awesome-terminal-apps.txt"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=== Awesome Terminal Apps Fetcher ===${NC}"
echo

# Create docs directory if it doesn't exist
mkdir -p "$DOCS_DIR"

# Check if gitingest is installed
if ! command -v gitingest &> /dev/null; then
    echo -e "${YELLOW}GitIngest not found. Please install it:${NC}"
    echo -e "${GREEN}pipx install gitingest${NC}"
    exit 1
fi

# Main awesome-cli-apps repository
echo -e "${GREEN}Fetching awesome-cli-apps...${NC}"
gitingest https://github.com/agarrharr/awesome-cli-apps -o "$AWESOME_FILE"

# Also get the CSV version for easier parsing
echo -e "${GREEN}Fetching CLI apps CSV version...${NC}"
gitingest https://github.com/toolleeo/cli-apps -i "*.csv,README.md" -o "$DOCS_DIR/cli-apps-csv.txt"

# Get some other awesome lists
echo -e "${GREEN}Fetching additional awesome lists...${NC}"

# Awesome Shell
gitingest https://github.com/alebcay/awesome-shell -o "$DOCS_DIR/awesome-shell.txt"

# Awesome Terminal
gitingest https://github.com/saehun/awesome-terminal -o "$DOCS_DIR/awesome-terminal.txt"

# Create a quick reference
echo -e "${GREEN}Creating quick reference...${NC}"
cat > "$DOCS_DIR/terminal-apps-quickref.md" << 'EOF'
# Terminal Apps Quick Reference

## Essential Tools

### File Management
- **ranger** - VI-inspired file manager
- **nnn** - Blazing fast file browser
- **fzf** - Fuzzy finder for everything
- **ripgrep (rg)** - Fast grep alternative
- **fd** - Fast find alternative

### System Monitoring
- **htop** - Interactive process viewer
- **btop** - Resource monitor
- **ncdu** - Disk usage analyzer
- **glances** - System monitoring tool

### Development
- **tig** - Text-mode interface for git
- **lazygit** - Simple terminal UI for git
- **gh** - GitHub CLI
- **httpie** - Modern curl alternative
- **jq** - JSON processor

### Productivity
- **tmux** - Terminal multiplexer
- **taskwarrior** - TODO list manager
- **calcurse** - Calendar and scheduling
- **nb** - Note-taking and bookmarking

### Media & Entertainment
- **musikcube** - Terminal music player
- **mpv** - Media player
- **youtube-dl** - Download videos
- **asciinema** - Record terminal sessions

### Communication
- **weechat** - IRC client
- **neomutt** - Email client
- **newsboat** - RSS reader

### Fun & Games
- **cmatrix** - Matrix rain
- **sl** - Steam locomotive
- **cowsay** - Talking cow
- **lolcat** - Rainbow text

## Installation Commands

```bash
# Ubuntu/Debian
sudo apt install ranger htop tmux fzf ripgrep

# Install more tools
sudo apt install ncdu tig jq httpie newsboat

# Via pip
pip install asciinema youtube-dl glances

# Via snap
sudo snap install musikcube
```

## Full Lists Location
- Main list: /home/wv3/tmux-scripts/docs/awesome-terminal-apps.txt
- CSV version: /home/wv3/tmux-scripts/docs/cli-apps-csv.txt
- Shell tools: /home/wv3/tmux-scripts/docs/awesome-shell.txt
EOF

echo
echo -e "${BLUE}=== Download Complete! ===${NC}"
echo
echo -e "Files saved to: ${YELLOW}$DOCS_DIR${NC}"
echo -e "Quick reference: ${YELLOW}$DOCS_DIR/terminal-apps-quickref.md${NC}"
echo
echo -e "${GREEN}View the main list:${NC} less $AWESOME_FILE"
echo -e "${GREEN}View quick reference:${NC} cat $DOCS_DIR/terminal-apps-quickref.md"