import React, { useEffect, useCallback } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { AppConfig } from '../types/index.js';
import { useWebSocket } from '../hooks/useWebSocket.js';
import { useEventStream } from '../hooks/useEventStream.js';
import { useChartData } from '../hooks/useChartData.js';
import { Header } from './Header.js';
import { Chart } from './Chart.js';
import { FilterPanel } from './FilterPanel.js';
import { EventList } from './EventList.js';

interface AppProps {
  config: AppConfig;
}

export const App: React.FC<AppProps> = ({ config }) => {
  const { exit } = useApp();
  const { events, isConnected, error, reconnect } = useWebSocket(config);
  const { 
    filteredEvents, 
    filters, 
    showFilters, 
    toggleFilters, 
    setFilter, 
    clearFilters,
    getAvailableFilterValues 
  } = useEventStream(events);
  const { chartData, addEvent } = useChartData();

  // Update chart when new events arrive
  useEffect(() => {
    if (events.length > 0) {
      addEvent();
    }
  }, [events.length]);

  // Cycle through filter values
  const cycleFilter = useCallback((filterType: keyof typeof filters) => {
    const availableValues = getAvailableFilterValues(filterType);
    const currentValue = filters[filterType];
    
    if (!currentValue) {
      // No filter set, use first available value
      setFilter(filterType, availableValues[0]);
    } else {
      const currentIndex = availableValues.indexOf(currentValue);
      const nextIndex = (currentIndex + 1) % availableValues.length;
      
      if (nextIndex === 0) {
        // Cycled through all values, clear filter
        setFilter(filterType, undefined);
      } else {
        setFilter(filterType, availableValues[nextIndex]);
      }
    }
  }, [filters, getAvailableFilterValues, setFilter]);

  // Handle keyboard input
  useInput((input: string, key: any) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit();
    } else if (input === 'f') {
      toggleFilters();
    } else if (input === 'r') {
      reconnect();
    } else if (input === '1' && showFilters) {
      cycleFilter('sourceApp');
    } else if (input === '2' && showFilters) {
      cycleFilter('sessionId');
    } else if (input === '3' && showFilters) {
      cycleFilter('eventType');
    } else if (input === 'c' && showFilters) {
      clearFilters();
    }
  });

  const availableValues = {
    sourceApp: getAvailableFilterValues('sourceApp'),
    sessionId: getAvailableFilterValues('sessionId'),
    eventType: getAvailableFilterValues('eventType'),
  };

  return (
    <Box flexDirection="column" height="100%">
      <Header 
        isConnected={isConnected} 
        eventCount={filteredEvents.length} 
        showFilters={showFilters}
        error={error}
      />
      <Chart chartData={chartData} />
      <FilterPanel 
        filters={filters} 
        visible={showFilters}
        availableValues={availableValues}
      />
      <EventList events={filteredEvents} />
      <Box borderStyle="single" paddingX={2}>
        <Text color="gray">
          Controls: [q]uit [f]ilter [r]econnect | 
          {showFilters && ' Filters: [1]app [2]session [3]type [c]lear'}
        </Text>
      </Box>
    </Box>
  );
};