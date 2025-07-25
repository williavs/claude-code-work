Last updated: Jul 25, 2025

Product Requirements Doc
Global Claude Code Multi-Agent Observability - 2A

Initiative or Epic
CLAUDE-FLOW-01: Universal Claude Code instance monitoring and observability

Document Owner
@William VanSickle III 

👷 Architecture Considerations
System Architecture Overview
Global monitoring system using absolute paths and centralized hook deployment:

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Claude Instance │────▶│  Master Hooks    │────▶│ Observability   │
│   (Project A)   │     │  (Absolute Path) │     │     Server      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
┌─────────────────┐            │                         │
│ Claude Instance │────────────┘                         │
│   (Project B)   │                                      ▼
└─────────────────┘                                ┌─────────────┐
┌─────────────────┐                                │  Dashboard  │
│ Claude Instance │                                │ (Port 5173) │
│   (Project N)   │                                └─────────────┘
└─────────────────┘
```

Key Design Decisions
- **Absolute Path Strategy**: All hooks reference `/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/`
- **Global Settings Deployment**: Copy master settings to `~/.claude/settings.json` for universal coverage
- **Centralized Data Collection**: Single server instance receives events from all Claude sessions
- **Project Context Enrichment**: Event metadata includes working directory and project identification

Performance Considerations
- Single server handles concurrent connections from multiple Claude instances
- Event deduplication by session ID and timestamp
- Database indexing on project_path, session_id, timestamp
- WebSocket connection pooling for real-time updates

🔄 Expected Flow
Global Monitoring Flow
1. User runs Claude Code in any directory
2. Global hooks (from `~/.claude/settings.json`) execute
3. Hook scripts send events to centralized server (localhost:4000)
4. Server enriches events with project context
5. Dashboard displays unified view of all Claude activity
6. Real-time monitoring across all active sessions

Data Flow Diagram
```
Any Claude Session → Global Hooks → Master Scripts → Central Server
                                                          ↓
                                                    Event Database
                                                          ↓
                                                   Unified Dashboard
```

➡️ New Endpoint(s) to Create
Observability Server
- `POST /events/project-context` - Enrich events with project metadata
- `GET /events/sessions` - List active Claude sessions
- `GET /events/projects` - List monitored projects
- `GET /dashboard/global` - Global activity overview

➡️ Existing Endpoint(s) to Edit
Event Collection
- `/events` - Add project_path, session_id enrichment
- `/events/recent` - Filter by project or session
- `/stream` - Broadcast project-specific events

🔢 Data Models
Global Event Model
```python
class GlobalClaudeEvent:
    session_id: str
    project_path: str
    project_name: str
    event_type: str
    timestamp: datetime
    tool_name: str
    working_directory: str
    git_branch: str
    git_status: str
    claude_instance: str
    completion_status: str
    audio_notification: bool
```

Session Context Model
```python
class SessionContext:
    session_id: str
    start_time: datetime
    end_time: Optional[datetime]
    project_path: str
    total_tools_used: int
    active_duration: timedelta
    completion_announced: bool
    voice_enabled: bool
```

👨‍👩‍👧‍👦 Related Actors and Objects
Actors
- **Developer**: Uses Claude Code across multiple projects
- **System Administrator**: Deploys and maintains global monitoring
- **Dashboard User**: Monitors Claude activity system-wide

Objects
- **Claude Instance**: Individual Claude Code session
- **Project Context**: Working directory and git information
- **Global Event**: Enriched event with cross-project metadata
- **Master Configuration**: Absolute path hook definitions

🙅‍♂️ Permissions
Deployment Requirements
- Write access to `~/.claude/settings.json`
- Execute permissions on master hook scripts
- Network access to localhost:4000 from all projects
- File system access for project context detection

Security Considerations
- Hook scripts run with user permissions
- No elevated privileges required
- Local network communication only
- Project paths logged for context

❓ Unknowns
- **Session Isolation**: How to prevent cross-project data leakage
- **Performance Impact**: Resource usage with many concurrent Claude instances  
- **Hook Conflicts**: Managing project-specific vs global hook interactions
- **Storage Growth**: Database size with continuous multi-project monitoring

🎲 Risks
Technical Risks
- **Single Point of Failure**: Central server down = no monitoring
  - Mitigation: Local event buffering, server health checks
- **Resource Contention**: Multiple Claude instances overwhelming server
  - Mitigation: Event throttling, connection limits
- **Path Dependencies**: Absolute paths break if master location changes
  - Mitigation: Environment variable configuration

Business Risks
- **Privacy Concerns**: Cross-project activity visibility
  - Mitigation: Project-level access controls
- **Storage Costs**: Continuous event collection growth
  - Mitigation: Data retention policies, event archiving

👕 Estimation
Implementation Effort
**Master Configuration Setup**: 2 hours
- Convert relative paths to absolute
- Update all hook commands
- Test path resolution

**Global Deployment**: 3 hours  
- Copy settings to `~/.claude/settings.json`
- Validate hook execution across projects
- Test event collection

**Dashboard Enhancement**: 4 hours
- Add project filtering
- Multi-session view
- Global activity timeline

**Testing & Validation**: 4 hours
- Test across multiple projects
- Verify event isolation
- Performance testing

Total Estimate: **13 hours**

🚀 Deployment Strategy
Phase 1: Master Configuration
1. Update all hook paths to absolute
2. Test in current project
3. Validate event collection

Phase 2: Global Rollout
1. Backup existing `~/.claude/settings.json`
2. Deploy master configuration globally
3. Test with multiple project directories

Phase 3: Monitoring & Optimization
1. Monitor server performance
2. Tune event collection rates
3. Optimize dashboard for multi-project view

Implementation Status
**Not Started** ⏳
- Absolute path conversion
- Global settings deployment  
- Multi-project dashboard
- Performance optimization

**Master Hook Architecture**
```json
{
  "hooks": {
    "PreToolUse": [{
      "hooks": [{
        "type": "command", 
        "command": "uv run /Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude/hooks/send_event.py --source-app global-claude-monitor --event-type PreToolUse --project-context"
      }]
    }],
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "uv run /Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude/hooks/stop.py --global-mode"
      }]
    }]
  }
}
```

Technical Debt & Future Improvements
- **Dynamic Path Resolution**: Environment-based hook script locations
- **Distributed Monitoring**: Support for remote Claude instances
- **Advanced Analytics**: Cross-project usage patterns
- **Hook Marketplace**: Shareable hook configurations
- **Enterprise Integration**: SSO and multi-user support