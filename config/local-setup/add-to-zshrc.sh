
# Function to copy .claude directory to current working directory
cc-jw() {
    local source_dir="/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude"
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


# Function to gather all new .md files from any .claude directory in willycode
cc-gather() {
    local master_dir="/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude"
    local scan_dir="/Users/wvansickle/willycode"
    
    echo "🔍 Scanning for new commands..."
    
    # Use zsh glob to find all .md files in one pass
    local -a all_md_files=($scan_dir/**/.claude/commands/*.md(.N))
    
    # Early exit if no files
    [[ ${#all_md_files[@]} -eq 0 ]] && { echo "No .claude/commands directories found"; return 0; }
    
    # Build associative array of master files for O(1) lookup
    local -A master_files
    for f in "$master_dir/commands"/*.md(.N); do
        master_files[${f:t}]=1
    done
    
    # Filter to only new files
    local -a new_files=()
    local -a source_paths=()
    
    for md_file in $all_md_files; do
        # Skip if from master directory
        [[ $md_file == $master_dir/* ]] && continue
        
        local filename=${md_file:t}
        if [[ -z ${master_files[$filename]} ]]; then
            new_files+=($filename)
            source_paths+=($md_file)
        fi
    done
    
    # Report and copy
    [[ ${#new_files[@]} -eq 0 ]] && { echo "✓ No new commands found"; return 0; }
    
    echo "Found ${#new_files[@]} new command(s):"
    printf '  • %s\n' $new_files
    
    echo -n -e "\nAdd to master? (y/N): "
    read -r response
    [[ ! "$response" =~ ^[Yy]$ ]] && { echo "Cancelled"; return 1; }
    
    # Batch copy
    local copied=0
    for i in {1..${#new_files[@]}}; do
        cp "${source_paths[$i]}" "$master_dir/commands/" && ((copied++))
    done
    
    echo "✓ Added $copied command(s)"
}

# Function to pull new commands from master to current directory
cc-u() {
    local master_dir="/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude"
    local current_dir="$(pwd)/.claude"
    
    # Validate directories
    [[ ! -d "$current_dir/commands" ]] && { echo "Error: No .claude/commands in current directory"; return 1; }
    [[ ! -d "$master_dir/commands" ]] && { echo "Error: No commands in master location"; return 1; }
    
    # Find new files
    local -a new_files=()
    for file in "$master_dir/commands"/*.md; do
        [[ -f "$file" ]] || continue
        local filename=$(basename "$file")
        [[ ! -f "$current_dir/commands/$filename" ]] && new_files+=("$filename")
    done
    
    # Exit if nothing new
    [[ ${#new_files[@]} -eq 0 ]] && { echo "✓ No new commands available"; return 0; }
    
    echo "New commands available:"
    echo "──────────────────────"
    
    # Display files with numbers
    local -a selected=()
    for i in {1..${#new_files[@]}}; do
        echo "[$i] ${new_files[$i]}"
        selected+=("0")  # Initialize all as unselected
    done
    
    echo -e "\nEnter numbers to toggle (space-separated), 'a' for all, or press Enter when done:"
    
    # Selection loop
    while true; do
        # Show current selection
        echo -n "Selected: "
        for i in {1..${#new_files[@]}}; do
            [[ ${selected[$i]} == "1" ]] && echo -n "$i "
        done
        echo
        
        read -r input
        [[ -z "$input" ]] && break
        
        if [[ "$input" == "a" ]]; then
            for i in {1..${#new_files[@]}}; do selected[$i]="1"; done
        else
            for num in $input; do
                if [[ "$num" =~ ^[0-9]+$ ]] && (( num >= 1 && num <= ${#new_files[@]} )); then
                    selected[$num]=$((1 - selected[$num]))  # Toggle
                fi
            done
        fi
    done
    
    # Copy selected files
    local copied=0
    for i in {1..${#new_files[@]}}; do
        if [[ ${selected[$i]} == "1" ]]; then
            cp "$master_dir/commands/${new_files[$i]}" "$current_dir/commands/"
            ((copied++))
            echo "✓ Copied: ${new_files[$i]}"
        fi
    done
    
    [[ $copied -eq 0 ]] && echo "No files selected" || echo -e "\n✓ Copied $copied command(s)"
}

# Function to update hooks in current directory from master
cc-u-hooks() {
    local master_dir="/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude"
    local current_dir="$(pwd)/.claude"
    
    # Safety checks
    [[ "$(pwd)" == *"/claude-code-hooks-multi-agent-observability"* ]] && { echo "Error: Don't run this in master directory"; return 1; }
    [[ ! -d "$current_dir" ]] && { echo "Error: No .claude directory in current location"; return 1; }
    [[ ! -d "$master_dir/hooks" ]] && { echo "Error: No hooks directory in master"; return 1; }
    
    # Create hooks directory if it doesn't exist
    [[ ! -d "$current_dir/hooks" ]] && mkdir -p "$current_dir/hooks"
    
    echo "🔍 Analyzing changes..."
    
    # Get all files with relative paths, excluding logs and cache
    local -a master_files current_files
    master_files=()
    current_files=()
    
    # Build file lists with relative paths, excluding logs and __pycache__
    for f in "$master_dir/hooks"/**/*(.N); do
        local rel_path=${f#$master_dir/hooks/}
        [[ "$rel_path" =~ ^logs/ ]] && continue
        [[ "$rel_path" =~ __pycache__ ]] && continue
        master_files+=($rel_path)
    done
    
    for f in "$current_dir/hooks"/**/*(.N); do
        local rel_path=${f#$current_dir/hooks/}
        [[ "$rel_path" =~ ^logs/ ]] && continue
        [[ "$rel_path" =~ __pycache__ ]] && continue
        current_files+=($rel_path)
    done
    
    # Sort arrays for consistent comparison
    master_files=(${(o)master_files})
    current_files=(${(o)current_files})
    
    # Find differences
    local -a new_files removed_files modified_files unchanged_files
    
    # Files only in master (new)
    for f in $master_files; do
        if [[ ! " ${current_files[@]} " =~ " $f " ]]; then
            new_files+=($f)
        fi
    done
    
    # Files only in current (removed) - excluding logs and cache
    for f in $current_files; do
        if [[ ! " ${master_files[@]} " =~ " $f " ]]; then
            removed_files+=($f)
        fi
    done
    
    # Check for modifications
    for f in $master_files; do
        if [[ -f "$current_dir/hooks/$f" ]]; then
            if ! cmp -s "$master_dir/hooks/$f" "$current_dir/hooks/$f"; then
                modified_files+=($f)
            else
                unchanged_files+=($f)
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
        
        (( ${#new_files[@]} > 0 )) && {
            echo "➕ New files:"
            printf '   %s\n' "${new_files[@]:0:5}"
            (( ${#new_files[@]} > 5 )) && echo "   ... and $((${#new_files[@]} - 5)) more"
        }
        
        (( ${#modified_files[@]} > 0 )) && {
            echo "🔄 Hooks I'm finta update:"
            printf '   %s\n' "${modified_files[@]:0:5}"
            (( ${#modified_files[@]} > 5 )) && echo "   ... and $((${#modified_files[@]} - 5)) more"
        }
        
        (( ${#removed_files[@]} > 0 )) && {
            echo "❌ Will be removed:"
            printf '   %s\n' "${removed_files[@]:0:5}"
            (( ${#removed_files[@]} > 5 )) && echo "   ... and $((${#removed_files[@]} - 5)) more"
        }
        
        echo -n -e "\nProceed with update? (y/N): "
        read -r response
        [[ ! "$response" =~ ^[Yy]$ ]] && { echo "Cancelled"; return 1; }
        
        echo -e "\n📋 Updating hooks..."
        
        # Remove old files (but not logs or cache)
        for file in $removed_files; do
            rm -f "$current_dir/hooks/$file"
        done
        
        # Copy all files from master
        for file in $master_files; do
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
    local master_dir="/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude"
    local scan_dir="/Users/wvansickle/willycode"
    
    echo "🔍 Finding all .claude/hooks directories..."
    
    # Find all .claude/hooks directories
    local -a hook_dirs=()
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
    for dir in $hook_dirs; do
        local project_name=$(dirname $(dirname "$dir"))
        project_name=${project_name##*/}
        echo "  • $project_name"
    done
    
    echo -n -e "\nUpdate ALL these projects' hooks? (y/N): "
    read -r response
    [[ ! "$response" =~ ^[Yy]$ ]] && { echo "Cancelled"; return 1; }
    
    echo -e "\n📋 Updating hooks globally..."
    
    # Get master files once (excluding logs and cache)
    local -a master_files=()
    for f in "$master_dir/hooks"/**/*(.N); do
        local rel_path=${f#$master_dir/hooks/}
        [[ "$rel_path" =~ ^logs/ ]] && continue
        [[ "$rel_path" =~ __pycache__ ]] && continue
        master_files+=($rel_path)
    done
    
    # Update each project
    local updated=0
    for hook_dir in $hook_dirs; do
        local project_name=$(dirname $(dirname "$hook_dir"))
        project_name=${project_name##*/}
        echo -e "\n🔄 Updating: $project_name"
        
        # Remove old files (except logs/cache)
        for f in "$hook_dir"/**/*(.N); do
            local rel_path=${f#$hook_dir/}
            [[ "$rel_path" =~ ^logs/ ]] && continue
            [[ "$rel_path" =~ __pycache__ ]] && continue
            [[ ! " ${master_files[@]} " =~ " $rel_path " ]] && rm -f "$f"
        done
        
        # Copy all master files
        for file in $master_files; do
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
    local master_settings="/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude/settings.json"
    local global_settings="/Users/wvansickle/.claude/settings.json"
    local scan_dir="/Users/wvansickle"
    
    # Check if master settings exists
    if [[ ! -f "$master_settings" ]]; then
        echo "Error: Master settings.json not found at $master_settings"
        return 1
    fi
    
    echo "🔍 Finding all project .claude/settings.json files..."
    
    # Find all settings.json files
    local -a settings_files=()
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
    echo "───────────────────────────────────────────────────"
    
    # Show list of projects
    for file in $settings_files; do
        local project_dir=$(dirname $(dirname "$file"))
        local project_name=${project_dir##*/}
        echo "  • $project_name"
    done
    
    echo -e "\n⚠️  This will overwrite all project-specific settings.json files"
    echo -n "Continue? (y/N): "
    read -r response
    [[ ! "$response" =~ ^[Yy]$ ]] && { echo "Cancelled"; return 1; }
    
    echo -e "\n📋 Updating settings.json files..."
    
    # Update each file
    local updated=0
    for settings_file in $settings_files; do
        local project_dir=$(dirname $(dirname "$settings_file"))
        local project_name=${project_dir##*/}
        
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
