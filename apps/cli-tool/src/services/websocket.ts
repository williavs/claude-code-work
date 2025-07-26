import WebSocket from 'ws';
import { WebSocketMessage, HookEvent, AppConfig } from '../types/index.js';
import { EventBuffer } from './eventBuffer.js';

export interface WebSocketCallbacks {
  onConnect: () => void;
  onDisconnect: () => void;
  onInitialData: (events: HookEvent[]) => void;
  onEvent: (event: HookEvent) => void;
  onError: (error: Error) => void;
}

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private eventBuffer: EventBuffer;
  private isDestroyed = false;
  
  constructor(
    private config: AppConfig,
    private callbacks: WebSocketCallbacks
  ) {
    // Set up event buffering to handle high-frequency events
    this.eventBuffer = new EventBuffer(
      (events) => {
        events.forEach(event => this.callbacks.onEvent(event));
      },
      config.bufferFlushInterval
    );
  }
  
  connect() {
    if (this.isDestroyed) return;
    
    try {
      this.ws = new WebSocket(this.config.serverUrl);
      
      this.ws.on('open', () => {
        this.clearReconnectTimer();
        this.callbacks.onConnect();
      });
      
      this.ws.on('message', (data) => {
        try {
          const message: WebSocketMessage = JSON.parse(data.toString());
          this.handleMessage(message);
        } catch (err) {
          this.callbacks.onError(new Error('Failed to parse WebSocket message'));
        }
      });
      
      this.ws.on('close', () => {
        this.callbacks.onDisconnect();
        this.scheduleReconnect();
      });
      
      this.ws.on('error', (err) => {
        this.callbacks.onError(err as Error);
        this.callbacks.onDisconnect();
      });
      
    } catch (err) {
      this.callbacks.onError(err as Error);
      this.callbacks.onDisconnect();
      this.scheduleReconnect();
    }
  }
  
  private handleMessage(message: WebSocketMessage) {
    if (message.type === 'initial') {
      const events = Array.isArray(message.data) ? message.data : [message.data];
      // Limit initial events to prevent memory issues
      const limitedEvents = events.slice(-this.config.maxEvents);
      this.callbacks.onInitialData(limitedEvents);
    } else if (message.type === 'event') {
      const event = message.data as HookEvent;
      // Buffer the event to prevent UI overload
      this.eventBuffer.add(event);
    }
  }
  
  private scheduleReconnect() {
    if (this.isDestroyed) return;
    
    this.clearReconnectTimer();
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, this.config.reconnectDelay);
  }
  
  private clearReconnectTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
  
  disconnect() {
    this.isDestroyed = true;
    this.clearReconnectTimer();
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.eventBuffer.destroy();
  }
}