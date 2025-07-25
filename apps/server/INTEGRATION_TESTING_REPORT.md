# Integration Testing Report for Next.js Migration

## Executive Summary

This report analyzes the current testing infrastructure of the Multi-Agent Observability System and provides a comprehensive strategy for migrating the Vue.js client to Next.js while maintaining backward compatibility and ensuring seamless integration with the existing Bun server.

## Current Testing Approaches

### 1. System-Level Testing (`test-system.sh`)

The current testing approach uses a bash script that validates the entire system through:

- **Server Startup Validation**: Launches the Bun server and verifies it's running (PID check)
- **API Endpoint Testing**: Tests core HTTP endpoints:
  - POST `/events` - Event submission with JSON payload
  - GET `/events/filter-options` - Filter options retrieval
  - GET `/events/recent` - Recent events retrieval
- **Hook Integration Testing**: Tests the demo agent hook script execution
- **End-to-End Flow**: Validates the complete event flow from hook to server to storage

### 2. Manual Testing Process

The system relies on manual testing through:
- Starting server with `bun run dev`
- Starting client with `bun run dev`
- Opening browser at `http://localhost:5173`
- Manually triggering Claude Code commands to generate events

### 3. Testing Gaps Identified

- No unit tests for server endpoints
- No component tests for Vue.js client
- No WebSocket connection tests
- No database migration tests
- No error handling tests
- No performance/load tests
- No backward compatibility tests

## Critical Integration Points

### 1. HTTP API Integration

**Server Endpoints:**
- `POST /events` - Accepts HookEvent data
- `GET /events/recent` - Returns recent events with pagination
- `GET /events/filter-options` - Returns available filter values
- Theme API endpoints (POST, GET, PUT, DELETE)

**Data Contracts:**
```typescript
interface HookEvent {
  id?: number;
  source_app: string;
  session_id: string;
  hook_event_type: string;
  payload: Record<string, any>;
  chat?: any[];
  summary?: string;
  timestamp?: number;
}
```

### 2. WebSocket Integration

**Connection:** `ws://localhost:4000/stream`

**Message Types:**
- `initial` - Sends last 50 events on connection
- `event` - Real-time event updates

**Critical Behaviors:**
- Auto-reconnection after 3 seconds on disconnect
- Event limiting (default 100, configurable via env)
- Automatic cleanup of disconnected clients

### 3. Database Integration

**SQLite with WAL mode:**
- Events table with indexes on common query fields
- Themes, theme_shares, and theme_ratings tables
- Automatic schema migrations on startup

### 4. Hook System Integration

**Event Flow:**
1. Claude Code executes action
2. Hook scripts capture event data
3. `send_event.py` POSTs to server
4. Server validates and stores in SQLite
5. Server broadcasts via WebSocket
6. Clients update in real-time

## Test Scenarios from Documentation

### 1. Event Lifecycle Tests

- **PreToolUse Events**: Tool validation and blocking
- **PostToolUse Events**: Result capture and storage
- **Notification Events**: User interaction tracking
- **Stop Events**: Session completion with chat transcript
- **SubagentStop Events**: Subagent task completion
- **UserPromptSubmit Events**: User prompt logging (v1.0.54+)

### 2. Multi-Agent Scenarios

- Multiple agents sending events simultaneously
- Session isolation and tracking
- Event ordering and timestamp accuracy
- Filter functionality across apps/sessions

### 3. Error Scenarios

- Server unavailable during event submission
- Malformed event payloads
- WebSocket connection failures
- Database write failures
- Network interruptions

### 4. Performance Scenarios

- High-frequency event submission
- Large payload handling (chat transcripts)
- Multiple WebSocket clients
- Event limiting and cleanup

## Next.js Testing Strategy

### 1. Testing Framework Setup

```json
{
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "@types/jest": "^29.0.0",
    "msw": "^2.0.0",
    "cypress": "^13.0.0"
  }
}
```

### 2. Unit Testing Strategy

**API Integration Tests:**
```typescript
// __tests__/api/events.test.ts
describe('Events API', () => {
  it('should fetch recent events', async () => {
    const events = await fetchRecentEvents(50);
    expect(events).toHaveLength(50);
    expect(events[0]).toHaveProperty('source_app');
  });

  it('should handle API errors gracefully', async () => {
    // Mock server error
    const result = await fetchRecentEvents(50);
    expect(result).toEqual([]);
  });
});
```

**WebSocket Hook Tests:**
```typescript
// __tests__/hooks/useWebSocket.test.ts
describe('useWebSocket', () => {
  it('should establish connection on mount', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:4000/stream'));
    expect(result.current.isConnected).toBe(false);
    // Wait for connection
    await waitFor(() => expect(result.current.isConnected).toBe(true));
  });

  it('should handle reconnection', async () => {
    // Test auto-reconnect logic
  });
});
```

### 3. Integration Testing Strategy

**Cypress E2E Tests:**
```typescript
// cypress/e2e/event-flow.cy.ts
describe('Event Flow', () => {
  it('should display new events in real-time', () => {
    cy.visit('/');
    
    // Send test event via API
    cy.request('POST', 'http://localhost:4000/events', {
      source_app: 'test',
      session_id: 'cypress-test',
      hook_event_type: 'PreToolUse',
      payload: { tool: 'test' }
    });

    // Verify event appears in UI
    cy.contains('test').should('be.visible');
    cy.contains('PreToolUse').should('be.visible');
  });
});
```

### 4. Component Testing Strategy

**React Testing Library:**
```typescript
// __tests__/components/EventTimeline.test.tsx
describe('EventTimeline', () => {
  it('should render events with correct formatting', () => {
    const events = [mockEvent1, mockEvent2];
    render(<EventTimeline events={events} />);
    
    expect(screen.getByText('PreToolUse')).toBeInTheDocument();
    expect(screen.getByText('test-app')).toBeInTheDocument();
  });

  it('should handle empty state', () => {
    render(<EventTimeline events={[]} />);
    expect(screen.getByText('No events yet')).toBeInTheDocument();
  });
});
```

### 5. API Mocking Strategy

**MSW for Development/Testing:**
```typescript
// mocks/handlers.ts
export const handlers = [
  http.post('/events', async ({ request }) => {
    const event = await request.json();
    return HttpResponse.json({ ...event, id: Date.now() });
  }),

  http.get('/events/recent', () => {
    return HttpResponse.json(mockEvents);
  }),

  ws.link('ws://localhost:4000/stream').addEventListener('connection', ({ client }) => {
    client.send(JSON.stringify({ type: 'initial', data: mockEvents }));
  })
];
```

## Backward Compatibility Checklist

### 1. API Compatibility
- [ ] Maintain exact same request/response formats
- [ ] Support all existing query parameters
- [ ] Handle legacy payload structures
- [ ] Preserve CORS headers

### 2. WebSocket Compatibility
- [ ] Support same message format
- [ ] Maintain reconnection behavior
- [ ] Handle same event types
- [ ] Preserve event ordering

### 3. Feature Parity
- [ ] Event timeline with auto-scroll
- [ ] Multi-criteria filtering
- [ ] Live pulse chart
- [ ] Chat transcript viewer
- [ ] Theme management
- [ ] Dark/light mode toggle

### 4. Performance Requirements
- [ ] Event limiting (100 default)
- [ ] Smooth animations
- [ ] Real-time updates < 100ms
- [ ] Memory-efficient event storage

### 5. Environment Variables
- [ ] Support VITE_MAX_EVENTS_TO_DISPLAY
- [ ] Server URL configuration
- [ ] WebSocket URL configuration

## Migration Testing Plan

### Phase 1: Parallel Testing
1. Run Vue client and Next.js client side-by-side
2. Send events and verify both receive them
3. Compare UI behavior and performance
4. Validate all features work identically

### Phase 2: Integration Testing
1. Test with real Claude Code agents
2. Verify hook integrations work
3. Test multi-agent scenarios
4. Validate error handling

### Phase 3: Performance Testing
1. Load test with 1000+ events/minute
2. Test with 10+ concurrent WebSocket clients
3. Verify memory usage stays stable
4. Test reconnection under load

### Phase 4: User Acceptance Testing
1. Deploy to staging environment
2. Run through all user workflows
3. Test with actual Claude Code usage
4. Gather feedback and iterate

## Testing Infrastructure Recommendations

### 1. CI/CD Pipeline
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
      - run: bun run build
      - run: bunx cypress run
```

### 2. Test Database
- Use in-memory SQLite for tests
- Seed with test data
- Reset between test runs

### 3. Test Utilities
```typescript
// test-utils/server.ts
export async function createTestServer() {
  const server = await startServer({ port: 0 });
  return {
    url: `http://localhost:${server.port}`,
    ws: `ws://localhost:${server.port}/stream`,
    cleanup: () => server.stop()
  };
}
```

### 4. Monitoring & Alerting
- Track test execution time
- Monitor flaky tests
- Alert on test failures
- Generate coverage reports

## Conclusion

The Next.js migration requires comprehensive testing to ensure backward compatibility and maintain system reliability. The proposed testing strategy covers unit, integration, and end-to-end testing while preserving all critical integration points. Following this plan will ensure a smooth migration with minimal risk to existing functionality.

## Next Steps

1. Set up testing infrastructure in Next.js client
2. Implement unit tests for critical components
3. Create integration test suite
4. Establish CI/CD pipeline
5. Begin parallel testing phase