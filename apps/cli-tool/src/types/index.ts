// Unified types for CLI monitoring tool

export interface HookEvent {
  id?: number | string;
  source_app: string;
  session_id: string;
  hook_event_type: string;
  payload: Record<string, any>;
  chat?: any[];
  summary?: string;
  timestamp?: number | string;
}

export interface WebSocketMessage {
  type: 'initial' | 'event';
  data: HookEvent | HookEvent[];
}

export interface FilterState {
  sourceApp?: string;
  sessionId?: string;
  eventType?: string;
}

export const EVENT_EMOJIS: Record<string, string> = {
  'PreToolUse': '🔧',
  'PostToolUse': '✅',
  'Notification': '🔔',
  'Stop': '🛑',
  'SubagentStop': '👥',
  'PreCompact': '📦',
  'UserPromptSubmit': '💬',
  'default': '❓'
};

export interface AppConfig {
  serverUrl: string;
  maxEvents: number;
  bufferFlushInterval: number;
  reconnectDelay: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  serverUrl: 'ws://localhost:4000/stream',
  maxEvents: 1000,
  bufferFlushInterval: 100, // 10fps
  reconnectDelay: 3000,
};