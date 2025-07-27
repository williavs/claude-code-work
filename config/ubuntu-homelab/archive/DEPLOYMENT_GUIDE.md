# Complete Deployment Guide

> **Deploy your AI-powered homelab infrastructure in 60 minutes**

## Overview

This guide walks you through deploying the complete Claude Code Multi-Agent Observability System on Ubuntu with Cloudflare Zero Trust.

**What you're building:**
- Self-managing AI infrastructure
- Real-time observability dashboard
- Secure remote access (no VPN)
- 24/7 autonomous agents
- Enterprise-grade monitoring

## Prerequisites Checklist

- [ ] Ubuntu Server 22.04 LTS (4GB RAM, 50GB storage)
- [ ] Domain registered with Cloudflare
- [ ] API Keys: Anthropic, OpenAI, ElevenLabs (optional)
- [ ] SSH access to server
- [ ] 60 minutes of time

## Step-by-Step Deployment

### Step 1: System Preparation (10 minutes)

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install core dependencies
sudo apt install -y curl wget git tmux sqlite3 python3.10 python3-pip nodejs npm build-essential

# 3. Install modern package managers
curl -fsSL https://bun.sh/install | bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc

# 4. Install Claude tools
npm install -g @anthropic-ai/claude-code @musistudio/claude-code-router

# 5. Install Cloudflare tunnel
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb && rm cloudflared.deb
```

### Step 2: Clone and Setup Repository (5 minutes)

```bash
# 1. Clone repository
git clone <your-repo-url> claude-observability
cd claude-observability

# 2. Create environment file
cat > .env << 'EOF'
# API Keys
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here

# Configuration
ENGINEER_NAME=Your Name
NODE_ENV=production
OBSERVABILITY_PORT=4000
CLIENT_PORT=5173
EOF

chmod 600 .env && source .env

# 3. Setup directories
sudo mkdir -p /opt/claude-observability/{data,config,logs,backups}
sudo chown -R $USER:$USER /opt/claude-observability
```

### Step 3: Deploy Core Components (15 minutes)

#### 3.1 Observability Server
```bash
cd apps/server

# Install dependencies
bun install

# Initialize database
bun run init-db

# Test server
bun run start &
sleep 3
curl http://localhost:4000/health
# Should return: {"status":"ok","database":"connected"}

# Stop test
pkill -f "bun.*server"
```

#### 3.2 Vue.js Dashboard
```bash
cd ../client

# Install dependencies  
bun install

# Build for production
bun run build

# Test client
bun run preview &
sleep 3
curl http://localhost:5173
# Should return HTML

# Stop test
pkill -f "bun.*client"
```

#### 3.3 Hooks System
```bash
cd ../../.claude

# Install Python dependencies
uv sync

# Test hooks
./test-hooks.sh
# Should show: "✅ All hooks functional"
```

### Step 4: Configure Cloudflare (10 minutes)

#### 4.1 Create Tunnel
```bash
# Authenticate with Cloudflare
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create homelab-observability

# Note the tunnel ID from output
TUNNEL_ID="your-tunnel-id-here"
```

#### 4.2 Configure DNS
```bash
# Add DNS records (replace yourdomain.com)
cloudflared tunnel route dns homelab-observability observability.yourdomain.com
cloudflared tunnel route dns homelab-observability api.yourdomain.com
```

#### 4.3 Create tunnel configuration
```bash
cat > ~/.cloudflared/config.yml << EOF
tunnel: homelab-observability
credentials-file: ~/.cloudflared/${TUNNEL_ID}.json

ingress:
  - hostname: observability.yourdomain.com
    service: http://localhost:5173
  - hostname: api.yourdomain.com  
    service: http://localhost:4000
  - service: http_status:404
EOF
```

### Step 5: Setup System Services (10 minutes)

#### 5.1 Create systemd services
```bash
# Server service
cat > ~/.config/systemd/user/claude-server.service << 'EOF'
[Unit]
Description=Claude Observability Server
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/$(whoami)/claude-observability/apps/server
ExecStart=/home/$(whoami)/.bun/bin/bun run start
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=default.target
EOF

# Client service
cat > ~/.config/systemd/user/claude-client.service << 'EOF'
[Unit]
Description=Claude Observability Client
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/$(whoami)/claude-observability/apps/client
ExecStart=/home/$(whoami)/.bun/bin/bun run preview --host 0.0.0.0
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=default.target
EOF

# Tunnel service
cat > ~/.config/systemd/user/cloudflared.service << 'EOF'
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/cloudflared tunnel run homelab-observability
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
EOF
```

#### 5.2 Enable and start services
```bash
# Reload systemd
systemctl --user daemon-reload

# Enable services
systemctl --user enable claude-server.service
systemctl --user enable claude-client.service  
systemctl --user enable cloudflared.service

# Start services
systemctl --user start claude-server.service
systemctl --user start claude-client.service
systemctl --user start cloudflared.service

# Enable user lingering (services start without login)
sudo loginctl enable-linger $USER
```

### Step 6: Deploy Terminal Monitoring System (15 minutes)

#### 6.1 Build CLI Monitoring Tool
```bash
cd apps/cli-tool

# Install Go dependencies
go mod init claude-monitoring-cli
go mod tidy

# Build the CLI tool
cat > main.go << 'EOF'
package main

import (
    "bufio"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "time"
    "github.com/gorilla/websocket"
    "github.com/fatih/color"
)

type Event struct {
    ID        string    `json:"id"`
    Timestamp time.Time `json:"timestamp"`
    Type      string    `json:"type"`
    AppName   string    `json:"app_name"`
    Data      json.RawMessage `json:"data"`
}

func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: monitor [watch|events|health]")
        os.Exit(1)
    }

    serverURL := os.Getenv("MONITOR_SERVER_URL")
    if serverURL == "" {
        serverURL = "http://localhost:4000"
    }

    switch os.Args[1] {
    case "watch":
        watchEvents(serverURL)
    case "events":
        getEvents(serverURL)
    case "health":
        checkHealth(serverURL)
    default:
        fmt.Println("Unknown command:", os.Args[1])
    }
}

func watchEvents(serverURL string) {
    u := "ws" + serverURL[4:] + "/ws"
    c, _, err := websocket.DefaultDialer.Dial(u, nil)
    if err != nil {
        log.Fatal("dial:", err)
    }
    defer c.Close()

    fmt.Println("🔴 Live monitoring active - Press Ctrl+C to stop")
    
    for {
        _, message, err := c.ReadMessage()
        if err != nil {
            log.Println("read:", err)
            return
        }
        
        var event Event
        if err := json.Unmarshal(message, &event); err != nil {
            continue
        }
        
        formatEvent(event)
    }
}

func getEvents(serverURL string) {
    resp, err := http.Get(serverURL + "/events?limit=20")
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    var events []Event
    if err := json.NewDecoder(resp.Body).Decode(&events); err != nil {
        log.Fatal(err)
    }

    fmt.Println("📊 Recent Events:")
    for _, event := range events {
        formatEvent(event)
    }
}

func checkHealth(serverURL string) {
    resp, err := http.Get(serverURL + "/health")
    if err != nil {
        color.Red("❌ Server unreachable")
        os.Exit(1)
    }
    defer resp.Body.Close()

    var health map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&health); err != nil {
        color.Red("❌ Invalid health response")
        os.Exit(1)
    }

    if health["status"] == "ok" {
        color.Green("✅ System healthy")
        color.Blue("Database: %v", health["database"])
    } else {
        color.Red("❌ System unhealthy")
        os.Exit(1)
    }
}

func formatEvent(event Event) {
    timestamp := event.Timestamp.Format("15:04:05")
    
    switch event.Type {
    case "tool_use":
        color.Cyan("🔧 [%s] %s - Tool used", timestamp, event.AppName)
    case "error":
        color.Red("❌ [%s] %s - Error occurred", timestamp, event.AppName)
    case "completion":
        color.Green("✅ [%s] %s - Task completed", timestamp, event.AppName)
    default:
        color.White("📝 [%s] %s - %s", timestamp, event.AppName, event.Type)
    }
}
EOF

# Build the binary
go build -o monitor main.go

# Install globally
sudo cp monitor /usr/local/bin/monitor
sudo chmod +x /usr/local/bin/monitor

# Test the CLI tool
monitor health
```

#### 6.2 Setup WebSocket Server
```bash
cd ../server

# Add WebSocket support to the server
cat >> src/index.ts << 'EOF'

import { WebSocketServer } from 'ws';

// WebSocket server for real-time monitoring
const wss = new WebSocketServer({ port: 4001 });

wss.on('connection', (ws) => {
    console.log('Monitoring client connected');
    
    // Send recent events on connection
    db.all('SELECT * FROM events ORDER BY timestamp DESC LIMIT 50', (err, rows) => {
        if (!err && rows) {
            rows.reverse().forEach(row => {
                ws.send(JSON.stringify(row));
            });
        }
    });
    
    ws.on('close', () => {
        console.log('Monitoring client disconnected');
    });
});

// Broadcast new events to all connected clients
export function broadcastEvent(event: any) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event));
        }
    });
}

// Update the event insertion to broadcast
const originalInsert = db.run;
db.run = function(sql: string, params: any[], callback?: Function) {
    if (sql.includes('INSERT INTO events')) {
        // Broadcast the event after insertion
        setTimeout(() => {
            db.get('SELECT * FROM events ORDER BY id DESC LIMIT 1', (err, row) => {
                if (!err && row) {
                    broadcastEvent(row);
                }
            });
        }, 100);
    }
    return originalInsert.call(this, sql, params, callback);
};
EOF

# Install WebSocket dependencies
bun add ws @types/ws

# Rebuild the server
bun run build
```

#### 6.3 Create Monitoring Scripts
```bash
# Create monitoring script directory
mkdir -p /opt/claude-observability/scripts

# Real-time dashboard script
cat > /opt/claude-observability/scripts/dashboard.sh << 'EOF'
#!/bin/bash

# Terminal dashboard for monitoring
while true; do
    clear
    echo "🚀 Claude Observability Dashboard"
    echo "=================================="
    echo "📅 $(date)"
    echo ""
    
    # System health
    echo "🔍 System Health:"
    monitor health 2>/dev/null && echo "✅ API Server: UP" || echo "❌ API Server: DOWN"
    systemctl --user is-active claude-client.service >/dev/null && echo "✅ Dashboard: UP" || echo "❌ Dashboard: DOWN"
    systemctl --user is-active cloudflared.service >/dev/null && echo "✅ Tunnel: UP" || echo "❌ Tunnel: DOWN"
    echo ""
    
    # Recent activity
    echo "📊 Recent Activity (Last 5 events):"
    monitor events 2>/dev/null | head -5
    echo ""
    
    # System resources
    echo "💻 System Resources:"
    echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)%"
    echo "Memory: $(free | awk 'FNR==2{printf "%.1f%%", $3/($3+$4)*100}')"
    echo "Disk: $(df -h / | awk 'FNR==2{print $5}')"
    echo ""
    
    echo "Press Ctrl+C to exit"
    sleep 30
done
EOF

chmod +x /opt/claude-observability/scripts/dashboard.sh

# Event filtering script
cat > /opt/claude-observability/scripts/filter-events.sh << 'EOF'
#!/bin/bash

# Filter events by type or application
TYPE=$1
APP=$2

if [ -z "$TYPE" ]; then
    echo "Usage: $0 <event_type> [app_name]"
    echo "Event types: tool_use, error, completion, notification"
    exit 1
fi

if [ -n "$APP" ]; then
    curl -s "http://localhost:4000/events" | jq ".[] | select(.type==\"$TYPE\" and .app_name==\"$APP\")"
else
    curl -s "http://localhost:4000/events" | jq ".[] | select(.type==\"$TYPE\")"
fi
EOF

chmod +x /opt/claude-observability/scripts/filter-events.sh
```

### Step 7: Setup Tmux Orchestrator (5 minutes)

```bash
cd Tmux-Orchestrator

# Make scripts executable
chmod +x *.sh

# Initialize orchestrator session
tmux new-session -d -s orchestrator
tmux send-keys -t orchestrator "cd $(pwd)" Enter
tmux send-keys -t orchestrator "./schedule_with_note.sh 'Homelab deployment complete - starting autonomous operations'" Enter

# Verify orchestrator is running
tmux list-sessions | grep orchestrator
```

### Step 7: Setup MCP Servers (5 minutes)

```bash
# Add all Cloudflare MCP servers
claude mcp add --transport sse cloudflare-docs https://docs.mcp.cloudflare.com/sse
claude mcp add --transport sse cloudflare-bindings https://bindings.mcp.cloudflare.com/sse
claude mcp add --transport sse cloudflare-observability https://observability.mcp.cloudflare.com/sse
claude mcp add --transport sse cloudflare-container https://container.mcp.cloudflare.com/sse
claude mcp add --transport sse cloudflare-browser https://browser.mcp.cloudflare.com/sse
claude mcp add --transport sse cloudflare-radar https://radar.mcp.cloudflare.com/sse

# Verify MCP setup
claude mcp list
```

## Verification & Testing

### Health Check Script
```bash
#!/bin/bash
echo "🔍 Homelab Health Check"

# Check services
echo "📡 Services:"
systemctl --user is-active claude-server.service && echo "✅ Server: UP" || echo "❌ Server: DOWN"
systemctl --user is-active claude-client.service && echo "✅ Client: UP" || echo "❌ Client: DOWN"
systemctl --user is-active cloudflared.service && echo "✅ Tunnel: UP" || echo "❌ Tunnel: DOWN"

# Check ports
echo -e "\n🌐 Network:"
nc -z localhost 4000 && echo "✅ API Port: OPEN" || echo "❌ API Port: CLOSED"
nc -z localhost 5173 && echo "✅ Client Port: OPEN" || echo "❌ Client Port: CLOSED"

# Check database
echo -e "\n💾 Database:"
curl -s http://localhost:4000/health | jq -r '.database // "ERROR"'

# Check tunnel
echo -e "\n☁️ Cloudflare:"
curl -s https://observability.yourdomain.com >/dev/null && echo "✅ Public Access: OK" || echo "❌ Public Access: FAILED"

# Check agents
echo -e "\n🤖 Agents:"
tmux list-sessions 2>/dev/null | grep -c orchestrator && echo "✅ Orchestrator: RUNNING" || echo "❌ Orchestrator: STOPPED"

echo -e "\n✅ Health check complete!"
```

Save as `~/health-check.sh` and run: `chmod +x ~/health-check.sh && ./health-check.sh`

## Access Your System

### Web Dashboard
- **Public**: https://observability.yourdomain.com
- **Local**: http://localhost:5173

### API Endpoints  
- **Public**: https://api.yourdomain.com
- **Local**: http://localhost:4000

### SSH Monitoring
```bash
# Monitor in real-time
curl -s http://localhost:4000/events | jq '.[] | select(.type=="tool_use")'

# Check recent activity
curl -s "http://localhost:4000/events?limit=10" | jq '.[] | {timestamp: .timestamp, type: .type, app: .app_name}'
```

## Security Configuration

### Cloudflare Access Policies
1. Go to Cloudflare Zero Trust dashboard
2. Navigate to Access > Applications
3. Add applications:
   - **observability.yourdomain.com** (dashboard)
   - **api.yourdomain.com** (API access)
4. Configure authentication:
   - Email domain restrictions
   - IP allowlists
   - Identity provider integration

### Firewall Rules
```bash
# Configure UFW
sudo ufw enable
sudo ufw allow 22/tcp  # SSH
sudo ufw deny 4000/tcp  # Block external API access
sudo ufw deny 5173/tcp  # Block external client access
sudo ufw status
```

## Automation & Monitoring

### Cron Jobs
```bash
# Add automated tasks
(crontab -l 2>/dev/null; cat << 'EOF'
# Health check every 15 minutes
*/15 * * * * ~/health-check.sh >> /opt/claude-observability/logs/health.log 2>&1

# Database backup daily at 2 AM
0 2 * * * cp ~/claude-observability/apps/server/events.db /opt/claude-observability/backups/events-$(date +\%Y\%m\%d).db

# Log cleanup weekly
0 0 * * 0 find /opt/claude-observability/logs -name "*.log" -mtime +7 -delete
EOF
) | crontab -
```

### Log Rotation
```bash
sudo tee /etc/logrotate.d/claude-observability << 'EOF'
/opt/claude-observability/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF
```

## Troubleshooting

### Service Issues
```bash
# Check service status
systemctl --user status claude-server.service
systemctl --user status claude-client.service
systemctl --user status cloudflared.service

# View logs
journalctl --user -u claude-server.service -f
journalctl --user -u claude-client.service -f
journalctl --user -u cloudflared.service -f

# Restart services
systemctl --user restart claude-server.service
systemctl --user restart claude-client.service
systemctl --user restart cloudflared.service
```

### Network Issues
```bash
# Test local connectivity
curl -v http://localhost:4000/health
curl -v http://localhost:5173

# Test tunnel
cloudflared tunnel info homelab-observability

# Check DNS
nslookup observability.yourdomain.com
nslookup api.yourdomain.com
```

### Database Issues
```bash
# Check database
sqlite3 ~/claude-observability/apps/server/events.db ".tables"
sqlite3 ~/claude-observability/apps/server/events.db "SELECT COUNT(*) FROM events;"

# Repair database
sqlite3 ~/claude-observability/apps/server/events.db "PRAGMA integrity_check;"
```

## Scaling & Optimization

### Performance Tuning
```bash
# Optimize SQLite
echo "PRAGMA journal_mode=WAL;" | sqlite3 ~/claude-observability/apps/server/events.db
echo "PRAGMA synchronous=NORMAL;" | sqlite3 ~/claude-observability/apps/server/events.db
echo "PRAGMA cache_size=10000;" | sqlite3 ~/claude-observability/apps/server/events.db
```

### Resource Monitoring
```bash
# Monitor system resources
htop
df -h
free -h

# Monitor specific processes
ps aux | grep -E "(bun|claude|cloudflared)"
```

## Next Steps

### 1. Build CLI Tool
Follow the [CLI Tool Specification](cli-tool-spec.md) to build the terminal monitoring interface.

### 2. Expand Automation
- Add more tmux orchestrator projects
- Integrate Cloudflare MCP servers
- Create custom automation scripts

### 3. Advanced Features
- Multi-homelab monitoring
- Alert notifications
- Performance analytics
- Custom dashboards

## Maintenance Schedule

### Daily
- [ ] Check health status
- [ ] Review error logs
- [ ] Monitor resource usage

### Weekly
- [ ] Update dependencies
- [ ] Review database size
- [ ] Clean old logs
- [ ] Test backup restore

### Monthly
- [ ] Security updates
- [ ] Performance optimization
- [ ] Capacity planning
- [ ] Documentation updates

---

## 🎉 Congratulations!

Your AI-powered homelab infrastructure is now running! You have:

- ✅ Real-time observability system
- ✅ Secure remote access via Cloudflare
- ✅ Autonomous AI agents via tmux orchestrator
- ✅ Modern monitoring dashboards  
- ✅ Enterprise-grade automation capabilities
- ✅ Scalable, production-ready architecture

**Access your system**: https://observability.yourdomain.com

**Join the community**: Share your setup and get help with advanced configurations!

---

*Your homelab empire starts now. 🚀*