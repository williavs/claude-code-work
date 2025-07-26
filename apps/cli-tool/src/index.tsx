#!/usr/bin/env node

import React from 'react';
import { render } from 'ink';
import { Command } from 'commander';
import { DEFAULT_CONFIG } from './types/index.js';
import { App } from './components/App.js';

// CLI setup
const program = new Command();

program
  .name('claude-monitor')
  .description('CLI monitoring tool for Claude Code observability')
  .version('1.0.0')
  .option('-s, --server <url>', 'WebSocket server URL', DEFAULT_CONFIG.serverUrl)
  .option('-m, --max-events <number>', 'Maximum events to store', String(DEFAULT_CONFIG.maxEvents))
  .option('-b, --buffer-interval <ms>', 'Event buffer flush interval', String(DEFAULT_CONFIG.bufferFlushInterval))
  .action(async (options: { 
    server: string; 
    maxEvents: string;
    bufferInterval: string;
  }) => {
    const config = {
      serverUrl: options.server,
      maxEvents: parseInt(options.maxEvents, 10),
      bufferFlushInterval: parseInt(options.bufferInterval, 10),
      reconnectDelay: DEFAULT_CONFIG.reconnectDelay,
    };
    
    // Render the Ink app
    const { waitUntilExit } = render(<App config={config} />);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      process.exit(0);
    });
    
    await waitUntilExit();
  });

// Parse command line arguments
if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse(process.argv);
}