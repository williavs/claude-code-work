# Git Worktrees Interactive Setup
# Usage: wt [branch-name]

wt() {
    local branch_name="$1"
    local project_dir="$(basename "$PWD")"
    local parent_dir="$(dirname "$PWD")"
    local worktrees_dir="$parent_dir/${project_dir}-worktrees"
    
    # Interactive mode if no branch name provided
    if [[ -z "$branch_name" ]]; then
        echo "📁 Current project: $project_dir"
        echo "🌳 Worktrees will be created in: $worktrees_dir"
        echo
        
        # Show existing worktrees if any
        if git worktree list 2>/dev/null | grep -q worktrees; then
            echo "📋 Existing worktrees:"
            git worktree list | grep worktrees
            echo
        fi
        
        printf "Branch name: "
        read -r branch_name
        
        if [[ -z "$branch_name" ]]; then
            echo "No branch name provided"
            return 1
        fi
    fi
    
    local worktree_path="$worktrees_dir/$branch_name"
    
    # Check if already exists
    if [[ -d "$worktree_path" ]]; then
        printf "Worktree '$branch_name' exists. Remove and recreate? (y/N): "
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            git worktree remove "$worktree_path" 2>/dev/null || rm -rf "$worktree_path"
        else
            return 1
        fi
    fi
    
    # Create worktree
    mkdir -p "$worktrees_dir"
    git worktree add "$worktree_path" -b "$branch_name" || return 1
    
    # Copy configs
    printf "Copy config files? (Y/n): "
    read -r copy_configs
    if [[ ! "$copy_configs" =~ ^[Nn]$ ]]; then
        for file in .env .env.local .nvmrc .node-version .ruby-version; do
            [[ -f "$file" ]] && cp "$file" "$worktree_path/"
        done
        for dir in .claude .cursor .vscode; do
            [[ -d "$dir" ]] && cp -r "$dir" "$worktree_path/"
        done
    fi
    
    # Open in editor
    printf "Open in Cursor? (Y/n): "
    read -r open_cursor
    if [[ ! "$open_cursor" =~ ^[Nn]$ ]] && command -v cursor >/dev/null 2>&1; then
        cursor "$worktree_path" &
    fi
    
    echo "✅ Worktree created: $worktree_path"
}

wtls() { git worktree list; }

wtrm() {
    local branch_name="$1"
    if [[ -z "$branch_name" ]]; then
        echo "Usage: wtrm <branch-name>"
        git worktree list
        return 1
    fi
    
    local project_dir="$(basename "$PWD")"
    local parent_dir="$(dirname "$PWD")"
    local worktree_path="$parent_dir/${project_dir}-worktrees/$branch_name"
    
    if [[ -d "$worktree_path" ]]; then
        git worktree remove "$worktree_path"
        echo "✅ Removed worktree: $branch_name"
    else
        echo "❌ Worktree not found: $branch_name"
        git worktree list
    fi
}