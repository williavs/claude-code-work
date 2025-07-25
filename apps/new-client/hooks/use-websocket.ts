'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { HookEvent, WebSocketMessage } from '@/lib/types';
import { WEBSOCKET_RECONNECT_DELAYS } from '@/lib/constants';
import { useEventStore } from '@/stores/event-store';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { setEvents, addEvent } = useEventStore();

  const connect = useCallback(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/stream';
    
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          switch (message.type) {
            case 'initial':
              if (Array.isArray(message.data)) {
                setEvents(message.data);
              }
              break;
            case 'event':
              if (!Array.isArray(message.data)) {
                addEvent(message.data as HookEvent);
              }
              break;
          }
        } catch (err) {
          setError('Failed to parse message');
        }
      };

      ws.onerror = () => {
        setError('WebSocket error');
      };

      ws.onclose = () => {
        setIsConnected(false);
        wsRef.current = null;
        
        const attemptIndex = Math.min(
          reconnectAttemptRef.current,
          WEBSOCKET_RECONNECT_DELAYS.length - 1
        );
        const baseDelay = WEBSOCKET_RECONNECT_DELAYS[attemptIndex];
        const jitter = Math.random() * 500;
        const delay = baseDelay + jitter;
        
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptRef.current++;
          connect();
        }, delay);
      };
    } catch (err) {
      setError('Failed to connect');
    }
  }, [setEvents, addEvent]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { isConnected, error };
}