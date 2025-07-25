#!/usr/bin/env node

import blessed from 'blessed';
import chalk from 'chalk';
import WebSocket from 'ws';
import { Command } from 'commander';

// Types matching the server structure
interface HookEvent {
  id?: number | string;
  source_app: string;
  session_id: string;
  hook_event_type: string;
  payload: Record<string, any>;
  chat?: any[];
  summary?: string;
  timestamp?: number | string;
}

interface WebSocketMessage {
  type: 'initial' | 'event';
  data: HookEvent | HookEvent[];
}

interface FilterState {
  sourceApp?: string;
  sessionId?: string;
  eventType?: string;
}

// Event type to emoji mapping (from existing clients)
const EVENT_EMOJIS: Record<string, string> = {
  'PreToolUse': '🔧',
  'PostToolUse': '✅',
  'Notification': '🔔',
  'Stop': '🛑',
  'SubagentStop': '👥',
  'PreCompact': '📦',
  'UserPromptSubmit': '💬',
  'default': '❓'
};

class ClaudeMonitor {
  private screen!: any;
  private headerBox!: any;
  private chartBox!: any;
  private eventsList!: any;
  private filterBox!: any;
  
  private ws: WebSocket | null = null;
  private events: HookEvent[] = [];
  private filters: FilterState = {};
  private isConnected = false;
  private showFilters = false;
  private maxEvents = 1000;
  
  private chartData: number[] = Array(60).fill(0); // 3 minutes of data (3s intervals)
  private lastChartUpdate = 0;

  constructor(private serverUrl: string = 'ws://localhost:4000/stream') {}

  async start() {
    this.setupUI();
    this.connectWebSocket();
    this.setupInputHandlers();
  }

  private setupUI() {
    // Create blessed screen
    this.screen = blessed.screen({
      smartCSR: true,
      title: 'Claude Monitor'
    });

    // Header
    this.headerBox = blessed.box({
      top: 0,
      left: 0,
      width: '100%',
      height: 3,
      border: { type: 'line' },
      style: {
        border: { fg: 'white' }
      }
    });

    // Chart
    this.chartBox = blessed.box({
      top: 3,
      left: 0,
      width: '100%',
      height: 6,
      border: { type: 'line' },
      style: {
        border: { fg: 'white' }
      }
    });

    // Filter box (initially hidden)
    this.filterBox = blessed.box({
      top: 9,
      left: 0,
      width: '100%',
      height: 5,
      border: { type: 'line' },
      style: {
        border: { fg: 'yellow' }
      },
      hidden: true
    });

    // Events list
    this.eventsList = blessed.list({
      top: 9,
      left: 0,
      width: '100%',
      height: '100%-9',
      border: { type: 'line' },
      style: {
        border: { fg: 'white' },
        selected: { bg: 'blue' }
      },
      keys: true,
      mouse: true,
      scrollable: true,
      alwaysScroll: true,
      scrollbar: {
        ch: ' ',
        style: { bg: 'yellow' }
      }
    });

    // Add all elements to screen
    this.screen.append(this.headerBox);
    this.screen.append(this.chartBox);
    this.screen.append(this.filterBox);
    this.screen.append(this.eventsList);

    // Initial render
    this.updateHeader();
    this.updateChart();
    this.updateFilters();
    this.screen.render();
  }

  private setupInputHandlers() {
    // Global key handlers
    this.screen.key(['q', 'C-c'], () => {
      this.cleanup();
      process.exit(0);
    });

    this.screen.key(['f'], () => {
      this.toggleFilters();
    });

    this.screen.key(['r'], () => {
      this.connectWebSocket();
    });

    // Filter input handlers
    this.screen.key(['1'], () => {
      if (this.showFilters) this.setFilter('sourceApp');
    });

    this.screen.key(['2'], () => {
      if (this.showFilters) this.setFilter('sessionId');
    });

    this.screen.key(['3'], () => {
      if (this.showFilters) this.setFilter('eventType');
    });

    this.screen.key(['c'], () => {
      if (this.showFilters) this.clearFilters();
    });
  }

  private connectWebSocket() {
    if (this.ws) {
      this.ws.close();
    }

    try {
      this.ws = new WebSocket(this.serverUrl);
      
      this.ws.on('open', () => {
        this.isConnected = true;
        this.updateHeader();
        this.screen.render();
      });

      this.ws.on('message', (data) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          this.handleWebSocketMessage(message);
        } catch (err) {
          // Ignore parsing errors
        }
      });

      this.ws.on('close', () => {
        this.isConnected = false;
        this.updateHeader();
        this.screen.render();
        
        // Auto-reconnect after 3 seconds
        setTimeout(() => this.connectWebSocket(), 3000);
      });

      this.ws.on('error', () => {
        this.isConnected = false;
        this.updateHeader();
        this.screen.render();
      });

    } catch (err) {
      this.isConnected = false;
      this.updateHeader();
      this.screen.render();
    }
  }

  private handleWebSocketMessage(message: WebSocketMessage) {
    if (message.type === 'initial') {
      const initialEvents = Array.isArray(message.data) ? message.data : [message.data];
      this.events = initialEvents.slice(-this.maxEvents);
    } else if (message.type === 'event') {
      const event = message.data as HookEvent;
      this.events.push(event);
      
      // Keep only recent events
      if (this.events.length > this.maxEvents) {
        this.events = this.events.slice(-this.maxEvents);
      }

      // Update chart data
      this.updateChartData();
    }

    this.updateDisplay();
  }

  private updateChartData() {
    const now = Date.now();
    const bucketIndex = Math.floor((now / 1000 / 3) % 60); // 3-second buckets
    
    if (bucketIndex !== this.lastChartUpdate) {
      this.lastChartUpdate = bucketIndex;
      this.chartData[bucketIndex] = 0;
    }
    
    this.chartData[bucketIndex]++;
  }

  private updateDisplay() {
    this.updateHeader();
    this.updateChart();
    this.updateEventsList();
    this.screen.render();
  }

  private updateHeader() {
    const status = this.isConnected ? 
      chalk.green('● Connected') : 
      chalk.red('● Offline');
    
    const eventCount = this.getFilteredEvents().length;
    const filterIndicator = this.showFilters ? chalk.yellow('[F]ilter ON') : '[F]ilter OFF';
    
    const headerText = `Claude Monitor    ${status}    ${eventCount} events    ${filterIndicator}`;
    this.headerBox.setContent(headerText);
  }

  private updateChart() {
    const maxValue = Math.max(...this.chartData, 1);
    const bars = this.chartData.map(value => {
      const height = Math.round((value / maxValue) * 3);
      switch (height) {
        case 0: return '▁';
        case 1: return '▂';
        case 2: return '▃';
        case 3: return '▅';
        default: return '▇';
      }
    }).join('');

    const chartText = `Activity (3m): ${bars}`;
    this.chartBox.setContent(chartText);
  }

  private updateEventsList() {
    const filteredEvents = this.getFilteredEvents();
    const items = filteredEvents.slice(-100).map(event => {
      const emoji = EVENT_EMOJIS[event.hook_event_type] || EVENT_EMOJIS.default;
      const timestamp = this.formatTimestamp(event.timestamp);
      const sessionId = event.session_id.substring(0, 8);
      const summary = this.getEventSummary(event);
      
      return `${timestamp} ${emoji} ${event.hook_event_type.padEnd(12)} ${sessionId} ${summary}`;
    });

    this.eventsList.setItems(items);
    this.eventsList.scrollTo(items.length - 1);
  }

  private updateFilters() {
    if (!this.showFilters) return;

    const filterText = [
      'Filters (press number to edit, [c] to clear):',
      `[1] Source App: ${this.filters.sourceApp || 'all'}`,
      `[2] Session ID: ${this.filters.sessionId || 'all'}`,
      `[3] Event Type: ${this.filters.eventType || 'all'}`
    ].join('\n');

    this.filterBox.setContent(filterText);
  }

  private toggleFilters() {
    this.showFilters = !this.showFilters;
    this.filterBox.hidden = !this.showFilters;
    
    // Adjust events list position
    if (this.showFilters) {
      this.eventsList.top = 14;
      this.eventsList.height = '100%-14';
    } else {
      this.eventsList.top = 9;
      this.eventsList.height = '100%-9';
    }

    this.updateFilters();
    this.updateHeader();
    this.screen.render();
  }

  private async setFilter(filterType: keyof FilterState) {
    // Simple prompt for filter value
    const currentValue = this.filters[filterType] || '';
    
    // For now, just cycle through available values
    const availableValues = this.getAvailableFilterValues(filterType);
    const currentIndex = availableValues.indexOf(currentValue);
    const nextIndex = (currentIndex + 1) % (availableValues.length + 1);
    
    this.filters[filterType] = nextIndex === availableValues.length ? '' : availableValues[nextIndex];
    
    this.updateFilters();
    this.updateDisplay();
  }

  private clearFilters() {
    this.filters = {};
    this.updateFilters();
    this.updateDisplay();
  }

  private getAvailableFilterValues(filterType: keyof FilterState): string[] {
    switch (filterType) {
      case 'sourceApp':
        return [...new Set(this.events.map(e => e.source_app))];
      case 'sessionId':
        return [...new Set(this.events.map(e => e.session_id))];
      case 'eventType':
        return [...new Set(this.events.map(e => e.hook_event_type))];
      default:
        return [];
    }
  }

  private getFilteredEvents(): HookEvent[] {
    return this.events.filter(event => {
      if (this.filters.sourceApp && event.source_app !== this.filters.sourceApp) {
        return false;
      }
      if (this.filters.sessionId && event.session_id !== this.filters.sessionId) {
        return false;
      }
      if (this.filters.eventType && event.hook_event_type !== this.filters.eventType) {
        return false;
      }
      return true;
    });
  }

  private formatTimestamp(timestamp?: number | string): string {
    if (!timestamp) return '??:??:??';
    
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) : timestamp);
    return date.toLocaleTimeString('en-US', { hour12: false });
  }

  private getEventSummary(event: HookEvent): string {
    if (event.summary) {
      return event.summary.substring(0, 50);
    }
    
    // Create summary from payload
    const payload = event.payload;
    if (payload.tool_name) {
      const toolInput = payload.tool_input?.command || payload.tool_input?.query || '';
      return `${payload.tool_name}: ${toolInput.substring(0, 30)}`;
    }
    
    return JSON.stringify(payload).substring(0, 40);
  }

  private cleanup() {
    if (this.ws) {
      this.ws.close();
    }
    if (this.screen) {
      this.screen.destroy();
    }
  }
}

// CLI setup
const program = new Command();

program
  .name('claude-monitor')
  .description('CLI monitoring tool for Claude Code observability')
  .version('1.0.0')
  .option('-s, --server <url>', 'WebSocket server URL', 'ws://localhost:4000/stream')
  .action(async (options: { server: string }) => {
    const monitor = new ClaudeMonitor(options.server);
    
    process.on('SIGINT', () => {
      monitor['cleanup']();
      process.exit(0);
    });
    
    await monitor.start();
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse(process.argv);
}