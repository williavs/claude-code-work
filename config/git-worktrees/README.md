# Git Worktrees Multi-Agent Setup

This directory contains shell functions to automate the git worktrees workflow for running multiple Claude Code agents in parallel, as demonstrated in the YouTube video about Claude Code multi-agent workflows.

## Overview

Git worktrees allow you to check out multiple branches from the same repository into separate directories. This enables you to:

- Run multiple Claude Code agents simultaneously on different branches
- Work on different features in parallel without conflicts
- Maintain isolated development environments
- Keep your main branch clean while agents work

## Available Configurations

### 1. macOS with Zsh + Cursor (`zsh-cursor/`)
- **File**: `zshrc-function.zsh`
- **Environment**: macOS with Zsh shell and Cursor editor
- **Features**: Automatically opens worktrees in Cursor

### 2. Ubuntu with Tmux (`ubuntu-tmux/`)
- **File**: `bashrc-function.sh`
- **Environment**: Ubuntu/Linux with tmux and terminal editors
- **Features**: Creates tmux sessions and windows for worktrees

## Quick Start

1. Choose your configuration based on your environment
2. Copy the appropriate function to your shell configuration file
3. Reload your shell or source the file
4. Use `wt <branch-name>` to create worktrees

## Commands Available

All configurations provide these commands:

- `wt <branch-name>` - Create a new worktree and branch
- `wtls` - List all current worktrees
- `wtrm <branch-name>` - Remove a worktree

Additional commands vary by configuration (see individual setup guides below).

---

## macOS + Zsh + Cursor Setup

### Installation

1. Copy the contents of `zsh-cursor/zshrc-function.zsh` to your `~/.zshrc` file:

```bash
cat config/git-worktrees/zsh-cursor/zshrc-function.zsh >> ~/.zshrc
```

2. Reload your shell:

```bash
source ~/.zshrc
```

### Usage

```bash
# Create a new worktree
wt feature-authentication

# List worktrees
wtls

# Remove a worktree
wtrm feature-authentication
```

### What it does

1. Creates a `<project>-worktrees` directory adjacent to your project
2. Creates a git worktree with a new branch
3. Copies important config files (.env, .claude, .cursor, etc.)
4. Opens the worktree in Cursor automatically
5. Provides instructions for next steps

### Requirements

- macOS
- Zsh shell
- Cursor editor (optional but recommended)
- Git with worktree support

---

## Ubuntu + Tmux Setup

### Installation

1. Copy the contents of `ubuntu-tmux/bashrc-function.sh` to your `~/.bashrc` or `~/.zshrc`:

```bash
cat config/git-worktrees/ubuntu-tmux/bashrc-function.sh >> ~/.bashrc
```

2. Reload your shell:

```bash
source ~/.bashrc
```

### Usage

```bash
# Create a new worktree (basic)
wt feature-authentication

# Create a new worktree with tmux session
wttmux feature-authentication

# List worktrees
wtls

# Remove a worktree (also kills tmux session)
wtrm feature-authentication
```

### What it does

1. Creates a `<project>-worktrees` directory adjacent to your project
2. Creates a git worktree with a new branch
3. Copies important config files (.env, .claude, .vscode, etc.)
4. If in tmux: creates new window with split panes (editor + terminal)
5. If not in tmux: provides instructions to create tmux session

### Tmux Integration

The Ubuntu version provides enhanced tmux integration:

- **`wt`**: Creates worktree and tmux window if in session
- **`wttmux`**: Creates dedicated tmux session for worktree with:
  - Main window: split with editor (left) and terminal (right)
  - Server window: for running development server
  - Claude window: for running Claude Code

### Requirements

- Ubuntu/Linux
- Bash or Zsh shell
- Tmux (for enhanced workflow)
- Git with worktree support
- Your preferred terminal editor (vim, nano, etc.)

---

## Workflow Example

Based on the YouTube tutorial, here's how to use this for multi-agent development:

1. **Start in your main project directory**
```bash
cd my-project
```

2. **Create multiple worktrees for different features**
```bash
wt add-authentication
wt add-payment
wt fix-bugs
```

3. **Each worktree gets its own environment**
- Separate file copies
- Isolated git branches
- Own development server ports
- Independent Claude Code instances

4. **Work in parallel**
- Run Claude Code in each worktree
- Use different ports for dev servers (3001, 3002, 3003)
- Let each agent work independently

5. **Merge back to main when complete**
```bash
git checkout main
git merge add-authentication
git merge add-payment  
git merge fix-bugs
```

6. **Clean up worktrees**
```bash
wtrm add-authentication
wtrm add-payment
wtrm fix-bugs
```

## Tips and Best Practices

1. **Port Management**: Use different ports for dev servers in each worktree
2. **Environment Files**: The script automatically copies .env files
3. **Configuration Sync**: All editor and tool configs are copied to worktrees
4. **Branch Naming**: Use descriptive branch names for easy identification
5. **Regular Cleanup**: Remove unused worktrees to save disk space

## Troubleshooting

### Common Issues

1. **"Not a git repository"**: Make sure you're in a git repository
2. **"Branch already exists"**: Use a different branch name or remove existing branch
3. **"Cursor not found"**: Install Cursor or manually open the directory
4. **Permission errors**: Ensure you have write permissions in parent directory

### Getting Help

```bash
# List current worktrees
git worktree list

# Remove stuck worktree
git worktree remove /path/to/worktree --force

# Check git status
git status
```

## Contributing

Feel free to customize these functions for your specific workflow. Common customizations:

- Add support for different editors
- Modify which config files get copied
- Change tmux window layout
- Add project-specific setup commands