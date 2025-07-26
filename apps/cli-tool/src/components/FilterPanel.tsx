import React from 'react';
import { Box, Text } from 'ink';
import { FilterState } from '../types/index.js';

interface FilterPanelProps {
  filters: FilterState;
  visible: boolean;
  availableValues?: {
    sourceApp: string[];
    sessionId: string[];
    eventType: string[];
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  visible,
  availableValues 
}) => {
  if (!visible) return null;

  return (
    <Box borderStyle="single" borderColor="yellow" paddingX={2} paddingY={1}>
      <Box flexDirection="column">
        <Text color="yellow" bold>Filters (press number to edit, [c] to clear):</Text>
        <Box marginTop={1} flexDirection="column">
          <Text>
            [1] Source App: <Text color="green">{filters.sourceApp || 'all'}</Text>
            {availableValues && availableValues.sourceApp.length > 0 && (
              <Text color="gray"> ({availableValues.sourceApp.length} available)</Text>
            )}
          </Text>
          <Text>
            [2] Session ID: <Text color="green">{filters.sessionId || 'all'}</Text>
            {availableValues && availableValues.sessionId.length > 0 && (
              <Text color="gray"> ({availableValues.sessionId.length} available)</Text>
            )}
          </Text>
          <Text>
            [3] Event Type: <Text color="green">{filters.eventType || 'all'}</Text>
            {availableValues && availableValues.eventType.length > 0 && (
              <Text color="gray"> ({availableValues.eventType.length} available)</Text>
            )}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};