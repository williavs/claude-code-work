# Testing Framework for CLI Monitoring Tool

This directory contains comprehensive tests for the Claude Code Multi-Agent Observability system.

## Directory Structure

```
tests/
├── README.md                    # This file
├── unit/                        # Unit tests for individual modules
│   ├── server/                  # Server module tests
│   ├── client/                  # Client component tests
│   └── hooks/                   # Python hook script tests
├── integration/                 # Integration tests
│   ├── api/                     # HTTP API endpoint tests
│   ├── websocket/              # WebSocket connection tests
│   └── end-to-end/             # Full workflow tests
├── performance/                 # Performance and load tests
│   ├── websocket-streaming/    # Real-time streaming tests
│   ├── chart-rendering/        # UI performance tests
│   └── benchmarks/             # Performance benchmarks
├── mocks/                      # Mock implementations
│   ├── websocket-server/       # Mock WebSocket server
│   ├── http-client/           # Mock HTTP client
│   └── claude-hooks/          # Mock hook responses
├── fixtures/                   # Test data and fixtures
│   ├── events/                # Sample event data
│   ├── sessions/              # Session data
│   └── configs/               # Test configurations
├── utils/                     # Test utilities and helpers
│   ├── test-server.ts         # Test server setup
│   ├── mock-websocket.ts      # WebSocket mocking utilities
│   └── event-generators.ts   # Event data generators
├── config/                    # Test configuration files
│   ├── jest.config.js         # Jest configuration
│   ├── vitest.config.ts       # Vitest configuration
│   ├── pytest.ini            # Pytest configuration
│   └── setup.ts              # Global test setup
└── manual/                    # Manual testing procedures
    ├── performance-benchmarks.md
    ├── ui-testing-checklist.md
    └── stress-testing-guide.md
```

## Test Categories

### Unit Tests
- **Server modules**: Database operations, event handling, WebSocket management
- **Client components**: Vue components, composables, chart rendering
- **Hook scripts**: Python scripts with mocked dependencies

### Integration Tests
- **API endpoints**: HTTP request/response testing
- **WebSocket connections**: Real-time communication testing
- **End-to-end workflows**: Complete agent interaction scenarios

### Performance Tests
- **Real-time streaming**: WebSocket event throughput and latency
- **Chart rendering**: Canvas performance with large datasets
- **Memory usage**: Long-running session monitoring

## Testing Tools

- **Jest**: Unit testing for JavaScript/TypeScript
- **Vitest**: Fast unit testing for Vue components
- **Pytest**: Python hook script testing
- **Supertest**: HTTP API testing
- **WebSocket testing**: Mock WebSocket implementations
- **Performance monitoring**: Custom benchmarking tools

## Running Tests

```bash
# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run performance tests
npm run test:performance

# Run Python hook tests
python -m pytest tests/unit/hooks/

# Run specific test file
npm test tests/unit/server/db.test.ts
```

## Test Data

Test fixtures include:
- Sample agent events (PreToolUse, PostToolUse, etc.)
- Session data with multiple agents
- WebSocket message formats
- Error scenarios and edge cases

## Manual Testing

See `manual/` directory for:
- Performance benchmark procedures
- UI testing checklists
- Stress testing scenarios
- Browser compatibility testing