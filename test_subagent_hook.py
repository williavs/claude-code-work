#!/usr/bin/env python3
"""
Test script for the enhanced subagent stop hook.
Simulates hook input data and verifies the hook functionality.
"""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

def create_test_hook_input():
    """Create realistic test data that would be passed to the subagent stop hook."""
    return {
        "session_id": "test_session_123",
        "tool_name": "Task", 
        "tool_input": {
            "subagent_type": "search-specialist",
            "description": "Find authentication patterns in codebase",
            "prompt": "Search through the codebase to find all authentication and authorization patterns, focusing on login flows and permission checks."
        },
        "tool_response": "Found 8 authentication patterns across 12 files. Key findings include OAuth2 implementation in auth/oauth.py, JWT handling in middleware/auth.py, and role-based permissions in models/user.py. All patterns follow security best practices with proper token validation and secure session management.",
        "transcript_path": "/tmp/test_transcript.jsonl"
    }

def test_hook_execution():
    """Test the subagent stop hook with simulated input data."""
    print("🧪 Testing enhanced subagent stop hook...")
    
    # Get the hook script path
    script_dir = Path(__file__).parent
    hook_script = script_dir / ".claude" / "hooks" / "subagent_stop.py"
    
    if not hook_script.exists():
        print(f"❌ Hook script not found at: {hook_script}")
        return False
    
    # Create test input data
    test_data = create_test_hook_input()
    
    # Create a temporary transcript file for testing
    with tempfile.NamedTemporaryFile(mode='w', suffix='.jsonl', delete=False) as f:
        f.write(json.dumps({"role": "user", "content": "test message"}) + "\n")
        f.write(json.dumps({"role": "assistant", "content": "test response"}) + "\n")
        test_data["transcript_path"] = f.name
    
    print(f"📝 Test input data:")
    print(f"   - Session ID: {test_data['session_id']}")
    print(f"   - Subagent type: {test_data['tool_input']['subagent_type']}")
    print(f"   - Description: {test_data['tool_input']['description']}")
    print(f"   - Response length: {len(test_data['tool_response'])} chars")
    
    try:
        # Run the hook script with test data
        result = subprocess.run([
            "python3", str(hook_script)
        ], 
        input=json.dumps(test_data),
        text=True,
        capture_output=True,
        timeout=30
        )
        
        print(f"\n🔍 Hook execution results:")
        print(f"   - Return code: {result.returncode}")
        print(f"   - Stdout: {result.stdout}")
        if result.stderr:
            print(f"   - Stderr: {result.stderr}")
        
        # Check if log file was created
        log_dir = Path.home() / ".claude" / "logs" / test_data["session_id"]
        log_file = log_dir / "subagent_stop.json"
        
        if log_file.exists():
            print(f"✅ Log file created: {log_file}")
            with open(log_file, 'r') as f:
                log_content = json.load(f)
                print(f"   - Log entries: {len(log_content)}")
        else:
            print(f"⚠️  Log file not found at: {log_file}")
        
        # Test passed if return code is 0
        if result.returncode == 0:
            print("✅ Hook executed successfully!")
            return True
        else:
            print("❌ Hook execution failed!")
            return False
            
    except subprocess.TimeoutExpired:
        print("⏰ Hook execution timed out!")
        return False
    except Exception as e:
        print(f"💥 Error running hook: {e}")
        return False

def test_ai_completion_generation():
    """Test the AI completion message generation (if OpenAI API key is available)."""
    import os
    
    if not os.getenv('OPENAI_API_KEY'):
        print("⚠️  OPENAI_API_KEY not found - skipping AI completion test")
        return True
    
    print("\n🤖 Testing AI completion message generation...")
    
    # Import the function directly for testing
    sys.path.append(str(Path(__file__).parent / ".claude" / "hooks"))
    
    try:
        from subagent_stop import generate_subagent_completion_message
        
        test_data = create_test_hook_input()
        completion_message = generate_subagent_completion_message(test_data)
        
        print(f"✅ Generated completion message: '{completion_message}'")
        print(f"   - Length: {len(completion_message)} characters")
        print(f"   - Contains subagent type: {'search-specialist' in completion_message.lower()}")
        
        # Validate the message meets requirements
        if len(completion_message) <= 60:
            print("✅ Message length within 60 character limit")
        else:
            print("⚠️  Message exceeds 60 character limit")
        
        return True
        
    except Exception as e:
        print(f"❌ AI completion generation failed: {e}")
        return False

def main():
    """Run all tests for the enhanced subagent stop hook."""
    print("🚀 Starting subagent stop hook tests...\n")
    
    success = True
    
    # Test 1: Hook execution
    if not test_hook_execution():
        success = False
    
    # Test 2: AI completion generation (if API key available)
    if not test_ai_completion_generation():
        success = False
    
    print(f"\n{'🎉 All tests passed!' if success else '❌ Some tests failed!'}")
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)