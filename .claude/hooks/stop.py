#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "python-dotenv",
#     "openai",
#     "requests",
# ]
# ///

import argparse
import json
import os
import sys
import random
import subprocess
from pathlib import Path
from datetime import datetime
from utils.constants import ensure_session_log_dir

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass  # dotenv is optional


def get_repo_name():
    """Get repository name from git remote or directory name."""
    try:
        # Try git remote method first
        result = subprocess.run(['git', 'remote', 'get-url', 'origin'], 
                              capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            url = result.stdout.strip()
            # Extract repo name from various URL formats
            if url.endswith('.git'):
                url = url[:-4]
            return url.split('/')[-1]
    except (subprocess.TimeoutExpired, subprocess.SubprocessError, FileNotFoundError):
        pass
    
    # Fallback to directory name
    return os.path.basename(os.getcwd())



def needs_input_check():
    """Check if subagent actually needs input."""
    
    # Check for failing tests (Node.js projects)
    if os.path.exists("package.json"):
        try:
            result = subprocess.run(['npm', 'test'], capture_output=True, timeout=30)
            if result.returncode != 0:
                return "tests failing, needs your review"
        except (subprocess.TimeoutExpired, subprocess.SubprocessError, FileNotFoundError):
            pass
    
    # Check for TODO comments in recent git changes
    try:
        result = subprocess.run(['git', 'diff', '--name-only', 'HEAD~1'], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            changed_files = result.stdout.strip().split('\n')
            
            for file in changed_files[:3]:  # Check recent files
                if file and os.path.exists(file) and os.path.isfile(file):
                    try:
                        with open(file, 'r', encoding='utf-8', errors='ignore') as f:
                            content = f.read()
                            if 'TODO' in content or 'FIXME' in content:
                                return "has TODOs, needs your input"
                    except (UnicodeDecodeError, OSError):
                        continue
    except (subprocess.TimeoutExpired, subprocess.SubprocessError, FileNotFoundError):
        pass
    
    # Check for TypeScript compilation errors
    if os.path.exists("tsconfig.json"):
        try:
            result = subprocess.run(['npx', 'tsc', '--noEmit'], 
                                  capture_output=True, timeout=30)
            if result.returncode != 0:
                return "has type errors, needs your input"
        except (subprocess.TimeoutExpired, subprocess.SubprocessError, FileNotFoundError):
            pass
    
    return "completed successfully"


def generate_ai_completion_message(session_id):
    """Generate AI-powered completion message using OpenAI based on full hook ecosystem."""
    try:
        from openai import OpenAI
        
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return None
            
        # Get data from server only - no fallback allowed
        from utils.server_client import get_server_context
        server_context = get_server_context(session_id)
        
        # Server must provide context - no fallback
        ecosystem_data = {
            "session_id": session_id,
            "repo_name": server_context.get("repo_name", get_repo_name()),
            "user_prompt": server_context.get("user_prompt", "task"),
            "tools_used": server_context.get("tools_used", []),
            "files_modified": server_context.get("files_modified", []),
            "total_events": server_context.get("total_events", 0),
            "events_by_type": server_context.get("events_by_type", {}),
            "status": needs_input_check()
        }
        context = {
            "user_prompt": server_context.get("user_prompt", "task"),
            "repo_name": server_context.get("repo_name", get_repo_name()),
            "working_dir": os.getcwd()
        }
        
        # DEBUG: Show exactly what data the AI is analyzing
        data_source = "SERVER" if "total_events" in ecosystem_data else "LOCAL"
        print(f"\n🔍 DEBUG: AI ANALYZING {data_source} DATA FOR SESSION {session_id}:", file=sys.stderr)
        print(f"📋 USER PROMPT: {context.get('user_prompt', 'none')}", file=sys.stderr)
        
        if data_source == "SERVER":
            print(f"🌐 TOTAL EVENTS: {ecosystem_data.get('total_events', 0)}", file=sys.stderr)
            print(f"🔧 TOOLS USED: {ecosystem_data.get('tools_used', [])}", file=sys.stderr)
            print(f"📁 FILES MODIFIED: {len(ecosystem_data.get('files_modified', []))} files", file=sys.stderr)
            for file in ecosystem_data.get('files_modified', [])[:3]:
                print(f"    - {file}", file=sys.stderr)
            
            events_by_type = ecosystem_data.get('events_by_type', {})
            for event_type, events in events_by_type.items():
                print(f"📊 {event_type}: {len(events)} events", file=sys.stderr)
        else:
            print(f"🔧 PRE_TOOL_USE: {len(ecosystem_data.get('pre_tool_use', []))} entries", file=sys.stderr)
            if ecosystem_data.get('pre_tool_use'):
                for i, entry in enumerate(ecosystem_data.get('pre_tool_use', [])[-3:]):
                    print(f"    [{i}] {entry.get('tool_name', 'unknown')}: {str(entry.get('tool_input', {}))[:100]}...", file=sys.stderr)
            
            print(f"✅ POST_TOOL_USE: {len(ecosystem_data.get('post_tool_use', []))} entries", file=sys.stderr)
            if ecosystem_data.get('post_tool_use'):
                for i, entry in enumerate(ecosystem_data.get('post_tool_use', [])[-3:]):
                    print(f"    [{i}] {entry.get('tool_name', 'unknown')}: {str(entry.get('tool_response', {}))[:100]}...", file=sys.stderr)
            
            print(f"📁 GIT STATUS: {ecosystem_data.get('git_status', 'clean')[:200]}", file=sys.stderr)
            print(f"🔄 RECENT CHANGES: {ecosystem_data.get('recent_changes', [])}", file=sys.stderr)
        
        print("=" * 80, file=sys.stderr)
        
        # Load system prompt from prompts directory - no fallback allowed
        from utils.prompts import get_stop_completion_prompt
        system_prompt = get_stop_completion_prompt()

        # Extract recent user prompts to understand session progression
        user_prompts = []
        events_by_type = ecosystem_data.get('events_by_type', {})
        if 'UserPromptSubmit' in events_by_type:
            for event in events_by_type['UserPromptSubmit']:
                if 'payload' in event and 'prompt' in event['payload']:
                    user_prompts.append(event['payload']['prompt'].strip())
        
        # Create enhanced user context with session progression
        user_context = f"""<input>
<repository>{ecosystem_data.get('repo_name', 'unknown')}</repository>
<session_progression>
{chr(10).join([f"- {prompt}" for prompt in user_prompts[-5:]]) if user_prompts else "- " + ecosystem_data.get('user_prompt', 'task')}
</session_progression>

<session_context>
<total_events>{ecosystem_data.get('total_events', 0)}</total_events>
<tools_used>{json.dumps(ecosystem_data.get('tools_used', []))}</tools_used>
<files_modified>{json.dumps(ecosystem_data.get('files_modified', []))}</files_modified>
<session_status>{ecosystem_data.get('status', 'completed')}</session_status>
</session_context>
</input>"""

        client = OpenAI(api_key=api_key)
        
        response = client.responses.create(
            model="gpt-4.1",
            input=user_context,
            instructions=system_prompt,
            temperature=0.3,  # More focused for completion messages
            max_output_tokens=1000,  # Allow room for proper response but guardrails ensure brevity
            store=False
        )
        
        if response.output and len(response.output) > 0:
            message = response.output[0]
            if message.content and len(message.content) > 0:
                return message.content[0].text.strip().replace('"', '')
        
        return None
        
    except Exception as e:
        print(f"AI completion generation error: {e}", file=sys.stderr)
        return None


def get_contextual_completion_message(session_id):
    """Generate contextual completion message using AI and server context only."""
    
    return generate_ai_completion_message(session_id)


def get_tts_script_path():
    """
    Determine which TTS script to use based on available API keys.
    Priority order: ElevenLabs > OpenAI > pyttsx3
    """
    script_dir = Path(__file__).parent
    tts_dir = script_dir / "utils" / "tts"

    # Check for ElevenLabs API key (highest priority)
    if os.getenv("ELEVENLABS_API_KEY"):
        elevenlabs_script = tts_dir / "elevenlabs_tts.py"
        if elevenlabs_script.exists():
            return str(elevenlabs_script)

    # Check for OpenAI API key (second priority)
    if os.getenv("OPENAI_API_KEY"):
        openai_script = tts_dir / "openai_tts.py"
        if openai_script.exists():
            return str(openai_script)

    # Fall back to pyttsx3 (no API key required)
    pyttsx3_script = tts_dir / "pyttsx3_tts.py"
    if pyttsx3_script.exists():
        return str(pyttsx3_script)

    return None


def main():
    try:
        # Parse command line arguments
        parser = argparse.ArgumentParser()
        parser.add_argument(
            "--chat", action="store_true", help="Copy transcript to chat.json"
        )
        args = parser.parse_args()

        # Read JSON input from stdin
        input_data = json.load(sys.stdin)

        # Extract required fields
        session_id = input_data.get("session_id", "")

        # Ensure session log directory exists
        log_dir = ensure_session_log_dir(session_id)
        log_path = log_dir / "stop.json"

        # Read existing log data or initialize empty list
        if log_path.exists():
            with open(log_path, "r") as f:
                try:
                    log_data = json.load(f)
                except (json.JSONDecodeError, ValueError):
                    log_data = []
        else:
            log_data = []

        # Append new data
        log_data.append(input_data)

        # Write back to file with formatting
        with open(log_path, "w") as f:
            json.dump(log_data, f, indent=2)

        # Handle --chat switch
        if args.chat and "transcript_path" in input_data:
            transcript_path = input_data["transcript_path"]
            if os.path.exists(transcript_path):
                # Read .jsonl file and convert to JSON array
                chat_data = []
                try:
                    with open(transcript_path, "r") as f:
                        for line in f:
                            line = line.strip()
                            if line:
                                try:
                                    chat_data.append(json.loads(line))
                                except json.JSONDecodeError:
                                    pass  # Skip invalid lines

                    # Write to logs/chat.json
                    chat_file = os.path.join(log_dir, "chat.json")
                    with open(chat_file, "w") as f:
                        json.dump(chat_data, f, indent=2)
                except Exception:
                    pass  # Fail silently

        # Generate dynamic completion message based on original request
        session_id = input_data.get('session_id', 'unknown')
        
        # Get AI-generated contextual completion message
        completion_message = get_contextual_completion_message(session_id)
        print(f"\n🎯 {completion_message}")
        
        # Announce via TTS
        tts_script = get_tts_script_path()
        if tts_script:
            try:
                subprocess.run(
                    ["uv", "run", tts_script, completion_message],
                    capture_output=True,
                    text=True,
                    timeout=10,
                )
            except Exception:
                pass  # Fail silently

        sys.exit(0)

    except json.JSONDecodeError:
        # Handle JSON decode errors gracefully
        sys.exit(0)
    except Exception:
        # Handle any other errors gracefully
        sys.exit(0)


if __name__ == "__main__":
    main()
