# Claude Code Multi-Agent Ecosystem Integration Plan

## Vision
Create a unified development environment that leverages all tools together on Ubuntu server.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Ubuntu Server Environment                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐     ┌──────────────────┐              │
│  │ Tmux Orchestrator│     │ Claude Code Router│              │
│  │  (Session Mgmt)  │────▶│  (Model Switching)│              │
│  └─────────────────┘     └──────────────────┘              │
│           │                        │                          │
│           ▼                        ▼                          │
│  ┌─────────────────┐     ┌──────────────────┐              │
│  │   CLI Monitor    │     │   Claude Flow    │              │
│  │   (Ink-based)    │────▶│  (64 Agents)     │              │
│  └─────────────────┘     └──────────────────┘              │
│           │                        │                          │
│           └────────────┬───────────┘                         │
│                        ▼                                      │
│              ┌─────────────────┐                            │
│              │ Version Control  │                            │
│              │   (Git Hooks)    │                            │
│              └─────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

## Priority Tasks

### 1. CLI Tool Cleanup (HIGH PRIORITY)

**Current State:**
- Two UI approaches: blessed + ink
- Streaming UI issues
- Considering charmbracelet/bubbletea (Go-based)

**Decision:**
- **KEEP**: Ink.js approach (React-based, good ecosystem)
- **REMOVE**: Blessed approach (older, more complex)
- **AVOID**: Bubbletea (requires Go, adds complexity on Ubuntu)

**Why Ink.js for Ubuntu:**
- Node.js is universally available
- No special terminal requirements
- React patterns = easier maintenance
- Works over SSH without issues

### 2. Tool Integration Workflow

```bash
# Ultimate workflow combining all tools:

# 1. Start tmux orchestrator with multiple windows
tmux-orchestrator start

# 2. In window 1: Start Claude Code with router
claude-code-router --model claude-opus-4

# 3. In window 2: Start CLI monitor
claude-monitor --ink

# 4. In window 3: Use claude-flow agents
claude --agents

# 5. Git worktrees for parallel development
wt feature-branch
```

### 3. Ubuntu Server Setup Script

```bash
#!/bin/bash
# setup-ubuntu-claude-env.sh

# Install dependencies
sudo apt-get update
sudo apt-get install -y nodejs npm tmux git

# Setup directory structure
mkdir -p ~/claude-env/{logs,config,workspace}

# Clone and setup each tool
cd ~/claude-env
git clone [your-repo] multi-agent-tools
cd multi-agent-tools

# Install CLI tool (ink version only)
cd apps/cli-tool
npm install
npm run build

# Setup claude-flow agents
cp -r claude-flow/.claude ~/

# Configure tmux
cp config/ubuntu-tmux/bashrc-function.sh ~/.claude-tmux-config
echo "source ~/.claude-tmux-config" >> ~/.bashrc

# Setup git worktrees function
cat config/git-worktrees/ubuntu-tmux/bashrc-function.sh >> ~/.bashrc

echo "Claude multi-agent environment ready!"
```

## Next Steps Priority Order

1. **Clean CLI Tool** (2-3 hours)
   - Remove blessed code
   - Fix ink streaming
   - Test on Ubuntu

2. **Test Integration** (1-2 hours)
   - Verify all tools work together
   - Document any conflicts
   - Create unified launcher

3. **Create Orchestration Script** (1 hour)
   - Single command to start everything
   - Proper error handling
   - Status monitoring

4. **Test Version Control** (30 mins)
   - Verify git hooks work
   - Test with actual workflow
   - Document usage

## Key Insight: Simplicity Over Features

Your instinct is correct - make it STABLE, not feature-rich. The power comes from these tools working together reliably, not from adding more complexity.

## Recommended Tech Stack for Ubuntu

- **UI**: Ink.js (React-based TUI)
- **Process Management**: Tmux (native, reliable)
- **Runtime**: Node.js (universal)
- **Shell**: Bash (not zsh for server)
- **Monitoring**: Simple logs + ink dashboard

This avoids exotic dependencies while maximizing compatibility.