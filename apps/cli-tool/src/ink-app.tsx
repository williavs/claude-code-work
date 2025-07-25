#!/usr/bin/env node

import React, { useState, useEffect, useCallback } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
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

// Event type to emoji mapping
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

// Header Component
interface HeaderProps {
  isConnected: boolean;
  eventCount: number;
  showFilters: boolean;
}

const Header: React.FC<HeaderProps> = ({ isConnected, eventCount, showFilters }) => (
  <Box borderStyle="single" paddingX={2} paddingY={1}>
    <Box flexDirection="row" justifyContent="space-between" width="100%">
      <Text bold color="cyan">Claude Monitor</Text>
      <Box flexDirection="row" gap={2}>
        <Text color={isConnected ? "green" : "red"}>
          {isConnected ? "● Connected" : "● Offline"}
        </Text>
        <Text>{eventCount} events</Text>
        <Text color={showFilters ? "yellow" : "gray"}>
          [F]ilter {showFilters ? "ON" : "OFF"}
        </Text>
      </Box>
    </Box>
  </Box>
);

// Chart Component
interface ChartProps {
  chartData: number[];
}

const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const maxValue = Math.max(...chartData, 1);
  const bars = chartData.map(value => {
    const height = Math.round((value / maxValue) * 3);
    switch (height) {
      case 0: return '▁';
      case 1: return '▂';
      case 2: return '▃';
      case 3: return '▅';
      default: return '▇';
    }
  }).join('');

  return (
    <Box borderStyle="single" paddingX={2} paddingY={1}>
      <Text>
        <Text color="cyan" bold>Activity (3m): </Text>
        <Text color="blue">{bars}</Text>
      </Text>
    </Box>
  );
};

// Filter Component
interface FilterProps {
  filters: FilterState;
  visible: boolean;
}

const FilterPanel: React.FC<FilterProps> = ({ filters, visible }) => {
  if (!visible) return null;

  return (
    <Box borderStyle="single" borderColor="yellow" paddingX={2} paddingY={1}>
      <Box flexDirection="column">
        <Text color="yellow" bold>Filters (press number to edit, [c] to clear):</Text>
        <Text>[1] Source App: <Text color="green">{filters.sourceApp || 'all'}</Text></Text>
        <Text>[2] Session ID: <Text color="green">{filters.sessionId || 'all'}</Text></Text>
        <Text>[3] Event Type: <Text color="green">{filters.eventType || 'all'}</Text></Text>
      </Box>
    </Box>
  );
};

// Event List Component
interface EventListProps {
  events: HookEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const formatTimestamp = (timestamp?: number | string): string => {
    if (!timestamp) return '??:??:??';
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) : timestamp);
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  const getEventSummary = (event: HookEvent): string => {
    if (event.summary) {
      return event.summary.substring(0, 40);
    }
    
    const payload = event.payload;
    if (payload.tool_name) {
      const toolInput = payload.tool_input?.command || payload.tool_input?.query || '';
      return `${payload.tool_name}: ${toolInput.substring(0, 25)}`;
    }
    
    return JSON.stringify(payload).substring(0, 30);
  };

  const recentEvents = events.slice(-10); // Show last 10 events

  return (
    <Box borderStyle="single" paddingX={1} flexDirection="column" flexGrow={1}>
      <Text color="cyan" bold>Recent Events:</Text>
      {recentEvents.map((event, index) => {
        const emoji = EVENT_EMOJIS[event.hook_event_type] || EVENT_EMOJIS.default;
        const timestamp = formatTimestamp(event.timestamp);
        const sessionId = event.session_id.substring(0, 8);
        const summary = getEventSummary(event);
        
        return (
          <Box key={index} flexDirection="row" gap={1}>
            <Text color="gray">{timestamp}</Text>
            <Text>{emoji}</Text>
            <Text color="yellow" bold>{event.hook_event_type.padEnd(12)}</Text>
            <Text color="magenta">{sessionId}</Text>
            <Text>{summary}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

// Main App Component
interface AppProps {
  serverUrl: string;
}

const App: React.FC<AppProps> = ({ serverUrl }) => {
  const [events, setEvents] = useState<HookEvent[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  const [isConnected, setIsConnected] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [chartData, setChartData] = useState<number[]>(Array(60).fill(0));
  const [lastChartUpdate, setLastChartUpdate] = useState(0);
  const [ws, setWs] = useState<WebSocket | null>(null);
  
  const { exit } = useApp();
  const maxEvents = 1000;

  const updateChartData = useCallback(() => {
    const now = Date.now();
    const bucketIndex = Math.floor((now / 1000 / 3) % 60);
    
    if (bucketIndex !== lastChartUpdate) {
      setLastChartUpdate(bucketIndex);
      setChartData(prev => {
        const newData = [...prev];
        newData[bucketIndex] = 0;
        return newData;
      });
    }
    
    setChartData(prev => {
      const newData = [...prev];
      newData[bucketIndex]++;
      return newData;
    });
  }, [lastChartUpdate]);

  const connectWebSocket = useCallback(() => {
    if (ws) {
      ws.close();
    }

    try {
      const newWs = new WebSocket(serverUrl);
      
      newWs.on('open', () => {
        setIsConnected(true);
      });

      newWs.on('message', (data) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          
          if (message.type === 'initial') {
            const initialEvents = Array.isArray(message.data) ? message.data : [message.data];
            setEvents(initialEvents.slice(-maxEvents));
          } else if (message.type === 'event') {
            const event = message.data as HookEvent;
            setEvents(prev => {
              const newEvents = [...prev, event];
              return newEvents.length > maxEvents ? newEvents.slice(-maxEvents) : newEvents;
            });
            updateChartData();
          }
        } catch (err) {
          // Ignore parsing errors
        }
      });

      newWs.on('close', () => {
        setIsConnected(false);
        // Auto-reconnect after 3 seconds
        setTimeout(() => connectWebSocket(), 3000);
      });

      newWs.on('error', () => {
        setIsConnected(false);
      });

      setWs(newWs);
    } catch (err) {
      setIsConnected(false);
    }
  }, [ws, serverUrl, updateChartData, maxEvents]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const getAvailableFilterValues = (filterType: keyof FilterState): string[] => {
    switch (filterType) {
      case 'sourceApp':
        return [...new Set(events.map(e => e.source_app))];
      case 'sessionId':
        return [...new Set(events.map(e => e.session_id))];
      case 'eventType':
        return [...new Set(events.map(e => e.hook_event_type))];
      default:
        return [];
    }
  };

  const setFilter = (filterType: keyof FilterState) => {
    const availableValues = getAvailableFilterValues(filterType);
    const currentValue = filters[filterType] || '';
    const currentIndex = availableValues.indexOf(currentValue);
    const nextIndex = (currentIndex + 1) % (availableValues.length + 1);
    
    setFilters(prev => ({
      ...prev,
      [filterType]: nextIndex === availableValues.length ? '' : availableValues[nextIndex]
    }));
  };

  const getFilteredEvents = (): HookEvent[] => {
    return events.filter(event => {
      if (filters.sourceApp && event.source_app !== filters.sourceApp) return false;
      if (filters.sessionId && event.session_id !== filters.sessionId) return false;
      if (filters.eventType && event.hook_event_type !== filters.eventType) return false;
      return true;
    });
  };

  useInput((input: string, key: any) => {
    if (input === 'q' || key.ctrl && input === 'c') {
      exit();
    } else if (input === 'f') {
      setShowFilters(prev => !prev);
    } else if (input === 'r') {
      connectWebSocket();
    } else if (input === '1' && showFilters) {
      setFilter('sourceApp');
    } else if (input === '2' && showFilters) {
      setFilter('sessionId');
    } else if (input === '3' && showFilters) {
      setFilter('eventType');
    } else if (input === 'c' && showFilters) {
      setFilters({});
    }
  });

  const filteredEvents = getFilteredEvents();

  return (
    <Box flexDirection="column" height="100%">
      <Header 
        isConnected={isConnected} 
        eventCount={filteredEvents.length} 
        showFilters={showFilters} 
      />
      <Chart chartData={chartData} />
      <FilterPanel filters={filters} visible={showFilters} />
      <EventList events={filteredEvents} />
      <Box borderStyle="single" paddingX={2}>
        <Text color="gray">
          Controls: [q]uit [f]ilter [r]econnect | Filters: [1]app [2]session [3]type [c]lear
        </Text>
      </Box>
    </Box>
  );
};

// CLI setup
const program = new Command();

program
  .name('claude-monitor')
  .description('CLI monitoring tool for Claude Code observability')
  .version('1.0.0')
  .option('-s, --server <url>', 'WebSocket server URL', 'ws://localhost:4000/stream')
  .action(async (options: { server: string }) => {
    render(<App serverUrl={options.server} />);
  });

if (import.meta.url === `file://${process.argv[1]}`) {
  program.parse(process.argv);
}