import { HookEvent } from '../types/index.js';

export class EventBuffer {
  private buffer: HookEvent[] = [];
  private flushInterval: NodeJS.Timer | null = null;
  private maxBufferSize = 50;
  
  constructor(
    private onFlush: (events: HookEvent[]) => void,
    private flushIntervalMs: number = 100
  ) {
    this.startFlushing();
  }
  
  add(event: HookEvent) {
    this.buffer.push(event);
    
    // Force flush if buffer is getting too large
    if (this.buffer.length >= this.maxBufferSize) {
      this.flush();
    }
  }
  
  flush() {
    if (this.buffer.length === 0) return;
    
    // Send buffered events
    this.onFlush([...this.buffer]);
    
    // Clear buffer
    this.buffer = [];
  }
  
  private startFlushing() {
    this.flushInterval = setInterval(() => {
      this.flush();
    }, this.flushIntervalMs);
  }
  
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    this.flush(); // Final flush
  }
}