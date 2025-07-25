# Claude Code Multi-Agent Observability & Autonomous Development Hub

A comprehensive system for monitoring Claude Code agents with real-time observability, plus integration with cutting-edge autonomous AI development tools. This repository combines multi-agent observability with the revolutionary Tmux Orchestrator for 24/7 autonomous development.

## 🎯 Overview

This system combines two powerful capabilities:

### 🔍 **Multi-Agent Observability System**
Complete observability into Claude Code agent behavior by capturing, storing, and visualizing Claude Code [Hook events](https://docs.anthropic.com/en/docs/claude-code/hooks) in real-time. Monitor multiple concurrent agents with session tracking, event filtering, and live updates.

### 🤖 **Autonomous Development with Tmux Orchestrator**
Revolutionary AI agent management system that enables **24/7 autonomous software development**. Deploy self-managing AI teams that work continuously, schedule their own check-ins, and coordinate across multiple projects even when you're asleep.

<img src="images/app.png" alt="Multi-Agent Observability Dashboard" style="max-width: 800px; width: 100%;">

## 🚀 **What Makes This Special**

### **Autonomous AI Development Teams**
- **Self-scheduling agents** that work 24/7 in persistent tmux sessions
- **Three-tier hierarchy**: Orchestrator → Project Managers → Engineers
- **Cross-project coordination** with shared knowledge and learnings
- **Automatic git commits** every 30 minutes with quality enforcement
- **Continues working when laptop is closed** - true autonomous development

### **Complete Development Observability** 
- **Real-time monitoring** of all Claude Code agent activities
- **Session tracking** across multiple concurrent development projects
- **Event filtering and visualization** with live pulse charts
- **Chat transcript capture** with full conversation history
- **ElevenLabs voice notifications** when tasks complete

## 🏗️ Architecture

### **Observability Flow**
```
Claude Agents → Hook Scripts → HTTP POST → Bun Server → SQLite → WebSocket → Vue Client
```

### **Autonomous Development Flow**
```
Orchestrator → Project Managers → Engineers → Tmux Sessions → Self-Scheduling → 24/7 Development
```

![Agent Data Flow Animation](images/AgentDataFlowV2.gif)

## 📋 Setup Requirements

Before getting started, ensure you have the following installed:

- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** - Anthropic's official CLI for Claude
- **[Astral uv](https://docs.astral.sh/uv/)** - Fast Python package manager (required for hook scripts)
- **[Bun](https://bun.sh/)**, **npm**, or **yarn** - For running the server and client
- **Anthropic API Key** - Set as `ANTHROPIC_API_KEY` environment variable
- **OpenAI API Key** (optional) - For multi-model support with just-prompt MCP tool
- **ElevenLabs API Key** (optional) - For audio features

### 🐧 Complete Ubuntu Setup Guide

For a complete step-by-step Ubuntu installation guide including all dependencies, system configuration, and troubleshooting, see the **[Ubuntu Setup Guide](config/ubuntu-setup-guide.md)** in the `config/` directory.

### Configure .claude Directory

To setup observability in your repo,we need to copy the .claude directory to your project root.

To integrate the observability hooks into your projects:

1. **Copy the entire `.claude` directory to your project root:**
   ```bash
   cp -R .claude /path/to/your/project/
   ```

2. **Update the `settings.json` configuration:**
   
   Open `.claude/settings.json` in your project and modify the `source-app` parameter to identify your project:
   
   ```json
   {
     "hooks": {
       "PreToolUse": [{
         "matcher": "",
         "hooks": [
           {
             "type": "command",
             "command": "uv run .claude/hooks/pre_tool_use.py"
           },
           {
             "type": "command",
             "command": "uv run .claude/hooks/send_event.py --source-app YOUR_PROJECT_NAME --event-type PreToolUse --summarize"
           }
         ]
       }],
       "PostToolUse": [{
         "matcher": "",
         "hooks": [
           {
             "type": "command",
             "command": "uv run .claude/hooks/post_tool_use.py"
           },
           {
             "type": "command",
             "command": "uv run .claude/hooks/send_event.py --source-app YOUR_PROJECT_NAME --event-type PostToolUse --summarize"
           }
         ]
       }],
       "UserPromptSubmit": [{
         "hooks": [
           {
             "type": "command",
             "command": "uv run .claude/hooks/user_prompt_submit.py --log-only"
           },
           {
             "type": "command",
             "command": "uv run .claude/hooks/send_event.py --source-app YOUR_PROJECT_NAME --event-type UserPromptSubmit --summarize"
           }
         ]
       }]
       // ... (similar patterns for Notification, Stop, SubagentStop, PreCompact)
     }
   }
   ```
   
   Replace `YOUR_PROJECT_NAME` with a unique identifier for your project (e.g., `my-api-server`, `react-app`, etc.).

3. **Ensure the observability server is running:**
   ```bash
   # From the observability project directory (this codebase)
   ./scripts/start-system.sh
   ```

Now your project will send events to the observability system whenever Claude Code performs actions.

## 🤖 Autonomous Development with Tmux Orchestrator

The included **Tmux Orchestrator** enables truly autonomous AI development teams that work 24/7:

### **Quick Start - Autonomous Development**

1. **Deploy a Simple Autonomous Team:**
   ```bash
   # Start tmux session for a project
   tmux new-session -s my-project -c "/path/to/project"
   
   # Start Claude as Project Manager in window 0
   claude
   
   # Brief the PM
   "You are a Project Manager. Create an engineer in window 1 to implement 
   user authentication. Schedule check-ins every 30 minutes with:
   ./Tmux-Orchestrator/schedule_with_note.sh 30 'Check auth progress'"
   ```

2. **Deploy Full Orchestrator:**
   ```bash
   # Start orchestrator session
   tmux new-session -s orchestrator
   claude
   
   # Brief as orchestrator
   "You are the Orchestrator. Set up project managers for:
   1. Frontend (React app) - Add dashboard
   2. Backend (API) - Optimize queries
   Schedule yourself to check every hour."
   ```

### **Key Autonomous Features**

- **🔄 Self-Scheduling**: Agents schedule their own work using `schedule_with_note.sh`
- **👥 Team Hierarchy**: Orchestrator → Project Managers → Engineers
- **💾 Persistent Work**: Continues in tmux sessions even when disconnected
- **🔄 Auto-Commits**: Mandatory git commits every 30 minutes
- **📊 Cross-Project Intelligence**: Agents share learnings between projects
- **🎯 Quality Enforcement**: Project Managers enforce testing and code standards

### **Autonomous Development Benefits**

- **24/7 Development**: Your codebase improves while you sleep
- **Parallel Projects**: Multiple agent teams working simultaneously  
- **Quality Assurance**: Built-in PM oversight and git discipline
- **Continuous Learning**: Agents accumulate knowledge in `LEARNINGS.md`
- **Observable**: All autonomous activity appears in your observability dashboard

## 🚀 Quick Start - Observability

You can quickly view how this works by running this repositories .claude setup.

```bash
# 1. Start both server and client
./scripts/start-system.sh

# 2. Open http://localhost:5173 in your browser

# 3. Open Claude Code and run the following command:
Run git ls-files to understand the codebase.

# 4. Watch events stream in the client

# 5. Copy the .claude folder to other projects you want to emit events from.
cp -R .claude <directory of your codebase you want to emit events from>
```

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