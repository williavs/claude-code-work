import WebSocket from 'ws';
import EventEmitter from 'events';

export class WebSocketClient extends EventEmitter {
  constructor(url, reconnectDelay = 5000) {
    super();
    this.url = url;
    this.reconnectDelay = reconnectDelay;
    this.ws = null;
    this.reconnectTimeout = null;
    this.isReconnecting = false;
    this.shouldReconnect = true;
  }

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.on('open', () => {
        this.isReconnecting = false;
        this.clearReconnectTimeout();
        this.emit('connected');
      });

      this.ws.on('message', (data) => {
        try {
          const event = JSON.parse(data.toString());
          this.emit('event', event);
        } catch (error) {
          this.emit('error', new Error(`Failed to parse message: ${error.message}`));
        }
      });

      this.ws.on('close', () => {
        this.emit('disconnected');
        if (this.shouldReconnect && !this.isReconnecting) {
          this.scheduleReconnect();
        }
      });

      this.ws.on('error', (error) => {
        this.emit('error', error);
      });

    } catch (error) {
      this.emit('error', error);
      if (this.shouldReconnect && !this.isReconnecting) {
        this.scheduleReconnect();
      }
    }
  }

  scheduleReconnect() {
    if (this.isReconnecting) return;
    
    this.isReconnecting = true;
    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, this.reconnectDelay);
  }

  clearReconnectTimeout() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  reconnect() {
    this.close();
    this.shouldReconnect = true;
    this.connect();
  }

  close() {
    this.shouldReconnect = false;
    this.isReconnecting = false;
    this.clearReconnectTimeout();
    
    if (this.ws) {
      this.ws.removeAllListeners();
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
      this.ws = null;
    }
  }

  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  send(data) {
    if (this.isConnected()) {
      this.ws.send(JSON.stringify(data));
    }
  }
}