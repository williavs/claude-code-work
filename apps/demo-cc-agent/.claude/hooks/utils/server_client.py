"""
Server client utility for fetching session context from the observability server.
"""

import requests
import json
import os
from typing import Dict, List, Optional


class ServerClient:
    def __init__(self, server_url: str = "http://localhost:4000"):
        self.server_url = server_url.rstrip('/')
    
    def get_session_context(self, session_id: str) -> Dict:
        """Get complete session context from the server."""
        try:
            response = requests.get(
                f"{self.server_url}/api/sessions/{session_id}",
                timeout=5
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return {"error": f"Server returned {response.status_code}"}
                
        except requests.RequestException as e:
            return {"error": f"Failed to connect to server: {e}"}
    
    def get_session_events(self, session_id: str, event_types: Optional[List[str]] = None) -> List[Dict]:
        """Get filtered events for a session."""
        try:
            params = {}
            if event_types:
                params['types'] = ','.join(event_types)
                
            response = requests.get(
                f"{self.server_url}/api/sessions/{session_id}/events",
                params=params,
                timeout=5
            )
            
            if response.status_code == 200:
                return response.json().get('events', [])
            else:
                return []
                
        except requests.RequestException:
            return []
    
    def get_tool_usage_summary(self, session_id: str) -> Dict:
        """Get summarized tool usage for AI analysis."""
        try:
            response = requests.get(
                f"{self.server_url}/api/sessions/{session_id}/summary",
                timeout=5
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return {"tools_used": [], "files_modified": [], "actions_taken": []}
                
        except requests.RequestException:
            return {"tools_used": [], "files_modified": [], "actions_taken": []}


def get_server_context(session_id: str) -> Dict:
    """
    Get recent session context from the server.
    Only returns the last 10 events to avoid context window issues.
    """
    client = ServerClient()
    
    # Get context from server - no fallback allowed
    context = client.get_session_context(session_id)
    
    if "error" in context:
        raise Exception(f"Server context failed: {context['error']}")
    
    # Limit events_by_type to last few entries to avoid context window issues
    if "events_by_type" in context:
        for event_type, events in context["events_by_type"].items():
            if isinstance(events, list):
                if event_type == "UserPromptSubmit":
                    # Keep more UserPromptSubmit events for session progression analysis
                    context["events_by_type"][event_type] = events[-5:] if len(events) > 5 else events
                elif len(events) > 2:
                    # Limit other event types more aggressively
                    context["events_by_type"][event_type] = events[-2:]
    
    return context