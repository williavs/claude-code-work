# WebSocket Event Schema

## Overview

This document defines the standardized WebSocket event schema for communication between all Claude Code ecosystem components.

## Event Structure

### Base Event Interface
```typescript
interface BaseEvent {
  id: string;                    // UUID v4
  timestamp: number;             // Unix timestamp in milliseconds
  source: string;                // Component name (e.g., "claude-router", "claude-flow")
  session_id: string;            // Session identifier
  event_type: string;            // Event type identifier
  version: "1.0";                // Schema version
}
```

### Hook Event (Claude Code Events)
```typescript
interface HookEvent extends BaseEvent {
  source_app: string;            // Application source
  hook_event_type: string;       // Specific hook type
  payload: Record<string, any>;  // Event-specific data
  chat?: ChatMessage[];          // Optional chat context
  summary?: string;              // Human-readable summary
}
```

### WebSocket Message Wrapper
```typescript
interface WebSocketMessage {
  type: 'initial' | 'event' | 'heartbeat' | 'error';
  data: HookEvent | HookEvent[] | HeartbeatData | ErrorData;
  metadata?: {
    server_time: number;
    message_id: string;
  };
}
```

## Event Types

### Claude Code Hook Events
```typescript
enum HookEventType {
  PreToolUse = "PreToolUse",
  PostToolUse = "PostToolUse",
  Notification = "Notification",
  Stop = "Stop",
  SubagentStop = "SubagentStop",
  UserPromptSubmit = "UserPromptSubmit",
  PreCompact = "PreCompact"
}
```

### System Events
```typescript
enum SystemEventType {
  ComponentStarted = "component.started",
  ComponentStopped = "component.stopped",
  ComponentHealthCheck = "component.health",
  RouterModelSwitch = "router.model.switch",
  FlowAgentSpawned = "flow.agent.spawned",
  FlowAgentCompleted = "flow.agent.completed",
  TmuxSessionCreated = "tmux.session.created",
  TmuxWindowChanged = "tmux.window.changed"
}
```

### Integration Events
```typescript
enum IntegrationEventType {
  WebSocketConnected = "ws.connected",
  WebSocketDisconnected = "ws.disconnected",
  EventBusMessage = "bus.message",
  ConfigurationChanged = "config.changed",
  ResourceAlert = "resource.alert"
}
```

## Event Payloads

### Tool Use Events
```typescript
interface ToolUsePayload {
  tool_name: string;
  tool_input?: {
    command?: string;
    query?: string;
    file_path?: string;
    [key: string]: any;
  };
  tool_output?: any;
  duration_ms?: number;
  error?: string;
}
```

### Agent Events
```typescript
interface AgentPayload {
  agent_id: string;
  agent_type: string;
  task?: string;
  status: 'spawned' | 'running' | 'completed' | 'failed';
  parent_agent?: string;
  result?: any;
}
```

### Resource Events
```typescript
interface ResourcePayload {
  component: string;
  metrics: {
    cpu_percent: number;
    memory_mb: number;
    active_connections: number;
    event_queue_size: number;
  };
  alert_level?: 'info' | 'warning' | 'critical';
  message?: string;
}
```

## Communication Patterns

### 1. Component Registration
```json
{
  "type": "event",
  "data": {
    "event_type": "component.started",
    "source": "claude-router",
    "timestamp": 1706181600000,
    "payload": {
      "version": "1.0.0",
      "capabilities": ["model-switching", "request-proxying"],
      "config": {
        "default_model": "claude-3-opus",
        "port": 3001
      }
    }
  }
}
```

### 2. Event Broadcasting
```json
{
  "type": "event",
  "data": {
    "event_type": "PreToolUse",
    "source": "claude-flow",
    "source_app": "agent-123",
    "session_id": "sess_abc123",
    "timestamp": 1706181600000,
    "payload": {
      "tool_name": "Bash",
      "tool_input": {
        "command": "npm test"
      }
    },
    "summary": "Running test suite"
  }
}
```

### 3. Health Monitoring
```json
{
  "type": "heartbeat",
  "data": {
    "components": {
      "claude-router": "healthy",
      "claude-flow": "healthy",
      "cli-monitor": "healthy",
      "tmux-orchestrator": "degraded"
    },
    "timestamp": 1706181600000,
    "next_check": 1706181630000
  }
}
```

## WebSocket Connection Management

### Client Connection
```typescript
const ws = new WebSocket('ws://localhost:4000/events');

ws.on('open', () => {
  // Send registration
  ws.send(JSON.stringify({
    type: 'register',
    data: {
      component: 'cli-monitor',
      version: '1.0.0',
      capabilities: ['display', 'filtering']
    }
  }));
});
```

### Server Broadcasting
```typescript
// Broadcast to all connected clients
function broadcastEvent(event: HookEvent) {
  const message: WebSocketMessage = {
    type: 'event',
    data: event,
    metadata: {
      server_time: Date.now(),
      message_id: generateUUID()
    }
  };
  
  wsClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}
```

## Error Handling

### Error Event Structure
```typescript
interface ErrorData {
  error_code: string;
  error_message: string;
  component: string;
  severity: 'warning' | 'error' | 'critical';
  context?: any;
  stack_trace?: string;
}
```

### Error Codes
```typescript
enum ErrorCode {
  WS_CONNECTION_FAILED = "WS001",
  WS_MESSAGE_PARSE_ERROR = "WS002",
  COMPONENT_TIMEOUT = "CMP001",
  COMPONENT_CRASH = "CMP002",
  RESOURCE_LIMIT_EXCEEDED = "RES001",
  CONFIGURATION_ERROR = "CFG001"
}
```

## Implementation Guidelines

### 1. Event Creation
- Always include required base fields
- Use consistent timestamp format (Unix ms)
- Generate unique IDs for tracking
- Include human-readable summaries when possible

### 2. Event Filtering
- Support filtering by event_type
- Support filtering by source component
- Support filtering by session_id
- Support time-based filtering

### 3. Performance Considerations
- Batch events when possible
- Implement event throttling for high-frequency events
- Use compression for large payloads
- Set reasonable timeout values

### 4. Security
- Validate all incoming events
- Sanitize event payloads
- Implement rate limiting
- Use authentication tokens for production

## Testing

### Event Validation
```typescript
function validateEvent(event: any): boolean {
  // Required fields
  if (!event.id || !event.timestamp || !event.source || !event.event_type) {
    return false;
  }
  
  // Timestamp validation
  if (typeof event.timestamp !== 'number' || event.timestamp < 0) {
    return false;
  }
  
  // Version check
  if (event.version !== "1.0") {
    return false;
  }
  
  return true;
}
```

### Test Event Generator
```typescript
function generateTestEvent(type: string): HookEvent {
  return {
    id: generateUUID(),
    timestamp: Date.now(),
    source: "test-generator",
    source_app: "test",
    session_id: "test_" + Date.now(),
    event_type: type,
    hook_event_type: type,
    version: "1.0",
    payload: {
      test: true,
      random: Math.random()
    },
    summary: `Test ${type} event`
  };
}
```

## Migration Path

For existing components:
1. Map current event fields to new schema
2. Add missing required fields
3. Implement version field
4. Update event consumers
5. Test with validation

This schema ensures consistent communication across all Claude Code ecosystem components while maintaining compatibility with existing Hook events.