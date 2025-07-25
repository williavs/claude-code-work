#!/usr/bin/env python3
"""
Test the subagent hook with realistic data structure that it actually receives.
"""

import json
import subprocess
import sys
from pathlib import Path

def test_with_real_data_structure():
    """Test with the actual data structure from real logs."""
    print("🧪 Testing subagent hook with realistic data structure...")
    
    # This is what the hook actually receives based on the log files
    real_data = {
        "session_id": "test_456",
        "transcript_path": "/tmp/test.jsonl",
        "cwd": "/Users/wvansickle/willycode/claude-code-hooks-multi-agent-observability",
        "hook_event_name": "SubagentStop",
        "stop_hook_active": False
    }
    
    hook_script = Path(__file__).parent / ".claude" / "hooks" / "subagent_stop.py"
    
    try:
        result = subprocess.run([
            "python3", str(hook_script)
        ], 
        input=json.dumps(real_data),
        text=True,
        capture_output=True,
        timeout=30
        )
        
        print(f"Return code: {result.returncode}")
        print(f"Stdout: {result.stdout}")
        if result.stderr:
            print(f"Stderr: {result.stderr}")
            
        return result.returncode == 0
        
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_ai_generation_with_missing_data():
    """Test the AI generation function directly with missing data."""
    print("\n🤖 Testing AI generation with missing tool_input/tool_response...")
    
    sys.path.append(str(Path(__file__).parent / ".claude" / "hooks"))
    
    try:
        from subagent_stop import generate_subagent_completion_message
        
        # Data missing tool_input and tool_response
        missing_data = {
            "session_id": "test_789",
            "hook_event_name": "SubagentStop",
            "stop_hook_active": False
        }
        
        message = generate_subagent_completion_message(missing_data)
        print(f"Generated message: '{message}'")
        
        return True
        
    except Exception as e:
        print(f"Error in AI generation: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Testing subagent hook with realistic data...\n")
    
    success1 = test_with_real_data_structure()
    success2 = test_ai_generation_with_missing_data()
    
    print(f"\n{'✅ Tests completed' if success1 and success2 else '❌ Tests failed'}")