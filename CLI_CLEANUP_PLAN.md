# CLI Tool Cleanup Plan

## Current State Analysis

### Files Present
1. `src/index.ts` - Blessed-based implementation (TO BE REMOVED)
2. `src/ink-app.tsx` - Ink.js React-based implementation (TO BE KEPT)
3. `package.json` - Points to blessed version in bin

### Issues Identified
1. **Dual Implementation**: Two complete implementations exist
2. **Binary Confusion**: package.json "bin" points to blessed version
3. **Streaming Issues**: Reported problems with real-time updates
4. **Dependencies**: Both blessed and ink are installed

## Cleanup Actions

### Step 1: Remove Blessed Implementation
```bash
# Remove the blessed-based file
rm apps/cli-tool/src/index.ts
```

### Step 2: Update Package Configuration
```json
{
  "bin": {
    "claude-monitor": "./dist/ink-app.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/ink-app.js",
    "test": "node dist/ink-app.js --server ws://localhost:4000/stream"
  }
}
```

### Step 3: Remove Blessed Dependency
```bash
# Remove blessed from dependencies
npm uninstall blessed
```

### Step 4: Fix Ink Implementation Issues

#### Current Problems in ink-app.tsx:
1. **Event Display Limit**: Only shows 10 events (line 142)
2. **Chart Update Logic**: May have timing issues
3. **Reconnection**: Auto-reconnect might create multiple connections
4. **Memory Leak**: WebSocket cleanup in useEffect needs verification

#### Fixes Needed:
1. Increase visible events or add scrolling
2. Fix chart data rotation logic
3. Ensure single WebSocket connection
4. Proper cleanup on unmount

### Step 5: Enhance Ink UI

#### Improvements:
1. **Better Layout**: Use Ink's layout system more effectively
2. **Scrollable Events**: Implement proper scrolling for events
3. **Color Coding**: Better visual distinction for event types
4. **Performance**: Optimize re-renders with React.memo

### Step 6: Add Missing Features

#### From Blessed Version:
1. **Event Filtering**: Already present ✓
2. **Activity Chart**: Already present ✓
3. **Connection Status**: Already present ✓
4. **Keyboard Controls**: Already present ✓

#### New Features for Ubuntu:
1. **Log Export**: Save events to file
2. **SSH-Friendly**: Ensure works over SSH
3. **Minimal Mode**: Text-only option for low bandwidth

## Testing Plan

### Local Testing
```bash
cd apps/cli-tool
npm run build
npm run start
```

### Ubuntu Testing
```bash
# Test over SSH
ssh ubuntu-server
cd ~/claude-env/apps/cli-tool
npm run start

# Test with tmux
tmux new-session -d -s test
tmux send-keys "npm run start" C-m
tmux attach -t test
```

### Integration Testing
1. Start server component
2. Generate test events
3. Verify real-time updates
4. Test filtering
5. Check resource usage

## File Structure After Cleanup

```
apps/cli-tool/
├── src/
│   └── ink-app.tsx      # Single implementation
├── dist/
│   └── ink-app.js       # Compiled output
├── package.json         # Updated configuration
├── tsconfig.json        # TypeScript config
└── README.md           # Usage documentation
```

## Ubuntu-Specific Considerations

1. **Terminal Compatibility**: Ink.js works well with standard terminals
2. **UTF-8 Support**: Ensure locale is set for emoji display
3. **Performance**: React-based UI is efficient for updates
4. **SSH Usage**: No special terminal features required

## Resource Requirements

- **RAM**: ~50MB for the CLI tool
- **CPU**: Minimal, event-driven updates
- **Terminal**: Standard VT100 compatible
- **Node.js**: 18+ for Ink.js compatibility

## Success Metrics

1. **Single Implementation**: Only Ink.js version remains
2. **Clean Dependencies**: No blessed in package.json
3. **Working Binary**: `claude-monitor` command works
4. **Stable Streaming**: Real-time updates without lag
5. **Ubuntu Compatible**: Works over SSH without issues

## Timeline

- **15 minutes**: Remove blessed files and dependencies
- **30 minutes**: Fix Ink.js implementation issues
- **30 minutes**: Test on Ubuntu environment
- **15 minutes**: Documentation updates

**Total: 1.5 hours**