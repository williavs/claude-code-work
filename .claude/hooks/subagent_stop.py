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
Subagent stop hook for AI-powered contextual completion messages.
Generates specific completion messages based on actual subagent work performed.
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
    pass  # dotenv is optional


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


def generate_subagent_completion_message(hook_input_data):
    """Generate AI-powered subagent completion message using server context."""
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError("OpenAI package not available")
    
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found")
    
    # Extract session_id from hook input
    session_id = hook_input_data.get("session_id", "")
    
    # Get server context like working hooks do
    server_context = get_server_context(session_id)
    recent_task_tools = []
    
    # Look for recent Task tool usage in server context
    if "events_by_type" in server_context:
        for event_type, events in server_context["events_by_type"].items():
            if event_type == "PreToolUse":
                for event in events:
                    if event.get("payload", {}).get("tool_name") == "Task":
                        recent_task_tools.append(event["payload"])
    
    # Extract subagent context from most recent Task tool
    if recent_task_tools:
        latest_task = recent_task_tools[-1]
        tool_input = latest_task.get("tool_input", {})
        subagent_type = tool_input.get("subagent_type", "specialist")
        description = tool_input.get("description", "specialized task")
        prompt = tool_input.get("prompt", "")
    else:
        # Intelligent fallbacks instead of "unknown"
        subagent_type = "specialist"
        description = "specialized task"
        prompt = ""
    
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
    
    # Load system prompt from centralized prompts directory
    from utils.prompts import get_subagent_completion_prompt
    system_prompt = get_subagent_completion_prompt()
    
    # Create rich context using server context and task data
    user_context = f"""<input>
<repository>{repo_name}</repository>
<session_context>
<user_prompt>{server_context.get('user_prompt', 'task')}</user_prompt>
<tools_used>{json.dumps(server_context.get('tools_used', []))}</tools_used>
</session_context>
<subagent_context>
<subagent_type>{subagent_type}</subagent_type>
<description>{description}</description>
<prompt>{prompt}</prompt>
</subagent_context>
</input>"""
    
    client = OpenAI(api_key=api_key)
    
    response = client.responses.create(
        model="gpt-4.1",
        input=user_context,
        instructions=system_prompt,
        temperature=0.3,
        max_output_tokens=500,
        store=False
    )
    
    if response.output and len(response.output) > 0:
        message = response.output[0]
        if message.content and len(message.content) > 0:
            return message.content[0].text.strip().replace('"', '')
    
    raise RuntimeError("AI completion failed")


def announce_subagent_completion(hook_input_data):
    """Announce subagent completion using the best available TTS service."""
    tts_script = get_tts_script_path()
    if not tts_script:
        print("🔇 No TTS script available")
        return
    
    # Generate dynamic completion message using rich hook input data
    completion_message = generate_subagent_completion_message(hook_input_data)
    
    # Print to terminal
    print(f"🤖 {completion_message}")
    
    # Call the TTS script with the completion message
    subprocess.run([
        "uv", "run", tts_script, completion_message
    ], 
    capture_output=True,  # Suppress output
    timeout=10  # 10-second timeout
    )


def main():
    try:
        # Parse command line arguments
        parser = argparse.ArgumentParser()
        parser.add_argument('--chat', action='store_true', help='Copy transcript to chat.json')
        args = parser.parse_args()
        
        # Read JSON input from stdin
        input_data = json.load(sys.stdin)

        # Extract required fields
        session_id = input_data.get("session_id", "")

        # Ensure session log directory exists
        log_dir = ensure_session_log_dir(session_id)
        log_path = log_dir / "subagent_stop.json"

        # Read existing log data or initialize empty list
        if log_path.exists():
            with open(log_path, 'r') as f:
                try:
                    log_data = json.load(f)
                except (json.JSONDecodeError, ValueError):
                    log_data = []
        else:
            log_data = []
        
        # Append new data
        log_data.append(input_data)
        
        # Write back to file with formatting
        with open(log_path, 'w') as f:
            json.dump(log_data, f, indent=2)
        
        # Handle --chat switch (same as stop.py)
        if args.chat and 'transcript_path' in input_data:
            transcript_path = input_data['transcript_path']
            if os.path.exists(transcript_path):
                # Read .jsonl file and convert to JSON array
                chat_data = []
                try:
                    with open(transcript_path, 'r') as f:
                        for line in f:
                            line = line.strip()
                            if line:
                                try:
                                    chat_data.append(json.loads(line))
                                except json.JSONDecodeError:
                                    pass  # Skip invalid lines
                    
                    # Write to logs/chat.json
                    chat_file = os.path.join(log_dir, 'chat.json')
                    with open(chat_file, 'w') as f:
                        json.dump(chat_data, f, indent=2)
                except Exception:
                    pass  # Fail silently

        # Announce subagent completion via TTS using full hook input data
        announce_subagent_completion(input_data)

        sys.exit(0)

    except json.JSONDecodeError:
        # Handle JSON decode errors gracefully
        sys.exit(0)
    except Exception:
        # Handle any other errors gracefully
        sys.exit(0)


if __name__ == "__main__":
    main()