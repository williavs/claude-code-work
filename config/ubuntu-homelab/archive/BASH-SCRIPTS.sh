#!/bin/bash

# Claude Code Configuration Management for Ubuntu/Bash
# Run convert_absolute_paths first to set your paths

# Configuration file to store user paths
CLAUDE_CONFIG_FILE="$HOME/.claude_config"

# Function to set up absolute paths
convert_absolute_paths() {
    echo "Claude Code Configuration Setup"
    echo "==============================="
    echo
    
    # Get master directory
    read -p "Enter absolute path to your master .claude directory: " master_path
    master_path="${master_path%/}"  # Remove trailing slash
    
    # Get scan directory
    read -p "Enter absolute path to scan for projects (e.g., /home/user/projects): " scan_path
    scan_path="${scan_path%/}"  # Remove trailing slash
    
    # Get global settings path
    read -p "Enter absolute path to global settings (e.g., /home/user/.claude/settings.json): " global_settings
    
    # Validate paths
    if [[ ! -d "$master_path" ]]; then
        echo "Error: Master directory doesn't exist: $master_path"
        return 1
    fi
    
    if [[ ! -d "$scan_path" ]]; then
        echo "Error: Scan directory doesn't exist: $scan_path"
        return 1
    fi
    
    # Save configuration
    cat > "$CLAUDE_CONFIG_FILE" << EOF
MASTER_DIR="$master_path"
SCAN_DIR="$scan_path"
GLOBAL_SETTINGS="$global_settings"
EOF
    
    echo
    echo "✓ Configuration saved to $CLAUDE_CONFIG_FILE"
    echo
    echo "Paths configured:"
    echo "  Master: $master_path"
    echo "  Scan: $scan_path"
    echo "  Global: $global_settings"
}

# Load configuration
load_config() {
    if [[ ! -f "$CLAUDE_CONFIG_FILE" ]]; then
        echo "Error: Configuration not found. Run 'convert_absolute_paths' first."
        return 1
    fi
    source "$CLAUDE_CONFIG_FILE"
}

# Function to copy .claude directory to current working directory
cc-jw() {
    load_config || return 1
    
    local source_dir="$MASTER_DIR"
    local target_dir="$(pwd)/.claude"
    
    # Check if source directory exists
    if [[ ! -d "$source_dir" ]]; then
        echo "Error: Source directory $source_dir does not exist"
        return 1
    fi
    
    # Check if target already exists
    if [[ -e "$target_dir" ]]; then
        echo "Warning: .claude already exists in current directory"
        echo -n "Overwrite? (y/N): "
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo "Cancelled"
            return 1
        fi
        rm -rf "$target_dir"
    fi
    
    # Copy the directory
    echo "Copying .claude to $(pwd)..."
    cp -r "$source_dir" "$target_dir"
    
    if [[ $? -eq 0 ]]; then
        echo "✓ Successfully copied .claude directory"
    else
        echo "✗ Failed to copy .claude directory"
        return 1
    fi
}

# Function to gather all new .md files from any .claude directory
cc-gather() {
    load_config || return 1
    
    local master_dir="$MASTER_DIR"
    local scan_dir="$SCAN_DIR"
    
    echo "🔍 Scanning for new commands..."
    
    # Find all .md files
    local all_md_files=()
    while IFS= read -r -d '' file; do
        all_md_files+=("$file")
    done < <(find "$scan_dir" -path "*/.claude/commands/*.md" -type f -print0 2>/dev/null)
    
    # Early exit if no files
    if [[ ${#all_md_files[@]} -eq 0 ]]; then
        echo "No .claude/commands directories found"
        return 0
    fi
    
    # Build list of master files
    declare -A master_files
    for f in "$master_dir/commands"/*.md; do
        [[ -f "$f" ]] && master_files[$(basename "$f")]=1
    done
    
    # Filter to only new files
    local new_files=()
    local source_paths=()
    
    for md_file in "${all_md_files[@]}"; do
        # Skip if from master directory
        [[ "$md_file" == "$master_dir"/* ]] && continue
        
        local filename=$(basename "$md_file")
        if [[ -z "${master_files[$filename]}" ]]; then
            new_files+=("$filename")
            source_paths+=("$md_file")
        fi
    done
    
    # Report and copy
    if [[ ${#new_files[@]} -eq 0 ]]; then
        echo "✓ No new commands found"
        return 0
    fi
    
    echo "Found ${#new_files[@]} new command(s):"
    printf '  • %s\n' "${new_files[@]}"
    
    echo -n -e "\nAdd to master? (y/N): "
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Cancelled"
        return 1
    fi
    
    # Batch copy
    local copied=0
    for i in "${!new_files[@]}"; do
        if cp "${source_paths[$i]}" "$master_dir/commands/"; then
            ((copied++))
        fi
    done
    
    echo "✓ Added $copied command(s)"
}

# Function to pull new commands from master to current directory
cc-u() {
    load_config || return 1
    
    local master_dir="$MASTER_DIR"
    local current_dir="$(pwd)/.claude"
    
    # Validate directories
    if [[ ! -d "$current_dir/commands" ]]; then
        echo "Error: No .claude/commands in current directory"
        return 1
    fi
    if [[ ! -d "$master_dir/commands" ]]; then
        echo "Error: No commands in master location"
        return 1
    fi
    
    # Find new files
    local new_files=()
    for file in "$master_dir/commands"/*.md; do
        [[ -f "$file" ]] || continue
        local filename=$(basename "$file")
        [[ ! -f "$current_dir/commands/$filename" ]] && new_files+=("$filename")
    done
    
    # Exit if nothing new
    if [[ ${#new_files[@]} -eq 0 ]]; then
        echo "✓ No new commands available"
        return 0
    fi
    
    echo "New commands available:"
    echo "──────────────────────"
    
    # Display files with numbers
    local selected=()
    for i in "${!new_files[@]}"; do
        echo "[$((i+1))] ${new_files[$i]}"
        selected+=("0")  # Initialize all as unselected
    done
    
    echo -e "\nEnter numbers to toggle (space-separated), 'a' for all, or press Enter when done:"
    
    # Selection loop
    while true; do
        # Show current selection
        echo -n "Selected: "
        for i in "${!selected[@]}"; do
            [[ "${selected[$i]}" == "1" ]] && echo -n "$((i+1)) "
        done
        echo
        
        read -r input
        [[ -z "$input" ]] && break
        
        if [[ "$input" == "a" ]]; then
            for i in "${!selected[@]}"; do
                selected[$i]="1"
            done
        else
            for num in $input; do
                if [[ "$num" =~ ^[0-9]+$ ]] && (( num >= 1 && num <= ${#new_files[@]} )); then
                    local idx=$((num-1))
                    selected[$idx]=$((1 - ${selected[$idx]}))  # Toggle
                fi
            done
        fi
    done
    
    # Copy selected files
    local copied=0
    for i in "${!selected[@]}"; do
        if [[ "${selected[$i]}" == "1" ]]; then
            cp "$master_dir/commands/${new_files[$i]}" "$current_dir/commands/"
            ((copied++))
            echo "✓ Copied: ${new_files[$i]}"
        fi
    done
    
    if [[ $copied -eq 0 ]]; then
        echo "No files selected"
    else
        echo -e "\n✓ Copied $copied command(s)"
    fi
}

# Function to update hooks in current directory from master
cc-u-hooks() {
    load_config || return 1
    
    local master_dir="$MASTER_DIR"
    local current_dir="$(pwd)/.claude"
    
    # Safety checks
    if [[ "$(pwd)" == *"$(basename "$master_dir")"* ]]; then
        echo "Error: Don't run this in master directory"
        return 1
    fi
    if [[ ! -d "$current_dir" ]]; then
        echo "Error: No .claude directory in current location"
        return 1
    fi
    if [[ ! -d "$master_dir/hooks" ]]; then
        echo "Error: No hooks directory in master"
        return 1
    fi
    
    # Create hooks directory if it doesn't exist
    [[ ! -d "$current_dir/hooks" ]] && mkdir -p "$current_dir/hooks"
    
    echo "🔍 Analyzing changes..."
    
    # Get all files with relative paths, excluding logs and cache
    local master_files=()
    local current_files=()
    
    # Build file lists with relative paths
    while IFS= read -r -d '' f; do
        local rel_path="${f#$master_dir/hooks/}"
        [[ "$rel_path" =~ ^logs/ ]] && continue
        [[ "$rel_path" =~ __pycache__ ]] && continue
        master_files+=("$rel_path")
    done < <(find "$master_dir/hooks" -type f -print0 2>/dev/null)
    
    while IFS= read -r -d '' f; do
        local rel_path="${f#$current_dir/hooks/}"
        [[ "$rel_path" =~ ^logs/ ]] && continue
        [[ "$rel_path" =~ __pycache__ ]] && continue
        current_files+=("$rel_path")
    done < <(find "$current_dir/hooks" -type f -print0 2>/dev/null)
    
    # Sort arrays
    IFS=$'\n' master_files=($(sort <<<"${master_files[*]}"))
    IFS=$'\n' current_files=($(sort <<<"${current_files[*]}"))
    
    # Find differences
    local new_files=()
    local removed_files=()
    local modified_files=()
    local unchanged_files=()
    
    # Files only in master (new)
    for f in "${master_files[@]}"; do
        if [[ ! " ${current_files[@]} " =~ " $f " ]]; then
            new_files+=("$f")
        fi
    done
    
    # Files only in current (removed)
    for f in "${current_files[@]}"; do
        if [[ ! " ${master_files[@]} " =~ " $f " ]]; then
            removed_files+=("$f")
        fi
    done
    
    # Check for modifications
    for f in "${master_files[@]}"; do
        if [[ -f "$current_dir/hooks/$f" ]]; then
            if ! cmp -s "$master_dir/hooks/$f" "$current_dir/hooks/$f"; then
                modified_files+=("$f")
            else
                unchanged_files+=("$f")
            fi
        fi
    done
    
    # Display summary
    echo "📊 Summary of changes (ignoring logs/ and __pycache__):"
    echo "  • New files:       ${#new_files[@]}"
    echo "  • Modified files:  ${#modified_files[@]}"
    echo "  • Removed files:   ${#removed_files[@]}"
    echo "  • Unchanged files: ${#unchanged_files[@]}"
    
    # Show details if there are changes
    if (( ${#new_files[@]} + ${#modified_files[@]} + ${#removed_files[@]} > 0 )); then
        echo
        
        if (( ${#new_files[@]} > 0 )); then
            echo "➕ New files:"
            for i in "${!new_files[@]}"; do
                (( i < 5 )) && echo "   ${new_files[$i]}"
            done
            (( ${#new_files[@]} > 5 )) && echo "   ... and $((${#new_files[@]} - 5)) more"
        fi
        
        if (( ${#modified_files[@]} > 0 )); then
            echo "🔄 Modified files:"
            for i in "${!modified_files[@]}"; do
                (( i < 5 )) && echo "   ${modified_files[$i]}"
            done
            (( ${#modified_files[@]} > 5 )) && echo "   ... and $((${#modified_files[@]} - 5)) more"
        fi
        
        if (( ${#removed_files[@]} > 0 )); then
            echo "❌ Will be removed:"
            for i in "${!removed_files[@]}"; do
                (( i < 5 )) && echo "   ${removed_files[$i]}"
            done
            (( ${#removed_files[@]} > 5 )) && echo "   ... and $((${#removed_files[@]} - 5)) more"
        fi
        
        echo -n -e "\nProceed with update? (y/N): "
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo "Cancelled"
            return 1
        fi
        
        echo -e "\n📋 Updating hooks..."
        
        # Remove old files
        for file in "${removed_files[@]}"; do
            rm -f "$current_dir/hooks/$file"
        done
        
        # Copy all files from master
        for file in "${master_files[@]}"; do
            local dir=$(dirname "$file")
            [[ "$dir" != "." ]] && mkdir -p "$current_dir/hooks/$dir"
            cp -f "$master_dir/hooks/$file" "$current_dir/hooks/$file"
        done
        
        echo "✓ Update complete!"
    else
        echo -e "\n✓ Already up to date!"
    fi
}

# Function to update hooks in ALL .claude directories from master
cc-ug-hooks() {
    load_config || return 1
    
    local master_dir="$MASTER_DIR"
    local scan_dir="$SCAN_DIR"
    
    echo "🔍 Finding all .claude/hooks directories..."
    
    # Find all .claude/hooks directories
    local hook_dirs=()
    while IFS= read -r -d '' dir; do
        # Skip the master directory
        [[ "$dir" == "$master_dir/hooks" ]] && continue
        hook_dirs+=("$dir")
    done < <(find "$scan_dir" -type d -path "*/.claude/hooks" -print0 2>/dev/null)
    
    if [[ ${#hook_dirs[@]} -eq 0 ]]; then
        echo "No .claude/hooks directories found (excluding master)"
        return 0
    fi
    
    echo "Found ${#hook_dirs[@]} project(s) with hooks"
    echo "───────────────────────────────────"
    
    # Show list of projects
    for dir in "${hook_dirs[@]}"; do
        local project_name=$(basename "$(dirname "$(dirname "$dir")")")
        echo "  • $project_name"
    done
    
    echo -n -e "\nUpdate ALL these projects' hooks? (y/N): "
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Cancelled"
        return 1
    fi
    
    echo -e "\n📋 Updating hooks globally..."
    
    # Get master files once (excluding logs and cache)
    local master_files=()
    while IFS= read -r -d '' f; do
        local rel_path="${f#$master_dir/hooks/}"
        [[ "$rel_path" =~ ^logs/ ]] && continue
        [[ "$rel_path" =~ __pycache__ ]] && continue
        master_files+=("$rel_path")
    done < <(find "$master_dir/hooks" -type f -print0 2>/dev/null)
    
    # Update each project
    local updated=0
    for hook_dir in "${hook_dirs[@]}"; do
        local project_name=$(basename "$(dirname "$(dirname "$hook_dir")")")
        echo -e "\n🔄 Updating: $project_name"
        
        # Remove old files (except logs/cache)
        while IFS= read -r -d '' f; do
            local rel_path="${f#$hook_dir/}"
            [[ "$rel_path" =~ ^logs/ ]] && continue
            [[ "$rel_path" =~ __pycache__ ]] && continue
            if [[ ! " ${master_files[@]} " =~ " $rel_path " ]]; then
                rm -f "$f"
            fi
        done < <(find "$hook_dir" -type f -print0 2>/dev/null)
        
        # Copy all master files
        for file in "${master_files[@]}"; do
            local dir=$(dirname "$file")
            [[ "$dir" != "." ]] && mkdir -p "$hook_dir/$dir"
            cp -f "$master_dir/hooks/$file" "$hook_dir/$file"
        done
        
        ((updated++))
        echo "  ✓ Updated"
    done
    
    echo -e "\n✅ Updated hooks in $updated project(s)"
}

# Function to update settings.json in ALL .claude directories from master
cc-ug-settings() {
    load_config || return 1
    
    local master_settings="$MASTER_DIR/settings.json"
    local global_settings="$GLOBAL_SETTINGS"
    local scan_dir="$SCAN_DIR"
    
    # Check if master settings exists
    if [[ ! -f "$master_settings" ]]; then
        echo "Error: Master settings.json not found at $master_settings"
        return 1
    fi
    
    echo "🔍 Finding all project .claude/settings.json files..."
    
    # Find all settings.json files
    local settings_files=()
    while IFS= read -r -d '' file; do
        # Skip the global settings and master settings
        [[ "$file" == "$global_settings" ]] && continue
        [[ "$file" == "$master_settings" ]] && continue
        settings_files+=("$file")
    done < <(find "$scan_dir" -type f -path "*/.claude/settings.json" -print0 2>/dev/null)
    
    if [[ ${#settings_files[@]} -eq 0 ]]; then
        echo "No project settings.json files found"
        return 0
    fi
    
    echo "Found ${#settings_files[@]} project(s) with settings.json"
    echo "───────────────────────────────────"
    
    # Show list of projects
    for file in "${settings_files[@]}"; do
        local project_name=$(basename "$(dirname "$(dirname "$file")")")
        echo "  • $project_name"
    done
    
    echo -e "\n⚠️  This will overwrite all project-specific settings.json files"
    echo -n "Continue? (y/N): "
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Cancelled"
        return 1
    fi
    
    echo -e "\n📋 Updating settings.json files..."
    
    # Update each file
    local updated=0
    for settings_file in "${settings_files[@]}"; do
        local project_name=$(basename "$(dirname "$(dirname "$settings_file")")")
        
        # Backup existing file
        cp "$settings_file" "${settings_file}.backup" 2>/dev/null
        
        # Copy master settings
        if cp -f "$master_settings" "$settings_file"; then
            ((updated++))
            echo "  ✓ Updated: $project_name"
        else
            echo "  ✗ Failed: $project_name"
        fi
    done
    
    echo -e "\n✅ Updated settings.json in $updated project(s)"
    echo "📝 Note: Original files backed up as settings.json.backup"
}

# Add aliases if you want shorter commands
alias cc-hooks-all='cc-ug-hooks'
alias cc-settings-all='cc-ug-settings'