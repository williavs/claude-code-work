#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "python-dotenv",
#     "openai",
#     "requests",
# ]
# ///

"""
Notification hook for AI-powered contextual permission requests.
Generates dynamic TTS notifications based on current activity.
"""

import argparse
import json
import os
import sys
import subprocess
from pathlib import Path
from utils.constants import ensure_session_log_dir
from utils.server_client import get_server_context

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


def get_tts_script_path():
    """
    Determine which TTS script to use based on available API keys.
    Priority order: ElevenLabs > OpenAI > pyttsx3
    """
    # Get current script directory and construct utils/tts path
    script_dir = Path(__file__).parent
    tts_dir = script_dir / "utils" / "tts"
    
    # Check for ElevenLabs API key (highest priority)
    if os.getenv('ELEVENLABS_API_KEY'):
        elevenlabs_script = tts_dir / "elevenlabs_tts.py"
        if elevenlabs_script.exists():
            return str(elevenlabs_script)
    
    # Check for OpenAI API key (second priority)
    if os.getenv('OPENAI_API_KEY'):
        openai_script = tts_dir / "openai_tts.py"
        if openai_script.exists():
            return str(openai_script)
    
    # Fall back to pyttsx3 (no API key required)
    pyttsx3_script = tts_dir / "pyttsx3_tts.py"
    if pyttsx3_script.exists():
        return str(pyttsx3_script)
    
    return None


def generate_dynamic_notification(session_id, message):
    """Generate dynamic notification message using hook ecosystem data."""
    # Import OpenAI directly like stop hook does
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError("OpenAI package not available")
    
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found")
    
    # Get repo name
    try:
        result = subprocess.run(['git', 'config', '--get', 'remote.origin.url'], 
                              capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            repo_url = result.stdout.strip()
            repo_name = repo_url.split('/')[-1].replace('.git', '')
        else:
            repo_name = os.path.basename(os.getcwd())
    except:
        repo_name = os.path.basename(os.getcwd())
    
    # Get session context from server only - no fallback allowed
    server_context = get_server_context(session_id)
    
    # Load system prompt from centralized prompts directory
    from utils.prompts import get_notification_request_prompt
    system_prompt = get_notification_request_prompt()
    
    # Create simplified user context - focus on the current action
    user_context = f"""<input>
    <repository>{repo_name}</repository>
    <original_message>{message}</original_message>
    <session_context>
    <user_prompt>{server_context.get('user_prompt', 'task')}</user_prompt>
    <tools_used>{json.dumps(server_context.get('tools_used', []))}</tools_used>
    </session_context>
    </input>"""
    
    client = OpenAI(api_key=api_key)
    
    response = client.responses.create(
        model="gpt-4.1",
        input=user_context,
        instructions=system_prompt,
        temperature=0.7,
        max_output_tokens=40,
        store=False
    )
    
    if response.output and len(response.output) > 0:
        message = response.output[0]
        if message.content and len(message.content) > 0:
            return message.content[0].text.strip().replace('"', '')
    
    raise RuntimeError("AI completion failed")


def announce_notification(session_id, message):
    """Announce that the agent needs user input with dynamic messaging."""
    tts_script = get_tts_script_path()
    if not tts_script:
        print("🔇 No TTS script available")
        return
    
    # Generate dynamic notification message
    notification_message = generate_dynamic_notification(session_id, message)
    
    # Print to terminal
    print(f"🔔 {notification_message}")
    
    # Call the TTS script with the notification message
    subprocess.run([
        "uv", "run", tts_script, notification_message
    ], 
    capture_output=True,  # Suppress output
    timeout=10  # 10-second timeout
    )


def main():
    try:
        # Parse command line arguments
        parser = argparse.ArgumentParser()
        parser.add_argument('--notify', action='store_true', help='Enable TTS notifications')
        args = parser.parse_args()
        
        # Read JSON input from stdin
        input_data = json.loads(sys.stdin.read())
        
        # Extract session_id
        session_id = input_data.get('session_id', 'unknown')
        
        # Ensure session log directory exists
        log_dir = ensure_session_log_dir(session_id)
        log_file = log_dir / 'notification.json'
        
        # Read existing log data or initialize empty list
        if log_file.exists():
            with open(log_file, 'r') as f:
                try:
                    log_data = json.load(f)
                except (json.JSONDecodeError, ValueError):
                    log_data = []
        else:
            log_data = []
        
        # Append new data
        log_data.append(input_data)
        
        # Write back to file with formatting
        with open(log_file, 'w') as f:
            json.dump(log_data, f, indent=2)
        
        # Announce notification via TTS only if --notify flag is set
        # Skip TTS for the generic "Claude is waiting for your input" message
        if args.notify and input_data.get('message') != 'Claude is waiting for your input':
            announce_notification(session_id, input_data.get('message', ''))
        
        sys.exit(0)
        
    except json.JSONDecodeError:
        # Handle JSON decode errors gracefully
        sys.exit(0)
    except Exception:
        # Handle any other errors gracefully
        sys.exit(0)

if __name__ == '__main__':
    main()