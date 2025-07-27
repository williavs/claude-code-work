#!/usr/bin/env node

import blessed from 'blessed';
import { TmuxWizard } from './src/tmuxWizard.js';

// Create screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'Tmux Wizard Test',
  autoPadding: true,
  warnings: true
});

// Add a background message
blessed.box({
  parent: screen,
  top: 'center',
  left: 'center',
  width: 50,
  height: 5,
  content: '{center}Testing Tmux Wizard Tab Navigation\n\nPress Ctrl+C to exit{/}',
  tags: true,
  style: {
    fg: 'gray'
  }
});

// Create and show wizard
const wizard = new TmuxWizard(screen);
wizard.show();

// Set up screen exit
screen.key(['C-c'], () => process.exit(0));

// Render
screen.render();