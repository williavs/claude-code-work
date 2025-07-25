# Git Worktrees + Tmux Function for Ubuntu
# Add this to your ~/.bashrc or ~/.zshrc file
# Usage: wt <branch-name>
# Example: wt feature-authentication

wt() {
    # Check if branch name is provided
    if [ -z "$1" ]; then
        echo "Usage: wt <branch-name>"
        echo "Example: wt feature-authentication"
        return 1
    fi

    local branch_name="$1"
    
    # Get the current project directory name
    local project_dir=$(basename "$(pwd)")
    echo "📁 Current project: $project_dir"
    
    # Get the parent directory (one level up)
    local parent_dir=$(dirname "$(pwd)")
    
    # Create worktrees directory adjacent to current project
    local worktrees_dir="$parent_dir/${project_dir}-worktrees"
    echo "🌳 Worktrees directory: $worktrees_dir"
    
    # Create worktrees directory if it doesn't exist
    if [ ! -d "$worktrees_dir" ]; then
        echo "Creating worktrees directory..."
        mkdir -p "$worktrees_dir"
    fi
    
    # Create the worktree path
    local worktree_path="$worktrees_dir/$branch_name"
    
    # Check if worktree already exists
    if [ -d "$worktree_path" ]; then
        echo "❌ Worktree '$branch_name' already exists at $worktree_path"
        echo "Would you like to remove it and recreate? (y/N)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            echo "Removing existing worktree..."
            git worktree remove "$worktree_path" 2>/dev/null || rm -rf "$worktree_path"
        else
            echo "Aborting..."
            return 1
        fi
    fi
    
    # Create git worktree with new branch
    echo "🌿 Creating git worktree with branch '$branch_name'..."
    git worktree add "$worktree_path" -b "$branch_name"
    
    # Copy important configuration files
    echo "📋 Copying configuration files..."
    
    # Copy .env file if it exists
    if [ -f ".env" ]; then
        cp ".env" "$worktree_path/"
        echo "✅ Copied .env"
    fi
    
    # Copy .env.local if it exists
    if [ -f ".env.local" ]; then
        cp ".env.local" "$worktree_path/"
        echo "✅ Copied .env.local"
    fi
    
    # Copy Claude configuration
    if [ -d ".claude" ]; then
        cp -r ".claude" "$worktree_path/"
        echo "✅ Copied .claude directory"
    fi
    
    # Copy VS Code configuration
    if [ -d ".vscode" ]; then
        cp -r ".vscode" "$worktree_path/"
        echo "✅ Copied .vscode directory"
    fi
    
    # Copy Vim/Neovim configuration
    if [ -f ".vimrc" ]; then
        cp ".vimrc" "$worktree_path/"
        echo "✅ Copied .vimrc"
    fi
    
    if [ -d ".vim" ]; then
        cp -r ".vim" "$worktree_path/"
        echo "✅ Copied .vim directory"
    fi
    
    # Copy other common hidden files/directories
    for item in ".nvmrc" ".node-version" ".ruby-version" ".python-version" ".gitignore.local"; do
        if [ -f "$item" ]; then
            cp "$item" "$worktree_path/"
            echo "✅ Copied $item"
        fi
    done
    
    echo ""
    echo "🎉 Worktree '$branch_name' created successfully!"
    echo "📍 Location: $worktree_path"
    echo ""
    
    # Check if we're in a tmux session
    if [ -n "$TMUX" ]; then
        # Get current session name
        local session_name=$(tmux display-message -p '#S')
        local window_name="${project_dir}-${branch_name}"
        
        echo "🖥️  Creating new tmux window: $window_name"
        
        # Create new window and change to worktree directory
        tmux new-window -n "$window_name" -c "$worktree_path"
        
        # Optional: split the window to have editor and terminal
        tmux split-window -h -c "$worktree_path"
        tmux select-pane -t 0
        
        # Start editor in left pane (adjust based on your preferred editor)
        local editor="${EDITOR:-vim}"
        tmux send-keys -t 0 "$editor ." C-m
        
        # Focus on the new window
        tmux select-window -t "$window_name"
        
        echo "✅ Created tmux window '$window_name' in session '$session_name'"
        echo "💡 Left pane: $editor, Right pane: terminal"
        
    else
        echo "💡 Not in a tmux session. You can manually:"
        echo "   1. cd $worktree_path"
        echo "   2. Start your editor"
        echo "   3. Run 'claude' in the terminal"
        echo ""
        echo "🖥️  Or create a new tmux session:"
        echo "   tmux new-session -s $branch_name -c $worktree_path"
    fi
    
    # Show worktree list
    echo ""
    echo "📋 Current worktrees:"
    git worktree list
    
    echo ""
    echo "🔗 Next steps:"
    echo "1. Navigate to the worktree: cd $worktree_path"
    echo "2. Run 'claude' to start Claude Code in the isolated environment"
    echo "3. Start your development server on a different port"
    echo ""
    echo "💡 To remove this worktree later: git worktree remove $worktree_path"
}

# Function to create a new tmux session for a worktree
wttmux() {
    if [ -z "$1" ]; then
        echo "Usage: wttmux <branch-name> [session-name]"
        echo "Creates a new tmux session for the specified worktree"
        return 1
    fi
    
    local branch_name="$1"
    local session_name="${2:-$branch_name}"
    local project_dir=$(basename "$(pwd)")
    local parent_dir=$(dirname "$(pwd)")
    local worktree_path="$parent_dir/${project_dir}-worktrees/$branch_name"
    
    if [ ! -d "$worktree_path" ]; then
        echo "❌ Worktree '$branch_name' not found at: $worktree_path"
        echo "Available worktrees:"
        git worktree list
        return 1
    fi
    
    echo "🖥️  Creating tmux session '$session_name' for worktree '$branch_name'"
    
    # Create new session
    tmux new-session -d -s "$session_name" -c "$worktree_path"
    
    # Create main window with editor and terminal
    tmux rename-window -t "$session_name:0" "main"
    tmux split-window -h -c "$worktree_path"
    
    # Start editor in left pane
    local editor="${EDITOR:-vim}"
    tmux send-keys -t "$session_name:main.0" "$editor ." C-m
    
    # Create additional windows
    tmux new-window -t "$session_name" -n "server" -c "$worktree_path"
    tmux new-window -t "$session_name" -n "claude" -c "$worktree_path"
    
    # Go back to main window
    tmux select-window -t "$session_name:main"
    tmux select-pane -t 1
    
    # Attach to session
    tmux attach-session -t "$session_name"
}

# Alias for listing all worktrees
alias wtls='git worktree list'

# Function to remove a worktree
wtrm() {
    if [ -z "$1" ]; then
        echo "Usage: wtrm <branch-name>"
        echo "Lists current worktrees if no argument provided:"
        git worktree list
        return 1
    fi
    
    local branch_name="$1"
    local project_dir=$(basename "$(pwd)")
    local parent_dir=$(dirname "$(pwd)")
    local worktree_path="$parent_dir/${project_dir}-worktrees/$branch_name"
    
    if [ -d "$worktree_path" ]; then
        echo "🗑️  Removing worktree: $worktree_path"
        git worktree remove "$worktree_path"
        echo "✅ Worktree '$branch_name' removed successfully!"
        
        # Also kill tmux session if it exists
        if tmux has-session -t "$branch_name" 2>/dev/null; then
            echo "🖥️  Also killing tmux session '$branch_name'"
            tmux kill-session -t "$branch_name"
        fi
    else
        echo "❌ Worktree '$branch_name' not found at: $worktree_path"
        echo "Available worktrees:"
        git worktree list
    fi
}