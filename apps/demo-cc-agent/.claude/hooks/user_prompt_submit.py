#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "python-dotenv",
# ]
# ///

"""
User prompt submission hook for capturing initial user context.
Logs user prompts and repo information for contextual AI completion.
"""

import argparse
import json
import os
import sys
import subprocess
from pathlib import Path
from datetime import datetime
from utils.constants import ensure_session_log_dir

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


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


def capture_user_context(session_id, input_data):
    """Capture user context for contextual completion messages."""
    session_dir = ensure_session_log_dir(session_id)
    
    # Extract user prompt from input data
    prompt = input_data.get('prompt', '')
    
    context = {
        "user_prompt": prompt,
        "repo_name": get_repo_name(),
        "timestamp": datetime.now().isoformat(),
        "working_dir": os.getcwd(),
        "session_id": session_id
    }
    
    # Save current context for stop hook to use
    context_file = session_dir / "current_context.json"
    with open(context_file, 'w') as f:
        json.dump(context, f, indent=2)


def log_user_prompt(session_id, input_data):
    """Log user prompt to session directory."""
    # Ensure session log directory exists
    log_dir = ensure_session_log_dir(session_id)
    log_file = log_dir / 'user_prompt_submit.json'
    
    # Read existing log data or initialize empty list
    if log_file.exists():
        with open(log_file, 'r') as f:
            try:
                log_data = json.load(f)
            except (json.JSONDecodeError, ValueError):
                log_data = []
    else:
        log_data = []
    
    # Append the entire input data
    log_data.append(input_data)
    
    # Write back to file with formatting
    with open(log_file, 'w') as f:
        json.dump(log_data, f, indent=2)
    
    # Capture context for contextual completion
    capture_user_context(session_id, input_data)


def handle_casual_request(prompt, repo_name):
    """
    Handle casual requests (jokes, stories, etc.) with AI-generated responses.
    Returns (handled, response_text) tuple.
    """
    try:
        from utils.llm.openai_completion import detect_casual_request, generate_contextual_response
        
        is_casual, request_type = detect_casual_request(prompt)
        
        if is_casual:
            response = generate_contextual_response(prompt, repo_name, request_type)
            if response:
                # Print the response and exit
                print(f"\n🤖 {response}\n")
                return True, response
        
        return False, None
        
    except ImportError:
        # OpenAI not available, continue normally
        return False, None
    except Exception:
        # Any error, continue normally
        return False, None


def validate_prompt(prompt):
    """
    Validate the user prompt for security or policy violations.
    Returns tuple (is_valid, reason).
    """
    # Example validation rules (customize as needed)
    blocked_patterns = [
        # Add any patterns you want to block
        # Example: ('rm -rf /', 'Dangerous command detected'),
    ]
    
    prompt_lower = prompt.lower()
    
    for pattern, reason in blocked_patterns:
        if pattern.lower() in prompt_lower:
            return False, reason
    
    return True, None


def main():
    try:
        # Parse command line arguments
        parser = argparse.ArgumentParser()
        parser.add_argument('--validate', action='store_true', 
                          help='Enable prompt validation')
        parser.add_argument('--log-only', action='store_true',
                          help='Only log prompts, no validation or blocking')
        args = parser.parse_args()
        
        # Read JSON input from stdin
        input_data = json.loads(sys.stdin.read())
        
        # Extract session_id and prompt
        session_id = input_data.get('session_id', 'unknown')
        prompt = input_data.get('prompt', '')
        
        # Log the user prompt (capture context for dynamic completion)
        log_user_prompt(session_id, input_data)
        
        # Validate prompt if requested and not in log-only mode
        if args.validate and not args.log_only:
            is_valid, reason = validate_prompt(prompt)
            if not is_valid:
                # Exit code 2 blocks the prompt with error message
                print(f"Prompt blocked: {reason}", file=sys.stderr)
                sys.exit(2)
        
        # Add context information (optional)
        # You can print additional context that will be added to the prompt
        # Example: print(f"Current time: {datetime.now()}")
        
        # Success - prompt will be processed
        sys.exit(0)
        
    except json.JSONDecodeError:
        # Handle JSON decode errors gracefully
        sys.exit(0)
    except Exception:
        # Handle any other errors gracefully
        sys.exit(0)


if __name__ == '__main__':
    main()