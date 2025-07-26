#!/bin/bash

# Install terminal file explorers for the tmux layout

echo "🗂️  Installing terminal file explorers..."

# Function to install on Ubuntu/Debian
install_ubuntu() {
    echo "📦 Installing for Ubuntu/Debian..."
    
    # Update package list
    sudo apt update
    
    # Install ranger (best option - vi-like file manager)
    echo "Installing ranger..."
    sudo apt install -y ranger
    
    # Install tree for fallback
    echo "Installing tree..."
    sudo apt install -y tree
    
    # Optional: Install other file managers
    read -p "Install additional file managers? (lf, mc) [y/N]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Install lf (modern, fast file manager)
        echo "Installing lf..."
        wget https://github.com/gokcehan/lf/releases/latest/download/lf-linux-amd64.tar.gz -O /tmp/lf.tar.gz
        tar -xzf /tmp/lf.tar.gz -C /tmp
        sudo mv /tmp/lf /usr/local/bin/
        
        # Install midnight commander (classic two-panel)
        echo "Installing mc..."
        sudo apt install -y mc
    fi
}

# Function to install on macOS
install_macos() {
    echo "🍎 Installing for macOS..."
    
    if ! command -v brew &> /dev/null; then
        echo "Homebrew not found. Please install it first."
        exit 1
    fi
    
    brew install ranger tree
    
    read -p "Install additional file managers? (lf, midnight-commander) [y/N]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        brew install lf midnight-commander
    fi
}

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    install_ubuntu
elif [[ "$OSTYPE" == "darwin"* ]]; then
    install_macos
else
    echo "Unsupported OS: $OSTYPE"
    exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "📚 Quick usage guide:"
echo ""
echo "🎯 Ranger (recommended):"
echo "  - Arrow keys: Navigate"
echo "  - Enter: Open file/directory"
echo "  - q: Quit"
echo "  - Space: Select files"
echo "  - yy: Copy, dd: Cut, pp: Paste"
echo "  - i: Show file preview"
echo "  - ?: Show all keybindings"
echo ""
echo "📂 The file explorer will automatically open in the 4th pane when you run:"
echo "  ./scripts/tmux-multi-view.sh"