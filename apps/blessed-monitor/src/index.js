#!/usr/bin/env node

import blessed from 'blessed';
import { Command } from 'commander';
import { WebSocketClient } from './websocket.js';
import { EventStore } from './eventStore.js';
import { createHeader } from './components/header.js';
import { createEventList } from './components/eventList.js';
import { createActivityChart } from './components/chart.js';
import { createFilterPanel } from './components/filterPanel.js';
import { createStatusBar } from './components/statusBar.js';

// Default configuration
const DEFAULT_CONFIG = {
  serverUrl: 'ws://localhost:4000/stream',
  maxEvents: 1000,
  reconnectDelay: 5000
};

// Parse command line arguments
const program = new Command();
program
  .name('claude-monitor-blessed')
  .description('Blessed-based CLI monitoring tool for Claude Code observability')
  .version('1.0.0')
  .option('-s, --server <url>', 'WebSocket server URL', DEFAULT_CONFIG.serverUrl)
  .option('-m, --max-events <number>', 'Maximum events to store', String(DEFAULT_CONFIG.maxEvents))
  .parse(process.argv);

const options = program.opts();
const config = {
  serverUrl: options.server,
  maxEvents: parseInt(options.maxEvents, 10),
  reconnectDelay: DEFAULT_CONFIG.reconnectDelay
};

// Create screen
const screen = blessed.screen({
  smartCSR: true,
  fullUnicode: true,
  title: 'Claude Monitor',
  cursor: {
    artificial: true,
    shape: 'line',
    blink: true,
    color: 'cyan'
  }
});

// Initialize event store and WebSocket
const eventStore = new EventStore(config.maxEvents);
const wsClient = new WebSocketClient(config.serverUrl, config.reconnectDelay);

// Create UI components
const header = createHeader(screen);
const activityChart = createActivityChart(screen);
const filterPanel = createFilterPanel(screen);
const eventList = createEventList(screen);
const statusBar = createStatusBar(screen);

// Layout adjustment
let showFilters = false;

function adjustLayout() {
  const headerHeight = 3;
  const chartHeight = 5;
  const filterHeight = showFilters ? 5 : 0;
  const statusHeight = 3;
  
  header.position = {
    top: 0,
    left: 0,
    right: 0,
    height: headerHeight
  };
  
  activityChart.position = {
    top: headerHeight,
    left: 0,
    right: 0,
    height: chartHeight
  };
  
  filterPanel.position = {
    top: headerHeight + chartHeight,
    left: 0,
    right: 0,
    height: filterHeight
  };
  
  eventList.position = {
    top: headerHeight + chartHeight + filterHeight,
    left: 0,
    right: 0,
    bottom: statusHeight
  };
  
  statusBar.position = {
    bottom: 0,
    left: 0,
    right: 0,
    height: statusHeight
  };
  
  if (showFilters) {
    filterPanel.show();
  } else {
    filterPanel.hide();
  }
  
  screen.render();
}

// Update functions
function updateHeader() {
  const isConnected = wsClient.isConnected();
  const eventCount = eventStore.getFilteredEvents().length;
  
  header.setContent(
    `{bold}{cyan-fg}Claude Monitor{/cyan-fg}{/bold} ` +
    `{|}` +
    `${isConnected ? '{green-fg}● Connected{/green-fg}' : '{red-fg}● Offline{/red-fg}'} ` +
    `{white-fg}${eventCount} events{/white-fg} ` +
    `{yellow-fg}[F]ilter ${showFilters ? 'ON' : 'OFF'}{/yellow-fg}`
  );
  
  screen.render();
}

function updateEventList() {
  const events = eventStore.getFilteredEvents();
  const lines = [];
  
  // Add header
  lines.push(
    '{bold}{underline}' +
    'Time        ' +
    '   Event Type              ' +
    'Application                ' +
    'Session ID' +
    '{/underline}{/bold}'
  );
  lines.push(''); // Empty line for spacing
  
  events.slice(-50).reverse().forEach(event => {
    // Parse timestamp - server sends unix timestamp in milliseconds
    const date = new Date(event.timestamp);
    const time = date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const emoji = getEventEmoji(event.hookEventType || 'Unknown');
    const color = getEventColor(event.hookEventType || 'Unknown');
    
    // Clean session ID - extract just the ID part if it has extra text
    let sessionId = event.sessionId || 'unknown';
    if (sessionId.includes(':')) {
      sessionId = sessionId.split(':').pop().trim();
    }
    
    const sourceApp = event.sourceApp || 'unknown';
    
    // Format event type with padding for alignment
    const eventType = (event.hookEventType || 'Unknown').padEnd(18);
    const app = sourceApp.substring(0, 25).padEnd(25);
    
    const sessionColor = getSessionColor(sessionId);
    
    lines.push(
      `{gray-fg}${time}{/gray-fg}  ` +
      `${emoji}  {${color}-fg}${eventType}{/${color}-fg}  ` +
      `{cyan-fg}${app}{/cyan-fg}  ` +
      `{${sessionColor}-fg}${sessionId.slice(0, 8)}{/${sessionColor}-fg}`
    );
  });
  
  eventList.setContent(lines.join('\n'));
  screen.render();
}

function updateChart() {
  const data = eventStore.getChartData(3); // 3 minutes
  activityChart.setData(data);
  screen.render();
}

// Event emoji mapping
function getEventEmoji(eventType) {
  const emojiMap = {
    'PreToolUse': '🔧',
    'PostToolUse': '✅',
    'Notification': '🔔',
    'Stop': '🛑',
    'SubagentStop': '👥',
    'UserPromptSubmit': '💬'
  };
  return emojiMap[eventType] || '📌';
}

// Event color mapping
function getEventColor(eventType) {
  const colorMap = {
    'PreToolUse': 'yellow',
    'PostToolUse': 'green',
    'Notification': 'blue',
    'Stop': 'red',
    'SubagentStop': 'magenta',
    'UserPromptSubmit': 'cyan'
  };
  return colorMap[eventType] || 'white';
}

// Session color mapping - persistent colors per session
const sessionColors = new Map();
const availableColors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
let colorIndex = 0;

function getSessionColor(sessionId) {
  if (!sessionColors.has(sessionId)) {
    sessionColors.set(sessionId, availableColors[colorIndex % availableColors.length]);
    colorIndex++;
  }
  return sessionColors.get(sessionId);
}

// WebSocket event handlers
wsClient.on('connected', () => {
  updateHeader();
  statusBar.setContent('{green-fg}Connected to server{/green-fg}');
  screen.render();
});

wsClient.on('disconnected', () => {
  updateHeader();
  statusBar.setContent('{red-fg}Disconnected from server{/red-fg}');
  screen.render();
});

wsClient.on('event', (event) => {
  eventStore.addEvent(event);
  updateHeader();
  updateEventList();
  updateChart();
});

wsClient.on('error', (error) => {
  statusBar.setContent(`{red-fg}Error: ${error.message}{/red-fg}`);
  screen.render();
});

// Keyboard handlers
screen.key(['escape', 'q', 'C-c'], () => {
  wsClient.close();
  return process.exit(0);
});

screen.key('f', () => {
  showFilters = !showFilters;
  adjustLayout();
  updateHeader();
});

screen.key('r', () => {
  wsClient.reconnect();
  statusBar.setContent('{yellow-fg}Reconnecting...{/yellow-fg}');
  screen.render();
});

screen.key('c', () => {
  if (showFilters) {
    eventStore.clearFilters();
    filterPanel.updateFilters(eventStore.getFilters());
    updateEventList();
    updateHeader();
  }
});

// Filter keys when filter panel is visible
screen.key(['1', '2', '3'], (ch) => {
  if (!showFilters) return;
  
  const filterMap = { '1': 'sourceApp', '2': 'sessionId', '3': 'eventType' };
  const filterType = filterMap[ch];
  
  if (filterType) {
    eventStore.cycleFilter(filterType);
    filterPanel.updateFilters(eventStore.getFilters());
    updateEventList();
    updateHeader();
  }
});

// Mouse support
screen.enableMouse();
eventList.enableMouse();

// Initial layout
adjustLayout();
updateHeader();

// Connect to WebSocket
wsClient.connect();

// Render screen
screen.render();