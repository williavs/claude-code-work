# CLI Monitoring Tool - Complete Technical Specification

> **Enhanced Ink React-based terminal monitoring for the Claude Code observability system**

## Executive Summary

A comprehensive, production-ready CLI tool built with Ink React framework that provides real-time monitoring, management, and observability for the Claude Code multi-agent orchestration system. This technical specification covers architecture, implementation details, API integration, performance optimization, and extensibility guidelines for developers and system administrators.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [React Component Architecture](#react-component-architecture) 
3. [WebSocket Integration](#websocket-integration)
4. [Configuration System](#configuration-system)
5. [Performance Metrics](#performance-metrics)
6. [API Documentation](#api-documentation)
7. [Extension Guidelines](#extension-guidelines)
8. [Command Reference](#command-reference)
9. [Technical Implementation](#technical-implementation)
10. [Security & Deployment](#security--deployment)

## Architecture Overview

The CLI tool is built on a modern, modular architecture leveraging React components in the terminal environment through the Ink framework. This approach provides familiar development patterns while delivering high-performance terminal interfaces.

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLI Tool Architecture                        │
├─────────────────────────────────────────────────────────────────┤
│  Terminal Interface Layer (Ink React Components)               │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐      │
│  │  Dashboard  │   Stream    │   Charts    │   Config    │      │
│  │  Component  │  Component  │  Component  │  Component  │      │
│  └─────────────┴─────────────┴─────────────┴─────────────┘      │
├─────────────────────────────────────────────────────────────────┤
│  Application Layer (Business Logic)                            │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐      │
│  │   Event     │   Agent     │   System    │   Export    │      │
│  │  Manager    │  Manager    │  Monitor    │  Manager    │      │
│  └─────────────┴─────────────┴─────────────┴─────────────┘      │
├─────────────────────────────────────────────────────────────────┤
│  Data Layer (API & WebSocket Clients)                          │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐      │
│  │  REST API   │  WebSocket  │  Database   │   Config    │      │
│  │   Client    │   Client    │   Client    │   Store     │      │
│  └─────────────┴─────────────┴─────────────┴─────────────┘      │
├─────────────────────────────────────────────────────────────────┤
│  Infrastructure Layer                                          │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐      │
│  │ Observ.     │   Tmux      │  Database   │  External   │      │
│  │  Server     │ Orchestr.   │  (SQLite)   │    APIs     │      │
│  └─────────────┴─────────────┴─────────────┴─────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Project Structure

```
apps/cli-tool/
├── src/
│   ├── index.ts                    # Application entry point
│   ├── app.tsx                     # Main Ink React application
│   ├── commands/                   # Command handlers
│   │   ├── stream.tsx              # Real-time event streaming
│   │   ├── dashboard.tsx           # Interactive dashboard
│   │   ├── search.tsx              # Event search interface
│   │   ├── agents.tsx              # Agent management
│   │   ├── config.tsx              # Configuration management
│   │   └── export.tsx              # Data export utilities
│   ├── components/                 # Reusable React components
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Box.tsx             # Layout container
│   │   │   ├── Text.tsx            # Styled text component
│   │   │   ├── Table.tsx           # Data table component
│   │   │   ├── Chart.tsx           # ASCII chart component
│   │   │   ├── Spinner.tsx         # Loading indicator
│   │   │   └── StatusBar.tsx       # Status display
│   │   ├── EventList.tsx           # Event listing component
│   │   ├── LiveChart.tsx           # Real-time chart display
│   │   ├── AgentStatus.tsx         # Agent status display
│   │   ├── SystemHealth.tsx        # System health metrics
│   │   └── FilterPanel.tsx         # Event filtering interface
│   ├── hooks/                      # Custom React hooks
│   │   ├── useWebSocket.ts         # WebSocket connection hook
│   │   ├── useEventStream.ts       # Event streaming hook
│   │   ├── useSystemHealth.ts      # Health monitoring hook
│   │   ├── useAgentManager.ts      # Agent management hook
│   │   └── useConfig.ts            # Configuration hook
│   ├── services/                   # Core services
│   │   ├── api/                    # API clients
│   │   │   ├── ObservabilityAPI.ts # Main API client
│   │   │   ├── WebSocketClient.ts  # WebSocket client
│   │   │   ├── AgentAPI.ts         # Agent management API
│   │   │   └── SystemAPI.ts        # System monitoring API
│   │   ├── data/                   # Data management
│   │   │   ├── EventStore.ts       # Event caching/storage
│   │   │   ├── ConfigStore.ts      # Configuration storage
│   │   │   └── MetricsStore.ts     # Performance metrics
│   │   └── utils/                  # Utility functions
│   │       ├── formatters.ts       # Data formatting
│   │       ├── validators.ts       # Input validation
│   │       ├── logger.ts           # Logging utilities
│   │       └── performance.ts      # Performance monitoring
│   ├── types/                      # TypeScript type definitions
│   │   ├── events.ts               # Event type definitions
│   │   ├── agents.ts               # Agent type definitions
│   │   ├── config.ts               # Configuration types
│   │   └── api.ts                  # API response types
│   └── constants/                  # Application constants
│       ├── commands.ts             # Command definitions
│       ├── colors.ts               # Color scheme
│       └── defaults.ts             # Default configurations
├── dist/                           # Built application
├── tests/                          # Test suites
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   └── e2e/                        # End-to-end tests
├── docs/                           # Documentation
├── config/                         # Configuration files
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── jest.config.js                  # Test configuration
└── README.md                       # Project documentation
```

## React Component Architecture

The Ink-based CLI leverages React's component model to create maintainable, reusable terminal interfaces. Each component follows functional programming patterns with hooks for state management and side effects.

## Core Features

### 1. Real-time Event Monitoring
```bash
# Live event stream in terminal
claude-monitor stream

# Filter by session/app/type
claude-monitor stream --session abc123 --app claude-code --type tool_use

# Tail-like behavior with colors
claude-monitor tail -n 100 --follow
```

### 2. Event Search & Analysis
```bash
# Search events
claude-monitor search "error" --last 24h
claude-monitor search --session abc123 --type notification

# Event statistics
claude-monitor stats --daily
claude-monitor stats --by-session --last-week

# Export events
claude-monitor export --format json --output events.json
claude-monitor export --csv --session abc123
```

### 3. System Health Monitoring
```bash
# System overview
claude-monitor status

# Health check
claude-monitor health --detailed

# Service status
claude-monitor services
```

### 4. Agent Management
```bash
# List active tmux sessions
claude-monitor agents list

# Monitor specific agent
claude-monitor agents watch orchestrator

# Agent logs
claude-monitor agents logs project-manager
```

### 5. Dashboard & Visualization
```bash
# ASCII dashboard
claude-monitor dashboard

# Live charts in terminal
claude-monitor charts --type pulse
claude-monitor charts --type activity --session abc123
```

## Command Structure

### Main Commands

```bash
claude-monitor [command] [subcommand] [options]

Commands:
  stream      Real-time event monitoring
  search      Search historical events  
  stats       Event statistics and analysis
  export      Export events to various formats
  status      System status overview
  health      Health check and diagnostics
  services    Service management
  agents      Tmux agent management
  dashboard   Terminal dashboard
  charts      Live terminal charts
  config      Configuration management
```

### Global Options
```bash
--server-url    Observability server URL (default: http://localhost:4000)
--format        Output format: json, table, csv (default: table)
--no-color      Disable colored output
--config        Custom config file path
--verbose       Verbose output
--help          Show help
--version       Show version
```

## Technical Implementation

### Technology Stack
- **Runtime**: Bun (for speed and built-in SQLite)
- **CLI Framework**: Commander.js for command parsing
- **Terminal UI**: Blessed.js for rich terminal interfaces
- **Charts**: Asciichart for terminal charts
- **HTTP Client**: Built-in fetch for API calls
- **Colors**: Chalk for colored output

### API Integration
```typescript
// API client for observability server
class ObservabilityClient {
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getEvents(filters?: EventFilters): Promise<Event[]> {
    // GET /events with query parameters
  }

  async streamEvents(callback: (event: Event) => void): Promise<void> {
    // WebSocket connection to /stream
  }

  async getStats(timeRange?: string): Promise<Stats> {
    // GET /stats
  }

  async getSystemHealth(): Promise<HealthStatus> {
    // GET /health
  }
}
```

### Configuration
```json
{
  "server": {
    "url": "http://localhost:4000",
    "timeout": 5000
  },
  "display": {
    "colors": true,
    "maxEvents": 1000,
    "dateFormat": "YYYY-MM-DD HH:mm:ss",
    "tableStyle": "compact"
  },
  "dashboard": {
    "refreshInterval": 1000,
    "showCharts": true,
    "chartHeight": 10
  },
  "export": {
    "defaultFormat": "json",
    "timestampFormat": "iso"
  }
}
```

## Usage Examples

### Basic Monitoring
```bash
# Start monitoring
claude-monitor stream

# System overview
claude-monitor status
┌─────────────────────┬─────────┐
│ Component           │ Status  │
├─────────────────────┼─────────┤
│ Observability Server│ ✅ UP   │
│ Database            │ ✅ UP   │
│ WebSocket           │ ✅ UP   │
│ Tmux Orchestrator   │ ✅ UP   │
└─────────────────────┴─────────┘

Events: 1,247 total, 23 in last hour
Sessions: 5 active, 12 total today
```

### Advanced Monitoring
```bash
# Real-time dashboard
claude-monitor dashboard

╭─ Claude Code Observability Dashboard ─────────────────────────────╮
│                                                                    │
│ 📊 Events (last hour)    🔥 Hot Sessions           ⚡ Live Stream │
│ ┌─────────────────────┐  ┌──────────────────────┐  ┌─────────────┐│
│ │ tool_use    │ ████▌ │  │ abc123 │ 45 events  │  │ 14:23:45    ││
│ │ notification│ ██▌   │  │ def456 │ 32 events  │  │ tool_use    ││
│ │ stop        │ █     │  │ ghi789 │ 18 events  │  │ /read file  ││
│ └─────────────────────┘  └──────────────────────┘  └─────────────┘│
│                                                                    │
│ 🚨 Alerts: None         💾 DB: 1.2GB           🌐 Network: OK     │
╰────────────────────────────────────────────────────────────────────╯
```

### Event Analysis
```bash
# Search for errors
claude-monitor search "error" --last 24h --format table
┌──────────────────────┬─────────────┬───────────┬─────────────────┐
│ Timestamp            │ Session     │ Type      │ Message         │
├──────────────────────┼─────────────┼───────────┼─────────────────┤
│ 2025-01-15 14:20:15  │ abc123      │ tool_use  │ Command failed  │
│ 2025-01-15 13:45:32  │ def456      │ notification│ Network error │
└──────────────────────┴─────────────┴───────────┴─────────────────┘

# Export for analysis
claude-monitor export --session abc123 --format csv > session_abc123.csv
```

### Agent Management
```bash
# List agents
claude-monitor agents list
┌─────────────────┬────────┬──────────┬─────────────────────┐
│ Session         │ Status │ Windows  │ Last Activity       │
├─────────────────┼────────┼──────────┼─────────────────────┤
│ orchestrator    │ Active │ 3        │ 2 minutes ago       │
│ project-manager │ Active │ 2        │ 5 minutes ago       │
│ engineer-1      │ Active │ 1        │ 1 minute ago        │
└─────────────────┴────────┴──────────┴─────────────────────┘

# Watch agent activity
claude-monitor agents watch orchestrator
🤖 Orchestrator Activity Stream:
[14:25:12] Creating new project specification...
[14:25:15] Spawning project manager agent...
[14:25:18] Delegating task: "Implement user authentication"
[14:25:20] Monitoring agent progress...
```

## Installation & Setup

### Package Structure
```json
{
  "name": "@homelab/claude-monitor",
  "version": "1.0.0",
  "description": "CLI monitoring tool for Claude Code observability",
  "bin": {
    "claude-monitor": "./bin/claude-monitor"
  },
  "scripts": {
    "build": "bun build src/index.ts --outdir dist --target node",
    "dev": "bun --watch src/index.ts",
    "link": "npm link"
  },
  "dependencies": {
    "commander": "^12.0.0",
    "blessed": "^0.1.81",
    "chalk": "^5.3.0",
    "asciichart": "^1.5.25",
    "ws": "^8.16.0",
    "date-fns": "^3.2.0"
  }
}
```

### Build & Install
```bash
cd apps/cli-tool

# Install dependencies
bun install

# Build
bun run build

# Link globally
npm link

# Verify installation
claude-monitor --version
```

## Integration Points

### 1. Observability Server API
- REST endpoints for event querying
- WebSocket for real-time streaming
- Health check endpoints

### 2. Database Direct Access (optional)
- Direct SQLite queries for complex analysis
- Backup and maintenance operations

### 3. Tmux Session Management
- List active sessions
- Attach to sessions
- Monitor session activity

### 4. System Integration
- Service status checks
- Log file monitoring
- Process monitoring

## Advanced Features

### 1. Plugins System
```bash
# Plugin architecture for extensibility
claude-monitor plugins list
claude-monitor plugins install @homelab/cloudflare-plugin
claude-monitor plugins enable cloudflare
```

### 2. Scripting & Automation
```bash
# Script-friendly output
claude-monitor stats --json | jq '.eventsToday'

# Automation hooks
claude-monitor watch --command "alert.sh" --filter "type=error"
```

### 3. Remote Monitoring
```bash
# Monitor remote homelab
claude-monitor --server-url https://homelab.yourdomain.com stream

# SSH tunneling support
claude-monitor --ssh user@homelab.local stream
```

### 4. Performance Optimization
- Event caching for faster queries
- Efficient WebSocket handling
- Memory-optimized streaming
- Background data prefetching

## Security Considerations

### Authentication
- API key support for secured servers
- SSH key integration for remote access
- Config file encryption for sensitive data

### Network Security
- HTTPS/WSS support for remote connections
- Certificate validation
- Secure credential storage

## Development Roadmap

### Phase 1: Core Functionality (MVP)
- [x] Basic CLI structure
- [x] Event streaming and search
- [x] System status monitoring
- [x] Terminal UI components

### Phase 2: Advanced Features
- [ ] Agent management
- [ ] Dashboard and charts
- [ ] Export functionality
- [ ] Configuration management

### Phase 3: Integrations
- [ ] Cloudflare MCP integration
- [ ] Plugin system
- [ ] Remote monitoring
- [ ] Automation features

### Phase 4: Enterprise Features
- [ ] Multi-homelab support
- [ ] Advanced analytics
- [ ] Alerting system
- [ ] Performance profiling

## Next Steps

1. **Implement Core CLI** - Build basic command structure
2. **API Integration** - Connect to observability server
3. **Terminal UI** - Rich terminal interfaces
4. **Testing** - Comprehensive test suite
5. **Documentation** - Usage guides and examples

---

This CLI tool will provide powerful terminal-based monitoring and management capabilities for your homelab observability system, enabling both interactive use and automation scripting.