#!/bin/bash

# Git Worktrees + Cursor Setup Script for macOS/Zsh
# Based on the multi-agent Claude Code workflow
# Usage: ./setup-worktree.sh <branch-name>

set -e

if [ $# -eq 0 ]; then
    echo "Usage: $0 <branch-name>"
    echo "Example: $0 feature-authentication"
    exit 1
fi

BRANCH_NAME="$1"

# Get the current project directory name
PROJECT_DIR=$(basename "$(pwd)")
echo "📁 Current project: $PROJECT_DIR"

# Get the parent directory (one level up)
PARENT_DIR=$(dirname "$(pwd)")

# Create worktrees directory adjacent to current project
WORKTREES_DIR="$PARENT_DIR/${PROJECT_DIR}-worktrees"
echo "🌳 Worktrees directory: $WORKTREES_DIR"

# Create worktrees directory if it doesn't exist
if [ ! -d "$WORKTREES_DIR" ]; then
    echo "Creating worktrees directory..."
    mkdir -p "$WORKTREES_DIR"
fi

# Create the worktree path
WORKTREE_PATH="$WORKTREES_DIR/$BRANCH_NAME"

# Check if worktree already exists
if [ -d "$WORKTREE_PATH" ]; then
    echo "❌ Worktree '$BRANCH_NAME' already exists at $WORKTREE_PATH"
    echo "Would you like to remove it and recreate? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Removing existing worktree..."
        git worktree remove "$WORKTREE_PATH" 2>/dev/null || rm -rf "$WORKTREE_PATH"
    else
        echo "Aborting..."
        exit 1
    fi
fi

# Create git worktree with new branch
echo "🌿 Creating git worktree with branch '$BRANCH_NAME'..."
git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"

# Copy important configuration files
echo "📋 Copying configuration files..."

# Copy .env file if it exists
if [ -f ".env" ]; then
    cp ".env" "$WORKTREE_PATH/"
    echo "✅ Copied .env"
fi

# Copy .env.local if it exists
if [ -f ".env.local" ]; then
    cp ".env.local" "$WORKTREE_PATH/"
    echo "✅ Copied .env.local"
fi

# Copy Claude configuration
if [ -d ".claude" ]; then
    cp -r ".claude" "$WORKTREE_PATH/"
    echo "✅ Copied .claude directory"
fi

# Copy Cursor configuration
if [ -d ".cursor" ]; then
    cp -r ".cursor" "$WORKTREE_PATH/"
    echo "✅ Copied .cursor directory"
fi

# Copy VS Code configuration
if [ -d ".vscode" ]; then
    cp -r ".vscode" "$WORKTREE_PATH/"
    echo "✅ Copied .vscode directory"
fi

# Copy other common hidden files/directories
for item in ".nvmrc" ".node-version" ".ruby-version" ".python-version" ".gitignore.local"; do
    if [ -f "$item" ]; then
        cp "$item" "$WORKTREE_PATH/"
        echo "✅ Copied $item"
    fi
done

echo ""
echo "🎉 Worktree '$BRANCH_NAME' created successfully!"
echo "📍 Location: $WORKTREE_PATH"
echo ""

# Open in Cursor if available
if command -v cursor >/dev/null 2>&1; then
    echo "🚀 Opening in Cursor..."
    cursor "$WORKTREE_PATH"
else
    echo "💡 Cursor not found. You can manually open: $WORKTREE_PATH"
fi

# Show worktree list
echo ""
echo "📋 Current worktrees:"
git worktree list

echo ""
echo "🔗 Next steps:"
echo "1. The worktree is now open in Cursor (if available)"
echo "2. Open a terminal in the new worktree directory"
echo "3. Run 'claude' to start Claude Code in the isolated environment"
echo "4. Start your development server on a different port (e.g., 3001, 3002, etc.)"
echo ""
echo "💡 To remove this worktree later: git worktree remove $WORKTREE_PATH"