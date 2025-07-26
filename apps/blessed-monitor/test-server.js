import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 4000 });

console.log('Test WebSocket server running on ws://localhost:4000/stream');

const eventTypes = ['PreToolUse', 'PostToolUse', 'Notification', 'Stop', 'SubagentStop', 'UserPromptSubmit'];
const sourceApps = ['claude-code', 'vscode', 'terminal', 'browser'];

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  
  // Send a test event every 2 seconds
  const interval = setInterval(() => {
    const event = {
      hookEventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      sourceApp: sourceApps[Math.floor(Math.random() * sourceApps.length)],
      sessionId: `session-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      data: {
        message: 'Test event data'
      }
    };
    
    ws.send(JSON.stringify(event));
  }, 2000);
  
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clearInterval(interval);
  });
});

wss.on('error', (error) => {
  console.error('Server error:', error);
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  wss.close(() => {
    process.exit(0);
  });
});