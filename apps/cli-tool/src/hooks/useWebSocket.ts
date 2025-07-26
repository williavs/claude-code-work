import { useState, useEffect, useCallback, useRef } from 'react';
import { HookEvent, AppConfig } from '../types/index.js';
import { WebSocketService } from '../services/websocket.js';

interface UseWebSocketReturn {
  events: HookEvent[];
  isConnected: boolean;
  error: Error | null;
  reconnect: () => void;
  clearEvents: () => void;
}

export const useWebSocket = (config: AppConfig): UseWebSocketReturn => {
  const [events, setEvents] = useState<HookEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const wsServiceRef = useRef<WebSocketService | null>(null);
  
  const handleConnect = useCallback(() => {
    setIsConnected(true);
    setError(null);
  }, []);
  
  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
  }, []);
  
  const handleInitialData = useCallback((initialEvents: HookEvent[]) => {
    setEvents(initialEvents);
  }, []);
  
  const handleEvent = useCallback((event: HookEvent) => {
    setEvents(prev => {
      const newEvents = [...prev, event];
      // Keep only recent events to prevent memory issues
      return newEvents.length > config.maxEvents 
        ? newEvents.slice(-config.maxEvents) 
        : newEvents;
    });
  }, [config.maxEvents]);
  
  const handleError = useCallback((err: Error) => {
    setError(err);
  }, []);
  
  const reconnect = useCallback(() => {
    if (wsServiceRef.current) {
      wsServiceRef.current.disconnect();
    }
    
    wsServiceRef.current = new WebSocketService(config, {
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
      onInitialData: handleInitialData,
      onEvent: handleEvent,
      onError: handleError,
    });
    
    wsServiceRef.current.connect();
  }, [config, handleConnect, handleDisconnect, handleInitialData, handleEvent, handleError]);
  
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);
  
  useEffect(() => {
    // Initial connection
    reconnect();
    
    // Cleanup on unmount
    return () => {
      if (wsServiceRef.current) {
        wsServiceRef.current.disconnect();
      }
    };
  }, []);
  
  return {
    events,
    isConnected,
    error,
    reconnect,
    clearEvents,
  };
};