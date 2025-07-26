import React, { useMemo } from 'react';
import { Box, Text } from 'ink';
import { HookEvent, EVENT_EMOJIS } from '../types/index.js';

interface EventListProps {
  events: HookEvent[];
  maxDisplay?: number;
}

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
    const toolInput = payload.tool_input?.command || 
                      payload.tool_input?.query || 
                      payload.tool_input?.file_path || '';
    return `${payload.tool_name}: ${toolInput.substring(0, 25)}`;
  }
  
  // Extract meaningful info from payload
  const keys = Object.keys(payload);
  if (keys.length > 0) {
    const firstKey = keys[0];
    const value = String(payload[firstKey]).substring(0, 30);
    return `${firstKey}: ${value}`;
  }
  
  return 'No details';
};

export const EventList: React.FC<EventListProps> = ({ 
  events, 
  maxDisplay = 15 
}) => {
  // Memoize the processed events to avoid re-computation
  const processedEvents = useMemo(() => {
    return events.slice(-maxDisplay).map((event, index) => ({
      key: `${event.id || index}-${event.timestamp}`,
      emoji: EVENT_EMOJIS[event.hook_event_type] || EVENT_EMOJIS.default,
      timestamp: formatTimestamp(event.timestamp),
      sessionId: event.session_id.substring(0, 8),
      summary: getEventSummary(event),
      eventType: event.hook_event_type,
    }));
  }, [events, maxDisplay]);

  return (
    <Box borderStyle="single" paddingX={1} flexDirection="column" flexGrow={1}>
      <Text color="cyan" bold>Recent Events ({events.length} total):</Text>
      <Box flexDirection="column" marginTop={1}>
        {processedEvents.length === 0 ? (
          <Text color="gray">No events yet...</Text>
        ) : (
          processedEvents.map((event) => (
            <Box key={event.key} flexDirection="row" gap={1}>
              <Text color="gray">{event.timestamp}</Text>
              <Text>{event.emoji}</Text>
              <Text color="yellow" bold>{event.eventType.padEnd(12)}</Text>
              <Text color="magenta">{event.sessionId}</Text>
              <Text color="white">{event.summary}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};