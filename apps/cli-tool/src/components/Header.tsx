import React from 'react';
import { Box, Text } from 'ink';

interface HeaderProps {
  isConnected: boolean;
  eventCount: number;
  showFilters: boolean;
  error?: Error | null;
}

export const Header: React.FC<HeaderProps> = ({ 
  isConnected, 
  eventCount, 
  showFilters, 
  error 
}) => (
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
    {error && (
      <Box marginTop={1}>
        <Text color="red">Error: {error.message}</Text>
      </Box>
    )}
  </Box>
);