import blessed from 'blessed';

export function createStatusBar(screen) {
  const statusBar = blessed.box({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: 'cyan'
      }
    },
    padding: {
      left: 1,
      right: 1
    }
  });

  // Add keyboard shortcuts
  const shortcuts = [
    '{cyan-fg}[Q]{/cyan-fg} Quit',
    '{cyan-fg}[F]{/cyan-fg} Toggle Filters',
    '{cyan-fg}[R]{/cyan-fg} Reconnect',
    '{cyan-fg}[C]{/cyan-fg} Clear Filters',
    '{cyan-fg}[↑↓]{/cyan-fg} Scroll'
  ];
  
  const shortcutsLine = blessed.box({
    parent: statusBar,
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    tags: true,
    content: shortcuts.join('  {gray-fg}|{/gray-fg}  ')
  });

  // Override setContent to update the main content area
  const originalSetContent = statusBar.setContent.bind(statusBar);
  statusBar.setContent = function(content) {
    // Create a temporary box for the status message
    if (statusBar.statusMessage) {
      statusBar.statusMessage.destroy();
    }
    
    statusBar.statusMessage = blessed.box({
      parent: statusBar,
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      tags: true,
      content: content
    });
    
    screen.render();
  };

  // Set initial status
  statusBar.setContent('{yellow-fg}Initializing...{/yellow-fg}');

  return statusBar;
}