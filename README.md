# Claude Code Multi-Agent Ecosystem

A personal collection of recently released Claude Code tools and integrations, assembled to create a powerful AI development environment. This is more of a curated mashup than a polished product - it's what I use for my own development workflow across Mac and Ubuntu environments.

## 🎯 What This Is

This repository brings together several cutting-edge tools:

- **Multi-Agent Observability** - Real-time monitoring of Claude Code activities
- **Claude Flow** - 64 specialized AI agents (with memory optimization)
- **Claude Code Router** - Intelligent model switching between AI providers
- **Tmux Orchestrator** - 24/7 autonomous agent management
- **Git Worktrees Config** - Parallel development workflows
- **CLI Monitor** - Beautiful terminal UI for event tracking

## 🏗️ Architecture

```
Claude Agents → Hook Scripts → HTTP POST → Bun Server → SQLite → WebSocket → Vue Client
```

![Multi-Agent Observability Dashboard](images/Screenshot%202025-07-25%20at%208.21.10%20PM.png)

## 🚀 Quick Start

### Mac (Local Development)
```bash
# Start the observability system
./scripts/start-system.sh

# Visit http://localhost:5173 to see the dashboard
# Server runs on http://localhost:4000
```

### Ubuntu Server
See the comprehensive **[Ubuntu Homelab Setup Guide](config/ubuntu-homelab/README.md)** for:
- Complete system setup with all dependencies
- Cloudflare tunnel configuration
- 24/7 autonomous agent deployment
- Production-ready configuration

Or use the quick command once on Ubuntu:
```bash
claude /ubuntu-setup
```

## 📁 What's Included

### Core Components
- **`apps/server/`** - Bun TypeScript server with SQLite & WebSocket
- **`apps/client/`** - Vue 3 dashboard for real-time monitoring
- **`apps/cli-tool/`** - Ink.js React-based terminal monitor
- **`apps/new-client/`** - NextJS dashboard for real-time monitoring

### Tool Integrations
- **`claude-flow/`** - 64 specialized AI agents (optimized to 1.2GB RAM)
- **`claude-code-router/`** - Smart model switching (DeepSeek, Gemini, etc.)
- **`Tmux-Orchestrator/`** - Autonomous 24/7 agent management
- **`.claude/`** - Hooks system for capturing all events

### Configurations
- **`config/git-worktrees/`** - Parallel development setup
- **`config/ubuntu-homelab/`** - Complete Ubuntu server guide
- **`scripts/`** - Launch and management scripts

## 📁 Project Structure

```
claude-code-hooks-multi-agent-observability/
│
├── Tmux-Orchestrator/      # 24/7 Autonomous Development System
│   ├── README.md           # Complete orchestrator documentation
│   ├── CLAUDE.md           # Agent behavior instructions & best practices
│   ├── LEARNINGS.md        # Accumulated knowledge base
│   ├── schedule_with_note.sh    # Self-scheduling system
│   ├── send-claude-message.sh  # Inter-agent communication
│   ├── tmux_utils.py       # Tmux interaction utilities
│   └── Examples/           # Visual examples of autonomous teams
│
├── claude-flow/            # Advanced AI workflow orchestration
│   ├── benchmark/          # Performance testing suite
│   ├── docs/              # Comprehensive documentation
│   ├── examples/          # Workflow examples and demos
│   └── src/               # Core orchestration engine
│
├── apps/                   # Observability System Components
│   ├── server/             # Bun TypeScript server
│   │   ├── src/
│   │   │   ├── index.ts    # Main server with HTTP/WebSocket endpoints
│   │   │   ├── db.ts       # SQLite database management & migrations
│   │   │   └── types.ts    # TypeScript interfaces
│   │   ├── package.json
│   │   └── events.db       # SQLite database (gitignored)
│   │
│   └── client/             # Vue 3 TypeScript client
│       ├── src/
│       │   ├── App.vue     # Main app with theme & WebSocket management
│       │   ├── components/
│       │   │   ├── EventTimeline.vue      # Event list with auto-scroll
│       │   │   ├── EventRow.vue           # Individual event display
│       │   │   ├── FilterPanel.vue        # Multi-select filters
│       │   │   ├── ChatTranscriptModal.vue # Chat history viewer
│       │   │   ├── StickScrollButton.vue  # Scroll control
│       │   │   └── LivePulseChart.vue     # Real-time activity chart
│       │   ├── composables/
│       │   │   ├── useWebSocket.ts        # WebSocket connection logic
│       │   │   ├── useEventColors.ts      # Color assignment system
│       │   │   ├── useChartData.ts        # Chart data aggregation
│       │   │   └── useEventEmojis.ts      # Event type emoji mapping
│       │   ├── utils/
│       │   │   └── chartRenderer.ts       # Canvas chart rendering
│       │   └── types.ts    # TypeScript interfaces
│       ├── .env.sample     # Environment configuration template
│       └── package.json
│
├── .claude/                # Claude Code integration
│   ├── hooks/             # Hook scripts (Python with uv)
│   │   ├── send_event.py  # Universal event sender
│   │   ├── pre_tool_use.py    # Tool validation & blocking
│   │   ├── post_tool_use.py   # Result logging
│   │   ├── notification.py    # User interaction events
│   │   ├── user_prompt_submit.py # User prompt logging & validation
│   │   ├── stop.py           # Session completion
│   │   └── subagent_stop.py  # Subagent completion
│   │
│   └── settings.json      # Hook configuration
│
├── scripts/               # Utility scripts
│   ├── start-system.sh   # Launch server & client
│   ├── reset-system.sh   # Stop all processes
│   └── test-system.sh    # System validation
│
└── logs/                 # Application logs (gitignored)
```

## 🔧 Component Details

### 1. Hook System (`.claude/hooks/`)

> If you want to master claude code hooks watch [this video](https://github.com/disler/claude-code-hooks-mastery)

The hook system intercepts Claude Code lifecycle events:

- **`send_event.py`**: Core script that sends event data to the observability server
  - Supports `--add-chat` flag for including conversation history
  - Validates server connectivity before sending
  - Handles all event types with proper error handling

- **Event-specific hooks**: Each implements validation and data extraction
  - `pre_tool_use.py`: Blocks dangerous commands, validates tool usage
  - `post_tool_use.py`: Captures execution results and outputs
  - `notification.py`: Tracks user interaction points
  - `user_prompt_submit.py`: Logs user prompts, supports validation (v1.0.54+)
  - `stop.py`: Records session completion with optional chat history
  - `subagent_stop.py`: Monitors subagent task completion

### 2. Server (`apps/server/`)

Bun-powered TypeScript server with real-time capabilities:

- **Database**: SQLite with WAL mode for concurrent access
- **Endpoints**:
  - `POST /events` - Receive events from agents
  - `GET /events/recent` - Paginated event retrieval with filtering
  - `GET /events/filter-options` - Available filter values
  - `WS /stream` - Real-time event broadcasting
- **Features**:
  - Automatic schema migrations
  - Event validation
  - WebSocket broadcast to all clients
  - Chat transcript storage

### 3. Client (`apps/client/`)

Vue 3 application with real-time visualization:

- **Visual Design**:
  - Dual-color system: App colors (left border) + Session colors (second border)
  - Gradient indicators for visual distinction
  - Dark/light theme support
  - Responsive layout with smooth animations

- **Features**:
  - Real-time WebSocket updates
  - Multi-criteria filtering (app, session, event type)
  - Live pulse chart with session-colored bars and event type indicators
  - Time range selection (1m, 3m, 5m) with appropriate data aggregation
  - Chat transcript viewer with syntax highlighting
  - Auto-scroll with manual override
  - Event limiting (configurable via `VITE_MAX_EVENTS_TO_DISPLAY`)

- **Live Pulse Chart**:
  - Canvas-based real-time visualization
  - Session-specific colors for each bar
  - Event type emojis displayed on bars
  - Smooth animations and glow effects
  - Responsive to filter changes

## 🔄 Data Flow

1. **Event Generation**: Claude Code executes an action (tool use, notification, etc.)
2. **Hook Activation**: Corresponding hook script runs based on `settings.json` configuration
3. **Data Collection**: Hook script gathers context (tool name, inputs, outputs, session ID)
4. **Transmission**: `send_event.py` sends JSON payload to server via HTTP POST
5. **Server Processing**:
   - Validates event structure
   - Stores in SQLite with timestamp
   - Broadcasts to WebSocket clients
6. **Client Update**: Vue app receives event and updates timeline in real-time

## 🎨 Event Types & Visualization

| Event Type   | Emoji | Purpose               | Color Coding  | Special Display |
| ------------ | ----- | --------------------- | ------------- | --------------- |
| PreToolUse   | 🔧     | Before tool execution | Session-based | Tool name & details |
| PostToolUse  | ✅     | After tool completion | Session-based | Tool name & results |
| Notification | 🔔     | User interactions     | Session-based | Notification message |
| Stop         | 🛑     | Response completion   | Session-based | Summary & chat transcript |
| SubagentStop | 👥     | Subagent finished     | Session-based | Subagent details |
| PreCompact   | 📦     | Context compaction    | Session-based | Compaction details |
| UserPromptSubmit | 💬 | User prompt submission | Session-based | Prompt: _"user message"_ (italic) |

### UserPromptSubmit Event (v1.0.54+)

The `UserPromptSubmit` hook captures every user prompt before Claude processes it. In the UI:
- Displays as `Prompt: "user's message"` in italic text
- Shows the actual prompt content inline (truncated to 100 chars)
- Summary appears on the right side when AI summarization is enabled
- Useful for tracking user intentions and conversation flow

## 🔊 AI-Powered Contextual TTS System

The observability system includes an advanced AI-powered Text-to-Speech (TTS) completion system that provides intelligent, contextual voice notifications when agents complete tasks.

### **Key Features**

- **🤖 AI-Generated Messages**: Uses OpenAI GPT-4.1 to generate specific completion messages based on actual work performed
- **🎯 Context-Aware**: Analyzes session context, tool usage, and subagent details to create accurate announcements
- **🔄 Multiple TTS Providers**: Supports ElevenLabs (premium), OpenAI TTS, and pyttsx3 (local fallback)
- **📊 Rich Hook Data**: Leverages Claude Code's complete hook input structure for precise messaging

### **How It Works**

1. **Event Capture**: Hooks capture detailed completion context (tool usage, session data, subagent details)
2. **AI Analysis**: OpenAI GPT-4.1 analyzes the context to understand what was actually accomplished
3. **Smart Messaging**: Generates specific messages like "general-purpose agent searched codebase for auth patterns" instead of generic "task completed"
4. **Voice Delivery**: Announces completion through best available TTS provider

### **Supported Completion Types**

| Hook Event | Message Format | Example |
|------------|----------------|---------|
| `Stop` | `agent in {project} {accomplishment}` | "agent in webapp aligned tts approach" |
| `SubagentStop` | `{subagent_type} agent {action} {target} for {purpose}` | "search agent found 15 files matching criteria" |
| `Notification` | `{agent_name} wants to {action} for {reason}` | "code agent wants to edit main.py for bugfix" |

### **Configuration**

TTS is automatically enabled when you have the appropriate API keys:

```bash
# Priority order: ElevenLabs > OpenAI > pyttsx3
ELEVENLABS_API_KEY=your_key_here   # Highest quality (recommended)
OPENAI_API_KEY=your_key_here       # Good quality fallback
# pyttsx3 used as local fallback (no key required)
```

### **Enhanced Subagent Completion**

The `SubagentStop` hook now uses Claude Code's rich hook input data:

- **subagent_type**: Type of specialized agent (general-purpose, code-reviewer, etc.)
- **description**: Brief task description
- **prompt**: Full task prompt
- **tool_response**: Agent's complete response

This enables highly specific completion messages that accurately describe what each subagent accomplished, providing valuable feedback about autonomous agent activities.

## 🔗 **System Integration: Observability + Autonomous Development**

### **Monitoring Autonomous Teams**

The observability system can monitor your autonomous development teams in real-time:

1. **Deploy both systems together:**
   ```bash
   # Terminal 1: Start observability system
   ./scripts/start-system.sh
   
   # Terminal 2: Start autonomous development
   cd Tmux-Orchestrator
   tmux new-session -s orchestrator
   claude  # Brief as orchestrator
   ```

2. **Watch autonomous agents work:**
   - Visit `http://localhost:5173` to see the observability dashboard
   - Every autonomous agent action appears in real-time
   - Track commits, tool usage, and cross-agent communication
   - Get ElevenLabs voice notifications when autonomous tasks complete

### **Benefits of Integrated System**

- **📊 Complete Visibility**: See exactly what your autonomous teams are doing
- **🔔 Instant Notifications**: Voice alerts when agents complete major features
- **📈 Development Analytics**: Track autonomous productivity and patterns
- **🐛 Debug Autonomous Issues**: Identify when agents need intervention
- **📋 Autonomous Accountability**: Full audit trail of 24/7 development work

## 🔌 Integration

### For New Projects

1. Copy the event sender:
   ```bash
   cp .claude/hooks/send_event.py YOUR_PROJECT/.claude/hooks/
   ```

2. Add to your `.claude/settings.json`:
   ```json
   {
     "hooks": {
       "PreToolUse": [{
         "matcher": ".*",
         "hooks": [{
           "type": "command",
           "command": "uv run .claude/hooks/send_event.py --source-app YOUR_APP --event-type PreToolUse"
         }]
       }]
     }
   }
   ```

### For This Project

Already integrated! Hooks run both validation and observability:
```json
{
  "type": "command",
  "command": "uv run .claude/hooks/pre_tool_use.py"
},
{
  "type": "command", 
  "command": "uv run .claude/hooks/send_event.py --source-app cc-hooks-observability --event-type PreToolUse"
}
```

## 🧪 Testing

```bash
# System validation
./scripts/test-system.sh

# Manual event test
curl -X POST http://localhost:4000/events \
  -H "Content-Type: application/json" \
  -d '{
    "source_app": "test",
    "session_id": "test-123",
    "hook_event_type": "PreToolUse",
    "payload": {"tool_name": "Bash", "tool_input": {"command": "ls"}}
  }'
```

## ⚙️ Configuration

### Environment Variables

Copy `.env.sample` to `.env` in the project root and fill in your API keys:

**Application Root** (`.env` file):
- `ANTHROPIC_API_KEY` – Anthropic Claude API key (required)
- `ENGINEER_NAME` – Your name (for logging/identification)
- `GEMINI_API_KEY` – Google Gemini API key (optional)
- `OPENAI_API_KEY` – OpenAI API key (optional)
- `ELEVEN_API_KEY` – ElevenLabs API key (optional)

**Client** (`.env` file in `apps/client/.env`):
- `VITE_MAX_EVENTS_TO_DISPLAY=100` – Maximum events to show (removes oldest when exceeded)

### Server Ports

- Server: `4000` (HTTP/WebSocket)
- Client: `5173` (Vite dev server)

## 🛡️ Security Features

- Blocks dangerous commands (`rm -rf`, etc.)
- Prevents access to sensitive files (`.env`, private keys)
- Validates all inputs before execution
- No external dependencies for core functionality

## 🔧 Claude Code Configuration Management System

This system includes a powerful zsh-based configuration management toolkit that enables centralized development and distribution of Claude Code configurations across multiple projects.

### **Overview**

A command-line toolkit that manages Claude Code configurations across multiple projects, enabling centralized monitoring and distributed command development with a feedback loop where innovation in any project benefits all projects.

### **Directory Structure**

```
Master Configuration:
/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability/.claude/
├── commands/     # Custom Claude commands (.md files)
├── hooks/        # Event hooks for monitoring
│   ├── utils/    # Hook utilities
│   └── logs/     # Runtime logs (ignored by sync)
└── settings.json # Hook configuration

Global Configuration:
/Users/wvansickle/.claude/settings.json  # System-wide Claude settings

Project Configurations:
[any_project]/.claude/
├── commands/
├── hooks/
└── settings.json
```

### **Command Reference**

| Command | Purpose | Description |
|---------|---------|-------------|
| `cc-jw` | **Initialize new project** | Copies entire master .claude directory to current location |
| `cc-u` | **Pull commands selectively** | Shows only NEW commands, multi-select interface |
| `cc-gather` | **Harvest new commands** | Scans entire willycode directory for new .md files |
| `cc-u-hooks` | **Update current project hooks** | Shows diff and updates hooks with confirmation |
| `cc-u-hooks-global` | **Update all project hooks** | Batch updates all projects to match master hooks |
| `cc-u-settings-global` | **Update all settings.json** | Propagates master configuration everywhere |

### **Data Flow & Innovation Loop**

```
New Project Setup:
cc-jw → Full .claude copy → Ready to work

Command Development:
Create .md file → cc-gather → Master updated → cc-u → Deploy to other projects

Hook Updates:
Master hooks modified → cc-u-hooks (single) or cc-u-hooks-global (all) → Projects updated

Settings Propagation:
Master settings.json → cc-u-settings-global → All projects use same hooks
```

### **Key Design Principles**

- **No Accidental Overwrites**: Commands only add new files to master, never replace
- **Preview Changes**: Hook updates show diffs before applying
- **Selective Sync**: Can choose specific commands to pull
- **Centralized Innovation**: Any project can contribute new commands
- **Distributed Execution**: Same hooks run everywhere, report to one place

### **Monitoring Integration**

- Hook scripts use absolute paths
- All events route to localhost:4000
- Single server collects data from all Claude Code sessions
- SQLite database aggregates cross-project analytics
- Dashboard shows unified activity view

### **Safety Features**

- Always ignored during operations: `logs/`, `__pycache__/`, master directory itself
- Safety checks prevent running in master directory
- Validates directory existence before operations
- Creates missing directories as needed
- Confirmation prompts for destructive operations
- Backup creation for settings.json updates

This system creates a centralized command and configuration development hub while enabling distributed execution across all your projects, with complete observability into the entire ecosystem.

## 📊 Technical Stack

- **Server**: Bun, TypeScript, SQLite
- **Client**: Vue 3, TypeScript, Vite, Tailwind CSS
- **Hooks**: Python 3.8+, Astral uv, TTS (ElevenLabs or OpenAI), LLMs (Claude or OpenAI)
- **Configuration Management**: Zsh, native Unix tools for cross-project sync
- **Communication**: HTTP REST, WebSocket

## 🔧 Troubleshooting

### Hook Scripts Not Working

If your hook scripts aren't executing properly, it might be due to relative paths in your `.claude/settings.json`. Claude Code documentation recommends using absolute paths for command scripts.

**Solution**: Use the custom Claude Code slash command to automatically convert all relative paths to absolute paths:

```bash
# In Claude Code, simply run:
/convert_paths_absolute
```

This command will:
- Find all relative paths in your hook command scripts
- Convert them to absolute paths based on your current working directory
- Create a backup of your original settings.json
- Show you exactly what changes were made

This ensures your hooks work correctly regardless of where Claude Code is executed from.

## Master AI Coding
> And prepare for Agentic Engineering

Learn to code with AI with foundational [Principles of AI Coding](https://agenticengineer.com/principled-ai-coding?y=cchookobvs)

Follow the [IndyDevDan youtube channel](https://www.youtube.com/@indydevdan) for more AI coding tips and tricks.