# Cloudflare MCP Servers Setup

> **Integrate 13 powerful Cloudflare MCP servers for advanced automation**

## Overview

Cloudflare provides 13 publicly available remote MCP servers that extend your AI capabilities with real-time infrastructure management, observability, security analysis, and more.

## Available MCP Servers

### Core Infrastructure
1. **Documentation Server** - Up-to-date Cloudflare documentation
2. **Workers Bindings** - D1, R2, KV storage for full-stack apps
3. **Workers Observability** - Debug logs, errors, and performance
4. **Container Server** - Secure sandbox execution environment

### Security & Monitoring  
5. **Audit Logs Server** - Security event analysis and reporting
6. **CASB Server** - SaaS security misconfiguration detection
7. **Digital Experience Monitoring** - Application performance insights

### Analytics & Data
8. **DNS Analytics** - DNS performance optimization
9. **Radar Server** - Global Internet traffic insights
10. **GraphQL Server** - Detailed analytics via GraphQL
11. **AutoRAG Server** - Document search and retrieval

### Development Tools
12. **Browser Rendering** - Screenshots, HTML extraction, page conversion
13. **Logpush Server** - Log delivery health monitoring

## Quick Setup Commands

### Add All Cloudflare MCP Servers
```bash
#!/bin/bash
# Cloudflare MCP Servers - One-click setup

echo "🚀 Adding Cloudflare MCP servers..."

# 1. Documentation server - Get up-to-date Cloudflare docs
claude mcp add --transport sse cloudflare-docs https://docs.mcp.cloudflare.com/sse

# 2. Workers Bindings - D1, R2, KV storage primitives  
claude mcp add --transport sse cloudflare-bindings https://bindings.mcp.cloudflare.com/sse

# 3. Workers Observability - Debug and monitor Workers
claude mcp add --transport sse cloudflare-observability https://observability.mcp.cloudflare.com/sse

# 4. Container server - Secure execution environment
claude mcp add --transport sse cloudflare-container https://container.mcp.cloudflare.com/sse

# 5. Browser Rendering - Screenshots and page conversion
claude mcp add --transport sse cloudflare-browser https://browser.mcp.cloudflare.com/sse

# 6. Radar server - Global Internet insights
claude mcp add --transport sse cloudflare-radar https://radar.mcp.cloudflare.com/sse

# 7. Logpush server - Log delivery monitoring
claude mcp add --transport sse cloudflare-logpush https://logpush.mcp.cloudflare.com/sse

# 8. AI Gateway server - AI request analytics
claude mcp add --transport sse cloudflare-ai-gateway https://ai-gateway.mcp.cloudflare.com/sse

# 9. AutoRAG server - Document search
claude mcp add --transport sse cloudflare-autorag https://autorag.mcp.cloudflare.com/sse

# 10. Audit Logs server - Security event analysis
claude mcp add --transport sse cloudflare-auditlogs https://auditlogs.mcp.cloudflare.com/sse

# 11. DNS Analytics server - DNS performance monitoring
claude mcp add --transport sse cloudflare-dns-analytics https://dns-analytics.mcp.cloudflare.com/sse

# 12. Digital Experience Monitoring - App performance
claude mcp add --transport sse cloudflare-dex https://dex.mcp.cloudflare.com/sse

# 13. CASB server - SaaS security analysis
claude mcp add --transport sse cloudflare-casb https://casb.mcp.cloudflare.com/sse

echo "✅ All 13 Cloudflare MCP servers added!"
echo "🔐 You'll need to authenticate with Cloudflare when using these servers"
```

## Manual Configuration

If your MCP client doesn't support remote servers directly, configure manually:

### mcp_config.json
```json
{
    "mcpServers": {
        "cloudflare-docs": {
            "command": "npx",
            "args": ["mcp-remote", "https://docs.mcp.cloudflare.com/sse"]
        },
        "cloudflare-bindings": {
            "command": "npx", 
            "args": ["mcp-remote", "https://bindings.mcp.cloudflare.com/sse"]
        },
        "cloudflare-observability": {
            "command": "npx",
            "args": ["mcp-remote", "https://observability.mcp.cloudflare.com/sse"]
        },
        "cloudflare-container": {
            "command": "npx",
            "args": ["mcp-remote", "https://container.mcp.cloudflare.com/sse"]
        },
        "cloudflare-browser": {
            "command": "npx",
            "args": ["mcp-remote", "https://browser.mcp.cloudflare.com/sse"]
        },
        "cloudflare-radar": {
            "command": "npx",
            "args": ["mcp-remote", "https://radar.mcp.cloudflare.com/sse"]
        },
        "cloudflare-logpush": {
            "command": "npx",
            "args": ["mcp-remote", "https://logpush.mcp.cloudflare.com/sse"]
        },
        "cloudflare-ai-gateway": {
            "command": "npx",
            "args": ["mcp-remote", "https://ai-gateway.mcp.cloudflare.com/sse"]
        },
        "cloudflare-autorag": {
            "command": "npx",
            "args": ["mcp-remote", "https://autorag.mcp.cloudflare.com/sse"]
        },
        "cloudflare-auditlogs": {
            "command": "npx",
            "args": ["mcp-remote", "https://auditlogs.mcp.cloudflare.com/sse"]
        },
        "cloudflare-dns-analytics": {
            "command": "npx",
            "args": ["mcp-remote", "https://dns-analytics.mcp.cloudflare.com/sse"]
        },
        "cloudflare-dex": {
            "command": "npx",
            "args": ["mcp-remote", "https://dex.mcp.cloudflare.com/sse"]
        },
        "cloudflare-casb": {
            "command": "npx",
            "args": ["mcp-remote", "https://casb.mcp.cloudflare.com/sse"]
        }
    }
}
```

## Authentication Setup

### Prerequisites
1. Cloudflare account with appropriate permissions
2. API tokens for each service you want to use
3. Domain(s) in your Cloudflare account

### Get API Tokens
```bash
# Navigate to Cloudflare dashboard
open https://dash.cloudflare.com/profile/api-tokens

# Create tokens for:
# - Zone:Read (for DNS analytics)
# - Workers:Edit (for bindings and observability) 
# - Logs:Read (for audit logs and logpush)
# - Analytics:Read (for all analytics servers)
```

### Environment Variables
Add to your `~/.env` file:
```bash
# Cloudflare API Configuration
CLOUDFLARE_API_TOKEN=your_global_api_key
CLOUDFLARE_ZONE_ID=your_zone_id
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Service-specific tokens (if needed)
CLOUDFLARE_WORKERS_TOKEN=your_workers_token
CLOUDFLARE_LOGS_TOKEN=your_logs_token
CLOUDFLARE_ANALYTICS_TOKEN=your_analytics_token
```

## Homelab Integration Examples

### 1. Infrastructure Monitoring
```bash
# Example Claude commands using MCP servers

# Check DNS performance for your homelab domain
"Using cloudflare-dns-analytics, show me DNS performance for homelab.yourdomain.com over the last 24 hours"

# Monitor Workers performance
"Using cloudflare-observability, show me any errors in my homelab Workers in the last hour"

# Check audit logs for security events
"Using cloudflare-auditlogs, were there any suspicious changes to my Cloudflare account yesterday?"
```

### 2. Automated Deployment
```bash
# Use Workers Bindings to create resources
"Using cloudflare-bindings, create a new D1 database called 'homelab-metrics' and a KV namespace called 'homelab-config'"

# Deploy code to containers
"Using cloudflare-container, test this Node.js monitoring script in a secure environment"
```

### 3. Documentation & Research
```bash
# Get up-to-date documentation
"Using cloudflare-docs, what's the best way to implement rate limiting for my homelab API?"

# Use Radar for Internet insights
"Using cloudflare-radar, show me HTTP traffic patterns from my country over the last week"
```

## Advanced Automation Script

Save as `~/setup-cloudflare-automation.sh`:
```bash
#!/bin/bash
set -e

echo "🤖 Setting up Cloudflare MCP automation..."

# Check prerequisites
command -v claude >/dev/null 2>&1 || { echo "❌ Claude CLI not found"; exit 1; }
[[ -z "$CLOUDFLARE_API_TOKEN" ]] && { echo "❌ CLOUDFLARE_API_TOKEN not set"; exit 1; }

# Create automation directory
mkdir -p ~/cloudflare-automation/{scripts,configs,logs}

# Create automation script for common tasks
cat > ~/cloudflare-automation/scripts/homelab-health-check.sh << 'EOF'
#!/bin/bash
# Automated homelab health check using Cloudflare MCP

echo "🏠 Running homelab health check..."

# Check DNS performance
claude --mcp cloudflare-dns-analytics "Check DNS response times for all my homelab subdomains"

# Check Workers status
claude --mcp cloudflare-observability "Show me any Workers errors in the last hour"

# Check security events
claude --mcp cloudflare-auditlogs "Any suspicious activity in the last 24 hours?"

# Global traffic insights
claude --mcp cloudflare-radar "Internet health status in my region"

echo "✅ Health check complete - results logged"
EOF

chmod +x ~/cloudflare-automation/scripts/homelab-health-check.sh

# Set up cron job for automated checks
(crontab -l 2>/dev/null; echo "0 */6 * * * ~/cloudflare-automation/scripts/homelab-health-check.sh >> ~/cloudflare-automation/logs/health-check.log 2>&1") | crontab -

echo "✅ Cloudflare automation setup complete!"
echo "📋 Health checks will run every 6 hours"
echo "📁 Logs: ~/cloudflare-automation/logs/"
```

## Integration with Observability System

### Hook Integration
Add to your `.claude/hooks/post_tool_use.py`:
```python
# Send tool usage to Cloudflare analytics
import requests
import json

def track_mcp_usage(tool_name, result):
    """Track MCP server usage for analytics"""
    if tool_name.startswith('cloudflare-'):
        # Log to your observability system
        event_data = {
            'type': 'mcp_usage',
            'server': tool_name,
            'timestamp': datetime.now().isoformat(),
            'success': 'error' not in result.lower()
        }
        
        # Send to local observability server
        requests.post(
            'http://localhost:4000/events',
            json=event_data
        )
```

### Dashboard Integration
Add MCP metrics to your Vue.js dashboard by creating new event types for MCP usage.

## Troubleshooting

### Common Issues

**Authentication failures:**
```bash
# Verify API tokens
curl -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     "https://api.cloudflare.com/client/v4/user/tokens/verify"

# Check account access
claude --mcp cloudflare-docs "test connection"
```

**MCP server not responding:**
```bash
# Test server directly
curl https://docs.mcp.cloudflare.com/sse

# Check mcp-remote installation
npm install -g mcp-remote
```

**Rate limiting:**
```bash
# Monitor API usage
claude --mcp cloudflare-auditlogs "Show me my API usage over the last hour"
```

## Security Best Practices

1. **Least Privilege**: Only add MCP servers you actively use
2. **Token Rotation**: Rotate API tokens every 90 days
3. **Monitoring**: Track all MCP usage via your observability system
4. **Audit**: Regular review of Cloudflare access logs

## Next Steps

With MCP servers configured, you can:

1. **[Core Components](02-core-components.md)** - Deploy the observability stack
2. **[Agent Orchestration](05-agent-orchestration.md)** - Use MCP in autonomous agents
3. **[Monitoring CLI](06-monitoring-cli.md)** - Build CLI tools with MCP integration

---

**MCP servers ready!** Your homelab now has enterprise-grade automation capabilities.