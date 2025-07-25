# Local Setup - Basic System

> **Core observability system with configuration management**

## What This System Does

**Real-time monitoring** of all your Claude Code sessions across every project with **centralized configuration management**.

- Hook into every Claude Code action
- Store events in SQLite database  
- Live dashboard shows everything in real-time
- Manage `.claude` configs across all projects with zsh commands

## Core Components

```
apps/
├── server/     # Bun + TypeScript + SQLite
├── client/     # Vue.js dashboard  
└── cli-tool/   # Terminal monitoring (planned)

.claude/
├── hooks/      # Python scripts that capture events
├── commands/   # Custom Claude commands (.md files)
└── settings.json  # Hook configuration

Config management via zsh functions (cc-jw, cc-u, etc.)
```

## Prerequisites 

- macOS with zsh
- Homebrew
- Node.js/npm
- Python 3.8+

## Quick Install

```bash
# 1. Install dependencies
brew install git sqlite3 python@3.11 node npm
npm install -g @anthropic-ai/claude-code
curl -LsSf https://astral.sh/uv/install.sh | sh
curl -fsSL https://bun.sh/install | bash

# 2. Set environment variables
export ANTHROPIC_API_KEY="your_key"
export OPENAI_API_KEY="your_key"      # optional
export ELEVENLABS_API_KEY="your_key"  # optional

# 3. Clone and setup
git clone <repo> claude-observability
cd claude-observability

# 4. Install server/client
cd apps/server && bun install
cd ../client && bun install

# 5. Start system
./scripts/start-system.sh

# 6. Open http://localhost:5173
```

## How It Works

### Data Flow
```
Claude Code Action → Hook Script → HTTP POST → Server → SQLite → WebSocket → Dashboard
```

### Hook Events
- **PreToolUse** - Before tool runs
- **PostToolUse** - After tool completes  
- **UserPromptSubmit** - User sends message
- **Notification** - Claude wants user input
- **Stop** - Session ends
- **SubagentStop** - Subagent completes

### Configuration Management
- `cc-jw` - Copy master `.claude` to current project
- `cc-u` - Pull new commands selectively
- `cc-gather` - Harvest commands from all projects
- `cc-u-hooks` - Update hooks with diff preview
- `cc-u-hooks-global` - Update all project hooks
- `cc-u-settings-global` - Sync settings everywhere

## Using the System

### Setup New Project
```bash
cd /path/to/project
cc-jw  # Copies complete .claude setup
claude # Start Claude Code - events now stream to dashboard
```

### Monitor Activity
- Dashboard: `http://localhost:5173`
- Filter by app, session, event type
- Live pulse chart shows activity
- Click events to see chat transcripts

### Develop Commands
```bash
# Create command in any project
echo "# New Command" > .claude/commands/my-tool.md

# Harvest to master
cc-gather

# Deploy to other projects  
cd other-project && cc-u
```

### Update All Projects
```bash
cc-u-hooks-global    # Sync hooks everywhere
cc-u-settings-global # Sync settings everywhere
```

## Configuration Management System

This system includes powerful zsh functions that enable centralized development and distribution of Claude Code configurations across all your projects.

### Command Reference

| Command | Purpose | Description |
|---------|---------|-------------|
| `cc-jw` | **Initialize new project** | Copies entire master .claude directory to current location |
| `cc-u` | **Pull commands selectively** | Shows only NEW commands, multi-select interface |
| `cc-gather` | **Harvest new commands** | Scans entire willycode directory for new .md files |
| `cc-u-hooks` | **Update current project hooks** | Shows diff and updates hooks with confirmation |
| `cc-ug-hooks` | **Update all project hooks** | Batch updates all projects to match master hooks |
| `cc-ug-settings` | **Update all settings.json** | Propagates master configuration everywhere |

### How It Works

**Innovation Loop:**
```
Create .md command → cc-gather → Master updated → cc-u → Deploy to other projects
Master hooks modified → cc-u-hooks-global → All projects updated
Master settings.json → cc-u-settings-global → All projects synchronized
```

**Safety Features:**
- No accidental overwrites (commands only add new files to master)
- Preview changes (hook updates show diffs before applying)
- Selective sync (choose specific commands to pull)
- Backup creation (settings.json updates create .backup files)
- Confirmation prompts for destructive operations

### Workflow Examples

**New Project Setup:**
```bash
cd ~/projects/new-app
cc-jw  # Full .claude setup copied
# Ready to work with consistent hooks and commands
```

**Command Development:**
```bash
# In any project, create a useful command
echo "# Deploy Script\nBuilds and deploys the app" > .claude/commands/deploy.md

# Harvest it to master (from anywhere)
cc-gather

# Deploy to other projects
cd ~/projects/other-app
cc-u  # Interactive selection of new commands
```

**Global Updates:**
```bash
# Update hooks across ALL projects with diff preview
cc-u-hooks-global

# Sync settings.json across ALL projects (creates backups)
cc-u-settings-global

# Your entire ecosystem is now synchronized
```

### Directory Structure

```
Master Configuration:
claude-code-hooks-multi-agent-observability/.claude/
├── commands/     # Custom Claude commands (.md files)
├── hooks/        # Event hooks for monitoring
└── settings.json # Hook configuration

Project Configurations:
[any_project]/.claude/
├── commands/     # Synced from master + project-specific
├── hooks/        # Updated from master
└── settings.json # Propagated from master
```

### Key Benefits

- **Centralized Innovation**: Any project can contribute commands that benefit all projects
- **Distributed Execution**: Same hooks run everywhere, report to single observability server
- **Safe Operations**: Diff previews, confirmations, and backups prevent accidents
- **Ecosystem Management**: Single command updates your entire development environment

## Key Features

**Real-time Observability:**
- Every Claude action captured and displayed
- Session tracking across multiple projects
- Live charts and filtering
- Chat transcript storage

**Configuration Management:**
- Centralized command development
- Safe deployment with diff previews
- Selective updates and harvesting
- Backup creation for safety

**Multi-Project Support:**
- Single dashboard monitors everything
- Consistent hooks across all projects
- Innovation sharing between projects
- Unified event storage

## File Structure

```
claude-observability/
├── apps/
│   ├── server/src/
│   │   ├── index.ts    # HTTP/WebSocket server
│   │   ├── db.ts       # SQLite management
│   │   └── types.ts    # Event interfaces
│   └── client/src/
│       ├── App.vue     # Main dashboard
│       └── components/
├── .claude/
│   ├── hooks/          # Event capture scripts  
│   ├── commands/       # Custom commands
│   └── settings.json   # Hook configuration
└── scripts/
    ├── start-system.sh # Launch server + client
    └── test-system.sh  # Verify everything works
```

## What You Get

- **Complete visibility** into Claude Code usage
- **Centralized management** of configurations
- **Real-time dashboard** with filtering and charts
- **Safe deployment** of updates across projects
- **Voice notifications** when tasks complete (optional)
- **Chat transcript** capture and viewing

Simple, powerful, and scales across your entire development ecosystem.