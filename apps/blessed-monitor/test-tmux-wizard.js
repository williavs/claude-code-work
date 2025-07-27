#!/usr/bin/env node

import blessed from 'blessed';
import { TmuxWizard } from './src/tmuxWizard.js';

// Create screen
const screen = blessed.screen({
  smartCSR: true,
  title: 'Tmux Wizard Test'
});

// Create and show the wizard
const wizard = new TmuxWizard(screen);

// Set up close handler
wizard.onClose = () => {
  process.exit(0);
};

// Show the wizard
wizard.show();

// Quit on Escape, q, or Control-C
screen.key(['C-c'], () => {
  process.exit(0);
});

screen.render();