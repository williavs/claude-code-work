import { useState, useMemo, useCallback } from 'react';
import { HookEvent, FilterState } from '../types/index.js';

interface UseEventStreamReturn {
  filteredEvents: HookEvent[];
  filters: FilterState;
  showFilters: boolean;
  toggleFilters: () => void;
  setFilter: (filterType: keyof FilterState, value: string | undefined) => void;
  clearFilters: () => void;
  getAvailableFilterValues: (filterType: keyof FilterState) => string[];
}

export const useEventStream = (events: HookEvent[]): UseEventStreamReturn => {
  const [filters, setFilters] = useState<FilterState>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (filters.sourceApp && event.source_app !== filters.sourceApp) return false;
      if (filters.sessionId && event.session_id !== filters.sessionId) return false;
      if (filters.eventType && event.hook_event_type !== filters.eventType) return false;
      return true;
    });
  }, [events, filters]);
  
  const getAvailableFilterValues = useCallback((filterType: keyof FilterState): string[] => {
    const uniqueValues = new Set<string>();
    
    events.forEach(event => {
      switch (filterType) {
        case 'sourceApp':
          uniqueValues.add(event.source_app);
          break;
        case 'sessionId':
          uniqueValues.add(event.session_id);
          break;
        case 'eventType':
          uniqueValues.add(event.hook_event_type);
          break;
      }
    });
    
    return Array.from(uniqueValues).sort();
  }, [events]);
  
  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);
  
  const setFilter = useCallback((filterType: keyof FilterState, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);
  
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);
  
  return {
    filteredEvents,
    filters,
    showFilters,
    toggleFilters,
    setFilter,
    clearFilters,
    getAvailableFilterValues,
  };
};