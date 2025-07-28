# GitIngest - Repository Documentation Downloader

GitIngest transforms Git repositories into AI-ready documentation by extracting and formatting code for LLM consumption.

## Installation

```bash
# Install pipx first (Ubuntu/Debian)
sudo apt install pipx

# Then install gitingest
pipx install gitingest

# Note: The pipx path should be automatically added to PATH
# If not, you may need to run:
pipx ensurepath
```

## Basic Usage

### Pull down any GitHub repository:
```bash
# Basic usage - outputs to file
gitingest https://github.com/user/repo -o output.txt

# Output to stdout (for piping)
gitingest https://github.com/user/repo -o -

# Save to specific file
gitingest https://github.com/user/repo -o ~/docs/repo-docs.txt
```

## Common Use Cases

### 1. Document a Project for AI Analysis
```bash
# Get full project documentation
gitingest https://github.com/awesome-lists/awesome-terminal-apps -o terminal-apps.txt

# Then read it with Claude
cat terminal-apps.txt
```

### 2. Filter Specific Files
```bash
# Only get Python files
gitingest https://github.com/user/repo -i "*.py" -o python-only.txt

# Exclude test files
gitingest https://github.com/user/repo -e "test_*" -o no-tests.txt

# Multiple patterns
gitingest https://github.com/user/repo -i "*.py,*.js" -e "node_modules/,test/" -o filtered.txt
```

### 3. Private Repositories
```bash
# Use GitHub token
gitingest https://github.com/private/repo -t YOUR_GITHUB_TOKEN -o private.txt
```

### 4. Specific Branch
```bash
# Get documentation from specific branch
gitingest https://github.com/user/repo -b develop -o develop-docs.txt
```

## Examples for Common Repositories

### Awesome Lists
```bash
# Awesome Terminal Apps
gitingest https://github.com/agarrharr/awesome-cli-apps -o awesome-cli-apps.txt

# Awesome Python
gitingest https://github.com/vinta/awesome-python -o awesome-python.txt

# Awesome Shell
gitingest https://github.com/alebcay/awesome-shell -o awesome-shell.txt
```

### Documentation Extraction
```bash
# Get only README and docs
gitingest https://github.com/user/repo -i "README*,*.md,docs/*" -o docs-only.txt
```

## Pro Tips

1. **Pipe to Claude**: 
   ```bash
   gitingest https://github.com/user/repo -o - | head -n 1000
   ```

2. **Create Documentation Library**:
   ```bash
   mkdir ~/ai-docs
   gitingest https://github.com/cool/project -o ~/ai-docs/project.txt
   ```

3. **Size Limits**:
   ```bash
   # Limit file size to 100KB
   gitingest https://github.com/user/repo -s 100000 -o small-files.txt
   ```

## Quick Commands

```bash
# Alias for common use
alias gidoc='gitingest -o -'

# Usage
gidoc https://github.com/user/repo | less
```