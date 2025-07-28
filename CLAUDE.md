# Claude Code Environment Configuration

## System Overview
This is a terminal-only Ubuntu environment (Linux 6.8.0-64-generic) with no GUI or mouse support. All interactions and deployments must be designed for keyboard/terminal use only.

## Important Environment Constraints
- **NO GUI AVAILABLE**: This is a headless Ubuntu system - everything must work in the terminal
- **NO MOUSE**: All applications and tools must be keyboard-navigable
- **Terminal-First Development**: When building applications, ensure they can be managed entirely through terminal interfaces

## Tmux-Based Workflow

### Primary Tool: tmux-wizard.sh
Located at `/home/wv3/tmux-scripts/tmux-wizard.sh`, this is the main interface for creating development sessions:
- Interactive wizard for session configuration
- Supports 1-10 pane layouts with automatic arrangement
- Can create new projects with AI infrastructure (copies `.claude` directory)
- Saves custom view configurations for reuse

### Available Applications in Tmux
1. Claude Code (normal mode)
2. Claude Flow (specialized directory)
3. Tmux Orchestrator
4. Carbonyl (terminal browser with better rendering)
5. Lynx (simple terminal browser)
6. Ranger (file manager - configured to show hidden files)
7. htop (system monitor)
8. Blessed Monitor (event monitor on port 4000)
9. Custom commands

### Key Scripts
- **send-claude-message.sh**: Send messages to Claude agents in tmux windows
- **tmux-multi-view.sh**: Pre-configured multi-agent monitoring setup
- **start-system.sh**: Launches Multi-Agent Observability System (Bun-based)
- **schedule_with_note.sh**: Dynamic task scheduler with note files

## Service Deployment Patterns

### Hybrid Deployment Strategy
Services are deployed using a mix of tmux sessions and Docker containers:

1. **Development Services**: Run in tmux sessions
   - Easy debugging and real-time monitoring
   - Direct access to logs and console output
   - Quick restart and modification

2. **Production Services**: Deploy via Docker
   - Better isolation and reproducibility
   - Use docker-compose for multi-service stacks
   - Note: User needs sudo for Docker commands (not in docker group)

### Active Infrastructure
- **Cloudflare Tunnel**: Already configured and running (DO NOT MODIFY)
- **Common Ports**: 3000, 3456, 4000, 5173, 8080 - - - -Although "uncommon' ports are preferred for deployment for scalahbility
- **Runtime**: Primarily Node.js/Bun for performance

## Development Commands

### Testing & Linting
Always run these commands after making changes:
```bash
# Node.js projects
npm run lint
npm run typecheck
npm test

# Python projects
ruff check .
pytest

# General
# Check package.json or project docs for specific commands
```

### Git Workflow
- Main branch: `main`
- Current working directory: `/home/wv3/claude-code-work`
- This is a git repository

## AI Agent System

### Agent Categories
- **Core Development**: Coder, Planner, Researcher, Tester, Reviewer
- **GitHub Integration**: PR Manager, Issue Tracker, Release Manager
- **SPARC Methodology**: Architecture, Specification, Pseudocode, Refinement
- **Swarm Coordination**: Hierarchical, Mesh, and Adaptive topologies
- **DevOps**: CI/CD, Docker-Cloudflare management
- **Specialized**: Mobile dev, ML/Data, Testing specialists

### Agent Activation
- Use natural language - agents auto-select based on context
- Complex tasks automatically spawn coordinator agents
- Parallel execution for independent tasks

## Terminal Application Resources
Extensive documentation available in `/home/wv3/tmux-scripts/docs/`:
- `terminal-apps-quickref.md`: Essential terminal tools reference
- `awesome-terminal-apps.txt`: Comprehensive application list
- `cli-apps-csv.txt`: Programmatic access to app database

## Quick Start Commands
```bash
# Create new tmux session with wizard
~/tmux-scripts/tmux-wizard.sh

# Start multi-agent monitoring
~/tmux-scripts/tmux-multi-view.sh

# Send message to Claude in tmux
~/tmux-scripts/orchestration/send-claude-message.sh <session:window> <message>

# Start observability system
~/tmux-scripts/system/start-system.sh
```

## Best Practices
1. Always work within tmux sessions for persistence
2. Use terminal browsers (Carbonyl/Lynx) when web access needed
3. Leverage the multi-agent system for complex tasks
4. Save useful tmux configurations as view scripts
5. Monitor services using Blessed Monitor or htop
6. For new projects, use tmux-wizard to set up AI infrastructure

## Notes
- File paths must be absolute when using tools
- The system has comprehensive monitoring and orchestration capabilities
- Multiple Claude agents can run simultaneously for parallel work
- All UI must be keyboard-navigable - no mouse dependencies
